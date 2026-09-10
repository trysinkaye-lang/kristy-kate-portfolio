"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import styles from "./home.module.css";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 760);
        hero.style.setProperty("--lane-a", `${-y * 0.055}px`);
        hero.style.setProperty("--lane-b", `${y * 0.035}px`);
        hero.style.setProperty("--lane-c", `${-y * 0.025}px`);
        hero.style.setProperty("--portrait-scroll", `${Math.min(y * 0.022, 18)}px`);
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty("--portrait-x", `${x * 12}px`);
    hero.style.setProperty("--portrait-y", `${y * 10}px`);
  };

  const resetPointer = () => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty("--portrait-x", "0px");
    hero.style.setProperty("--portrait-y", "0px");
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className={styles.hero}
      aria-labelledby="identity"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className={`shell ${styles.heroTop}`}>
        <h1 id="identity" className={styles.heroName}>Kristy Kate Taylor</h1>
        <p className={styles.heroLocation}>Philippines · Design + engineering</p>
        <p className={styles.heroAvailability}><span aria-hidden="true" /> Available for selected work</p>
      </div>

      <div className={styles.heroStage}>
        <div className={styles.roleField} aria-label="Full-Stack Developer, UI/UX Designer, Creative Developer">
          <p className={`${styles.roleLane} ${styles.roleLaneA}`} data-text="FULL-STACK DEVELOPER">FULL-STACK DEVELOPER</p>
          <p className={`${styles.roleLane} ${styles.roleLaneB}`} data-text="UI / UX DESIGNER">UI / UX DESIGNER</p>
          <p className={`${styles.roleLane} ${styles.roleLaneC}`} data-text="CREATIVE DEVELOPER">CREATIVE DEVELOPER</p>
        </div>

        <figure className={styles.heroPortrait}>
          <div className={styles.portraitFrame}>
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              alt="Kristy Kate Taylor"
              width={960}
              height={960}
              priority
              sizes="(max-width: 767px) 52vw, (max-width: 1100px) 34vw, 430px"
            />
          </div>
          <figcaption>Full-stack systems, interfaces and creative web experiences.</figcaption>
        </figure>

        <p className={styles.heroManifesto}>
          I move between <em>systems</em> and <em>visual detail</em> — from database structure and desktop workflows to interaction, typography and motion.
        </p>
      </div>

      <div className={`shell ${styles.heroBottom}`}>
        <Link href="#work" className={styles.heroLink}>Explore selected work <span aria-hidden="true">↓</span></Link>
        <p>Software systems · Websites · UI/UX</p>
        <Link href="/contact" className={styles.heroLink}>Start a conversation <span aria-hidden="true">↗</span></Link>
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
