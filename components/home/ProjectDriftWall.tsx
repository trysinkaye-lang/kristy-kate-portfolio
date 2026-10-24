"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { publicProjects } from "@/data/projects";
import styles from "./SelectedWork.module.css";

const featured = ["rbim", "ahdis", "co-designs", "marci-metzger"];
const projects = featured.flatMap(slug => publicProjects.filter(project => project.slug === slug));

export function ProjectDriftWall() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLElement>(null);
  const selected = projects[active];
  const focusCard = (index: number) => setActive(index);

  const select = (index: number) => {
    const next = (index + projects.length) % projects.length;
    setActive(next);
    const item = trackRef.current?.querySelectorAll("article")[next];
    if (item && window.innerWidth < 768) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      item.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className={styles.sequence}>
      <div className={styles.sequenceHead}>
        <p>Software / Websites / Information systems</p>
        <div className={styles.controllers}>
          <span aria-live="polite">{String(active + 1).padStart(2, "0")} <span className={styles.faint}>/ 04</span></span>
          <button type="button" aria-label="Previous project" onClick={() => select(active - 1)}>←</button>
          <button type="button" aria-label="Next project" onClick={() => select(active + 1)}>→</button>
        </div>
      </div>
      <nav ref={trackRef} className={styles.gallery} aria-label="Projects gallery" tabIndex={0}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScroll={event => {
          if (window.innerWidth >= 768) return;
          const track = event.currentTarget;
          const mid = track.scrollLeft + track.clientWidth / 2;
          const cards = Array.from(track.querySelectorAll<HTMLElement>("article"));
          const closest = cards.reduce((best, card, index) =>
            Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid) ? index : best, 0);
          setActive(prev => prev === closest ? prev : closest);
        }}>
        {projects.map((project, index) => (
          <article key={project.slug}
            className={[styles.card, active === index ? styles.active : ""].join(" ")}
            data-project-slug={project.slug}
            onMouseEnter={() => setActive(index)}
            onFocusCapture={() => focusCard(index)}
          >
            <Link href={"/projects/" + project.slug} className={styles.projectLink} aria-label={"Explore " + project.shortTitle}>
              <span className={styles.imageContainer}>
                <Image
                  src={project.image} alt={project.imageAlt ?? project.shortTitle + " interface preview"}
                  width={project.imageWidth} height={project.imageHeight}
                  sizes="(max-width: 767px) 75vw, (max-width: 1150px) 32vw, 490px"
                  unoptimized
                  priority={index === 0}
                  style={{ maxWidth: `${project.imageWidth}px`, maxHeight: `${project.imageHeight}px` }}
                />
                <span className={styles.hoverArrow} aria-hidden="true">↗</span>
              </span>
              <span className={styles.caption}>
                <span className={styles.cardNo}>({String(index + 1).padStart(2, "0")})</span>
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
        <div className={styles.progress} aria-label={"Project " + (active + 1) + " of " + projects.length}>
          {projects.map((project, index) => (
            <button key={project.slug} type="button"
              className={active === index ? styles.progressActive : ""}
              aria-label={"Show " + project.shortTitle}
              aria-pressed={active === index}
              onClick={() => select(index)}><span /></button>
          ))}
        </div>
        <Link href="/projects">Browse all projects <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  );
}
