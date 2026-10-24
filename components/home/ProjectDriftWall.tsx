"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { publicProjects } from "@/data/projects";
import styles from "./SelectedWork.module.css";

const featured = ["rbim", "ahdis", "erp-system", "co-designs", "marci-metzger"];
const projects = featured.flatMap(slug => publicProjects.filter(project => project.slug === slug));

export function ProjectDriftWall() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const trackRef = useRef<HTMLElement>(null);
  const manualUntil = useRef(0);
  const activeRef = useRef(0);
  useEffect(() => {
    const track = trackRef.current;
    const section = track?.closest<HTMLElement>("#work");
    if (!track || !section) return;
    let frame = 0;
    const sync = () => {
      frame = 0;
      if (window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const start = section.getBoundingClientRect().top + window.scrollY;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / range));
      // A small scroll-linked vertical offset gives the active preview depth even
      // between slides; it never scales or crops project screenshots.
      const travelInSlides = progress * (projects.length - 1);
      const offset = Math.max(-.5, Math.min(.5, travelInSlides - activeRef.current));
      track.style.setProperty("--scroll-drift", `${Math.round(-offset * 26)}px`);
      if (Date.now() < manualUntil.current) return;
      // Scroll chooses a *complete* featured slide. Continuous horizontal movement
      // previously exposed partial screenshots during every wheel movement.
      const cards = Array.from(track.querySelectorAll<HTMLElement>("article"));
      const index = Math.min(projects.length - 1, Math.round(progress * (projects.length - 1)));
      if (index !== activeRef.current && cards[index]) {
        activeRef.current = index;
        setActive(index);
        const card = cards[index];
        const left = Math.max(0, Math.min(track.scrollWidth - track.clientWidth,
          card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2));
        track.scrollTo({ left, behavior: "instant" });
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const observer = new ResizeObserver(schedule);
    // Trigger the initial scene reveal only when the project showcase is reached.
    // Subsequent active-card changes replay their own enter animation.
    const reveal = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        section.dataset.motionReady = "true";
        reveal.disconnect();
      }
    }, { rootMargin: "0px 0px -12% 0px" });
    reveal.observe(section);
    const trackScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("article"));
      const midpoint = track.scrollLeft + track.clientWidth / 2;
      const next = cards.reduce((best, card, index) => Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - midpoint) ? index : best, 0);
      if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
    };
    track.addEventListener("scroll", trackScroll, { passive: true });
    observer.observe(track); observer.observe(section);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reveal.disconnect();
      track.removeEventListener("scroll", trackScroll);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, []);
  const selected = projects[active];

  const select = (index: number) => {
    const next = (index + projects.length) % projects.length;
    activeRef.current = next;
    setActive(next);
    const track = trackRef.current;
    const item = track?.querySelectorAll<HTMLElement>("article")[next];
    if (!track || !item) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Math.max(0, Math.min(track.scrollWidth-track.clientWidth,
      item.offsetLeft+item.offsetWidth/2-track.clientWidth/2));
    manualUntil.current = Date.now()+950;
    track.style.setProperty("--scroll-drift", "0px");
    track.scrollTo({ left: target, behavior: reduced ? "instant" : "smooth" });
    if (window.innerWidth >= 768 && !reduced) {
      const section = track.closest<HTMLElement>("#work");
      if (section) {
        const range = Math.max(1,section.offsetHeight-innerHeight);
        const max = Math.max(1,track.scrollWidth-track.clientWidth);
        const start = section.getBoundingClientRect().top + scrollY;
        window.scrollTo({top:start+(target/max)*range,behavior:"smooth"});
      }
    }
  };

  return (
    <div className={styles.sequence}>
      <div className={styles.sequenceHead}>
        <p>FEATURED CASE STUDIES <span className={styles.sequenceTypes}>/ SYSTEMS &amp; WEBSITES</span></p>
        <div className={styles.controllers}>
          <span aria-live="polite">{String(active + 1).padStart(2, "0")} <span className={styles.faint}>/ 0{projects.length}</span></span>
          <button type="button" aria-label="Previous project" onClick={() => select(active - 1)}>←</button>
          <button type="button" aria-label="Next project" onClick={() => select(active + 1)}>→</button>
        </div>
      </div>
      <div className={styles.showcase}>
      <nav ref={trackRef} className={styles.gallery} aria-label="Projects gallery"
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault(); select(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        data-dragging={dragging}
        onPointerDown={event => {
          if(event.pointerType === "mouse" && event.button !== 0)return;
          pointer.current={ x:event.clientX, y:event.clientY };
        }}
        onPointerMove={event => {
          if (!pointer.current) return;
          if (Math.abs(event.clientX-pointer.current.x)>15) setDragging(true);
        }}
        onPointerUp={event => {
          if (!pointer.current) return;
          const dx=event.clientX-pointer.current.x;
          if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(event.clientY-pointer.current.y)) {
            suppressClick.current=true;
            select(active+(dx<0?1:-1));
          }
          pointer.current=null;
          setDragging(false);
        }}
        onPointerCancel={()=>{pointer.current=null;setDragging(false);}}
        onClickCapture={event=>{if(suppressClick.current){event.preventDefault();event.stopPropagation();suppressClick.current=false;}}}
      >
        {projects.map((project, index) => (
          <article key={project.slug}
            className={[styles.card, active === index ? styles.active : ""].join(" ")}
            data-project-slug={project.slug}
            data-active={active === index ? "true" : "false"}
            onFocusCapture={() => { activeRef.current = index; setActive(index); }}
          >
            <Link href={"/projects/" + project.slug} className={styles.projectLink} aria-label={"Explore " + project.shortTitle}>
              <span className={styles.imageContainer}
                onPointerMove={event => {
                  if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                  const rect = event.currentTarget.getBoundingClientRect();
                  const horizontal = (event.clientX - rect.left) / rect.width - .5;
                  const vertical = (event.clientY - rect.top) / rect.height - .5;
                  event.currentTarget.style.setProperty("--tilt-y", `${(horizontal * 3.2).toFixed(2)}deg`);
                  event.currentTarget.style.setProperty("--tilt-x", `${(-vertical * 2.6).toFixed(2)}deg`);
                  event.currentTarget.style.setProperty("--hover-x", `${(horizontal * 9).toFixed(1)}px`);
                  event.currentTarget.style.setProperty("--hover-y", `${(vertical * 7).toFixed(1)}px`);
                }}
                onPointerLeave={event => {
                  for (const property of ["--tilt-x","--tilt-y","--hover-x","--hover-y"]) {
                    event.currentTarget.style.removeProperty(property);
                  }
                }}
              >
                <span className={styles.imageVisual} style={{
                  width: `min(100%, ${project.imageWidth}px, calc(var(--preview-height) * ${project.imageWidth / project.imageHeight}))`,
                  aspectRatio: `${project.imageWidth} / ${project.imageHeight}`,
                }}>
                  <Image
                    src={project.image} alt={project.imageAlt ?? project.shortTitle + " interface preview"}
                    width={project.imageWidth} height={project.imageHeight}
                    sizes="(max-width: 767px) 90vw, (max-width: 1200px) 60vw, 760px"
                    unoptimized loading="eager"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </span>
                <span className={styles.hoverArrow} aria-hidden="true">↗</span>
              </span>
              <span className={styles.screenCaption}>
                <span>ACTUAL PROJECT SCREENSHOT</span>
                <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
              </span>
            </Link>
          </article>
        ))}
      </nav>
      <aside key={selected.slug} className={styles.projectNote} aria-live="polite" aria-atomic="true">
        <div className={styles.projectIdentity}>
          <p className={styles.noteNo}>PROJECT {String(active + 1).padStart(2, "0")} — {selected.status}</p>
          <h3 className={styles.noteTitle}>{selected.shortTitle}</h3>
          <p className={styles.noteCategory}>{selected.category[0]}</p>
        </div>
        <p className={styles.noteText}>{selected.overview}</p>
        <Link className={styles.openLink} href={"/projects/" + selected.slug}>
          Explore full case study <span aria-hidden="true">↗</span>
        </Link>
      </aside>
      </div>
      <div className={styles.end}>
        <div role="group" className={styles.progress} aria-label={"Project " + (active + 1) + " of " + projects.length}>
          {projects.map((project, index) => (
            <button key={project.slug} type="button"
              className={active === index ? styles.progressActive : ""}
              aria-label={"Show " + project.shortTitle}
              aria-pressed={active === index}
              onClick={() => select(index)}><span /></button>
          ))}
        </div>
        <div className={styles.endRight}>
          <span className={styles.dragHint}>SCROLL TO CHANGE PROJECT</span>
          <Link href="/projects">View all projects <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  );
}
