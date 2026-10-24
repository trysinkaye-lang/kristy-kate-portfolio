"use client";

import { useEffect, useState } from "react";
import styles from "./IntroSplash.module.css";

/** A brief branded entrance; the CSS exit is independent of hydration or network timing. */
export function IntroSplash() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let started = 0;
    const animate = (stamp: number) => {
      if (!started) started = stamp;
      const x = Math.min(1, (stamp - started) / 970);
      setProgress(Math.round((1 - Math.pow(1 - x, 2.4)) * 100));
      if (x < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div data-intro-splash className={styles.splash} aria-hidden="true">
      <div className={styles.grain} />
      <div className={styles.inner}>
        <div className={styles.top}>
          <span>KRISTY KATE / PORTFOLIO</span>
          <span>EST. 2026 — PH</span>
        </div>
        <div className={styles.center}>
          <p className={styles.super}>SOFTWARE & DIGITAL EXPERIENCES</p>
          <div className={styles.brandLine}>
            <span className={styles.letter}>K</span>
            <span className={styles.orb}><span className={styles.orbCore} /></span>
            <span className={styles.letter}>K</span>
          </div>
          <p className={styles.sub}>MADE WITH INTENTION</p>
        </div>
        <div className={styles.bottom}>
          <span>OPENING EXPERIENCE</span>
          <span className={styles.track}><span className={styles.fill} /></span>
          <span className={styles.counter}>{String(progress).padStart(2, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
