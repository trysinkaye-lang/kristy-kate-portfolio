"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/data/site";
import styles from "./home.module.css";

const clamp = (value: number) => Math.min(78, Math.max(22, value));

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [split, setSplit] = useState(50);

  const setFromPointer = (clientX: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    setSplit(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromPointer(event.clientX);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromPointer(event.clientX);
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onDividerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSplit((value) => clamp(value - 4));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSplit((value) => clamp(value + 4));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setSplit(22);
    }
    if (event.key === "End") {
      event.preventDefault();
      setSplit(78);
    }
  };

  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={`shell ${styles.heroTop}`}>
        <h1 id="identity" className={styles.heroName}>Kristy Kate Taylor</h1>
        <p className={styles.heroPositioning}>Digital products, from expressive websites to operational systems.</p>
        <p className={styles.heroAvailability}><span aria-hidden="true" /> Philippines · available for selected work</p>
      </div>

      <div
        ref={stageRef}
        className={styles.splitStage}
        style={{ "--split": `${split}%` } as React.CSSProperties}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <div className={`${styles.world} ${styles.systemWorld}`} aria-hidden="true">
          <p className={styles.worldLabel}>SYSTEM</p>
          <div className={styles.systemCopy}>
            <span>RBIM</span><span>AHDIS</span><span>ERP</span>
          </div>
          <div className={styles.systemScreen}>
            <Image src="/media/rbim-dashboard.webp" alt="" width={640} height={341} priority sizes="(max-width: 767px) 74vw, 720px" />
          </div>
          <p className={styles.worldStatement}>Architecture · workflows · databases · desktop</p>
        </div>

        <div className={`${styles.world} ${styles.experienceWorld}`} aria-hidden="true">
          <Image className={styles.experienceImage} src="/media/co-designs-residence.webp" alt="" width={817} height={631} priority sizes="100vw" />
          <div className={styles.experienceVeil} />
          <p className={styles.worldLabel}>EXPERIENCE</p>
          <div className={styles.experienceCopy}>
            <span>C.O.</span><span>MARCI</span><span>LACOMUS</span>
          </div>
          <p className={styles.worldStatement}>Art direction · interaction · UI/UX · web</p>
        </div>

        <div className={styles.portraitPair} aria-hidden="true">
          <div className={styles.portraitSystem}>
            <Image src="/media/kristy-kate-professional-portrait-v2.webp" alt="" width={960} height={960} priority sizes="(max-width: 767px) 54vw, 420px" />
          </div>
          <div className={styles.portraitExperience}>
            <Image src="/media/kristy-kate-professional-portrait-v2.webp" alt="" width={960} height={960} priority sizes="(max-width: 767px) 54vw, 420px" />
          </div>
        </div>

        <div
          className={styles.divider}
          role="slider"
          tabIndex={0}
          aria-label="Balance systems and creative experience"
          aria-valuemin={22}
          aria-valuemax={78}
          aria-valuenow={Math.round(split)}
          aria-valuetext={`${Math.round(split)} percent systems emphasis`}
          onKeyDown={onDividerKeyDown}
        >
          <span className={styles.dividerHandle} aria-hidden="true">↔</span>
        </div>

        <div className={styles.heroMessage}>
          <p>I design and build</p>
          <strong>digital products</strong>
          <p>that have to work <em>and</em> feel right.</p>
        </div>

        <p className={styles.dragHint}>Drag the line · use arrow keys · explore both sides</p>
      </div>

      <div className={`shell ${styles.heroBottom}`}>
        <Link href="#work" className={styles.heroLink}>Explore the work <span aria-hidden="true">↓</span></Link>
        <p>Full-stack development · UI/UX · creative development</p>
        <Link href="/contact" className={styles.heroLink}>Start a project <span aria-hidden="true">↗</span></Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            url: site.url,
            jobTitle: ["Full-Stack Developer", "UI/UX Designer", "Creative Developer"],
            sameAs: [site.github],
            knowsAbout: ["Information systems", "UI/UX", "Web development", "Databases", "Desktop applications"],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
