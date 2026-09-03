"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./blueprint-hero.css";

export function BlueprintHero() {
  const coverRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      const cover = coverRef.current;
      if (!cover) return;

      const rect = cover.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));

      cover.style.setProperty("--sp", progress.toFixed(4));
      cover.style.setProperty("--title-y", `${progress * -52}px`);
      cover.style.setProperty("--line-a-x", `${progress * -6.5}vw`);
      cover.style.setProperty("--line-b-x", `${progress * 6.5}vw`);
      cover.style.setProperty("--grid-y", `${progress * 34}px`);
      cover.style.setProperty("--paths-y", `${(1 - progress) * 22}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const cover = coverRef.current;
    if (!cover) return;
    const rect = cover.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cover.style.setProperty("--mx", `${x * 100}%`);
    cover.style.setProperty("--my", `${y * 100}%`);
    cover.style.setProperty("--rx", `${(0.5 - y) * 2.4}deg`);
    cover.style.setProperty("--ry", `${(x - 0.5) * 3.6}deg`);
  };

  const resetPointer = () => {
    const cover = coverRef.current;
    if (!cover) return;
    cover.style.setProperty("--mx", "72%");
    cover.style.setProperty("--my", "30%");
    cover.style.setProperty("--rx", "0deg");
    cover.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      ref={coverRef}
      id="home"
      className="home-cover home-cover-clean"
      aria-label="Portfolio home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="cover-sticky">
        <div className="cover-noise" aria-hidden="true" />
        <div className="cover-grid" aria-hidden="true" />
        <div className="cover-light" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-a" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-b" aria-hidden="true" />
        <div className="cover-ribbon cover-ribbon-a" aria-hidden="true" />
        <div className="cover-ribbon cover-ribbon-b" aria-hidden="true" />

        <div className="portfolio-shell cover-shell">
          <div className="cover-stage">
            <div className="cover-title-wrap">
              <h1>
                <span className="cover-line-a">DEVELOPER</span>
                <em className="cover-line-b">&amp; DESIGNER.</em>
              </h1>
              <p className="cover-signature">Designing thoughtful digital experiences with code, clarity, and care.</p>
              <div className="cover-rule" aria-hidden="true"><i /></div>
            </div>

            <div className="cover-coordinates" aria-hidden="true">
              <span>DESIGN</span>
              <span>CODE</span>
              <span>DETAIL</span>
            </div>
          </div>

          <nav className="cover-paths" aria-label="Explore portfolio">
            <Link href="/projects" className="cover-path">
              <span className="cover-path-number">01</span>
              <span className="cover-path-label">WORK</span>
              <ArrowUpRight size={20} />
            </Link>
            <Link href="/about" className="cover-path">
              <span className="cover-path-number">02</span>
              <span className="cover-path-label">ABOUT</span>
              <ArrowUpRight size={20} />
            </Link>
            <Link href="/contact" className="cover-path">
              <span className="cover-path-number">03</span>
              <span className="cover-path-label">CONTACT</span>
              <ArrowUpRight size={20} />
            </Link>
          </nav>

          <div className="cover-footer">
            <span>DESIGNED &amp; BUILT WITH INTENTION</span>
            <span>INTERACTIVE PORTFOLIO</span>
          </div>
        </div>

        <div className="cover-scroll-cue" aria-hidden="true">
          <span>SCROLL</span>
          <ArrowDown size={14} />
        </div>
      </div>
    </section>
  );
}
