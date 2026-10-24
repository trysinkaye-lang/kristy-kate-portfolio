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
      if (Date.now() < manualUntil.current) return;
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const start = section.getBoundingClientRect().top + window.scrollY;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / range));
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      track.scrollLeft = maxScroll * progress;
      const cards = Array.from(track.querySelectorAll<HTMLElement>("article"));
      const midpoint = track.scrollLeft + track.clientWidth / 2;
      let closest = 0, distance = Infinity;
      cards.forEach((card, index) => {
        const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - midpoint);
        if (d < distance) { distance = d; closest = index; }
      });
      if (closest !== activeRef.current) {
        activeRef.current = closest;
        setActive(closest);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const observer = new ResizeObserver(schedule);
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
        <p>SELECTED / SOFTWARE — WEBSITES — SYSTEMS</p>
        <div className={styles.controllers}>
          <span aria-live="polite">{String(active + 1).padStart(2, "0")} <span className={styles.faint}>/ 0{projects.length}</span></span>
          <button type="button" aria-label="Previous project" onClick={() => select(active - 1)}>←</button>
          <button type="button" aria-label="Next project" onClick={() => select(active + 1)}>→</button>
        </div>
      </div>
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
            onFocusCapture={() => { activeRef.current = index; setActive(index); }}
          >
            <Link href={"/projects/" + project.slug} className={styles.projectLink} aria-label={"Explore " + project.shortTitle}>
              <span className={styles.imageContainer}>
                <Image
                  src={project.image} alt={project.imageAlt ?? project.shortTitle + " interface preview"}
                  width={project.imageWidth} height={project.imageHeight}
                  sizes="(max-width: 767px) 76vw, 520px"
                  unoptimized loading="eager"
                  style={{ maxWidth: `min(100%, ${project.imageWidth}px)`, maxHeight: `min(100%, ${project.imageHeight}px)` }}
                />
                <span className={styles.hoverArrow} aria-hidden="true">↗</span>
              </span>
              <span className={styles.caption}>
                <span className={styles.cardNo}>{String(index + 1).padStart(2, "0")} / 0{projects.length}</span>
                <strong>{project.shortTitle}</strong>
                <span className={styles.cardCategory}>{project.category[0]}</span>
              </span>
            </Link>
          </article>
        ))}
      </nav>
      <div className={styles.projectNote} aria-live="polite" aria-atomic="true">
        <div>
          <p className={styles.noteNo}>PROJECT {String(active + 1).padStart(2, "0")} — {selected.status}</p>
          <p className={styles.noteTitle}>{selected.shortTitle}</p>
        </div>
        <p className={styles.noteText}>{selected.overview}</p>
        <Link className={styles.openLink} href={"/projects/" + selected.slug}>
          View project <span aria-hidden="true">↗</span>
        </Link>
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
          <span className={styles.dragHint}>SCROLL TO EXPLORE</span>
          <Link href="/projects">View all projects <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  );
}
