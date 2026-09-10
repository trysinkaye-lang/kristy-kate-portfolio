"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import styles from "./project-reel.module.css";

const artOverrides: Record<string, string> = {
  "co-designs": "/media/co-designs-residence.webp",
  "marci-metzger": "/media/marci-landscape.webp",
  lacomus: "/media/lacomus-product.webp",
  "design-systems": "/media/design-1.svg",
};

const labels: Record<string, string> = {
  rbim: "Flagship information system",
  "co-designs": "Architecture / creative development",
  ahdis: "Health information system",
  "marci-metzger": "Real-estate website redesign",
  lacomus: "Brand / product experience",
  "erp-system": "Business information system",
  "design-systems": "Interface / digital design archive",
};

export function InteractiveProjectReel() {
  const reelRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const activeProject = useMemo(
    () => projects.find((project) => project.slug === activeSlug) ?? projects[0],
    [activeSlug],
  );

  const movePreview = (event: React.PointerEvent<HTMLElement>) => {
    const reel = reelRef.current;
    if (!reel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = reel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 16;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 12;
    reel.style.setProperty("--preview-x", `${x}px`);
    reel.style.setProperty("--preview-y", `${y}px`);
  };

  const resetPreview = () => {
    const reel = reelRef.current;
    if (!reel) return;
    reel.style.setProperty("--preview-x", "0px");
    reel.style.setProperty("--preview-y", "0px");
  };

  return (
    <section
      ref={reelRef}
      id="work"
      className={styles.reel}
      aria-labelledby="selected-work-title"
      onPointerMove={movePreview}
      onPointerLeave={resetPreview}
    >
      <div className={styles.previewStack} aria-hidden="true">
        {projects.map((project) => (
          <div
            key={project.slug}
            className={`${styles.preview} ${activeSlug === project.slug ? styles.previewActive : ""}`}
          >
            <Image
              src={artOverrides[project.slug] ?? project.image}
              alt=""
              fill
              sizes="100vw"
              priority={project.slug === "rbim"}
            />
            <div className={styles.previewShade} />
          </div>
        ))}
      </div>

      <div className={styles.reelNoise} aria-hidden="true" />

      <div className={`shell ${styles.reelInner}`}>
        <div className={styles.reelHeader}>
          <div>
            <p className={styles.kicker}>Selected work / 07</p>
            <h2 id="selected-work-title">Move through the work.</h2>
          </div>
          <div className={styles.activeSummary} aria-live="polite">
            <p>{labels[activeProject.slug]}</p>
            <span>{activeProject.role}</span>
          </div>
        </div>

        <nav className={styles.projectList} aria-label="Selected projects">
          {projects.map((project, index) => {
            const active = project.slug === activeSlug;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`${styles.projectRow} ${active ? styles.projectRowActive : ""}`}
                onPointerEnter={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
                aria-label={`Open ${project.shortTitle} case study`}
              >
                <span className={styles.projectNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.projectTitle}>{project.shortTitle}</span>
                <span className={styles.projectCategory}>{labels[project.slug]}</span>
                <span className={styles.projectArrow} aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.reelFooter}>
          <p>Hover, focus or tap a project to change the scene.</p>
          <Link href="/projects">View the complete project index <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
