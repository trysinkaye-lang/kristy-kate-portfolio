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
      cover.style.setProperty("--title-y", `${progress * -58}px`);
      cover.style.setProperty("--line-a-x", `${progress * -8}vw`);
      cover.style.setProperty("--line-b-x", `${progress * 8}vw`);
      cover.style.setProperty("--mono-r", `${progress * 8}deg`);
      cover.style.setProperty("--mono-s", `${1 + progress * 0.16}`);
      cover.style.setProperty("--grid-y", `${progress * 42}px`);
      cover.style.setProperty("--paths-y", `${(1 - progress) * 28}px`);
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
    cover.style.setProperty("--rx", `${(0.5 - y) * 3.5}deg`);
    cover.style.setProperty("--ry", `${(x - 0.5) * 5}deg`);
  };

  const resetPointer = () => {
    const cover = coverRef.current;
    if (!cover) return;
    cover.style.setProperty("--mx", "68%");
    cover.style.setProperty("--my", "36%");
    cover.style.setProperty("--rx", "0deg");
    cover.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      ref={coverRef}
      id="home"
      className="home-cover"
      aria-label="Kristy Kate Taylor portfolio cover"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="cover-sticky">
        <div className="cover-noise" aria-hidden="true" />
        <div className="cover-grid" aria-hidden="true" />
        <div className="cover-light" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-a" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-b" aria-hidden="true" />

        <div className="portfolio-shell cover-shell">
          <div className="cover-meta">
            <span>KRISTY KATE TAYLOR</span>
            <span>PORTFOLIO / 2026</span>
          </div>

          <div className="cover-stage">
            <div className="cover-monogram" aria-hidden="true">KKT</div>
            <div className="cover-title-wrap">
              <span className="cover-index">001 / HOME</span>
              <h1>
                <span className="cover-line-a">CLARITY</span>
                <em className="cover-line-b">ENGINEERED.</em>
              </h1>
              <div className="cover-rule" aria-hidden="true"><i /></div>
            </div>

            <div className="cover-coordinates" aria-hidden="true">
              <span>38.7°</span>
              <span>∞ / 01</span>
              <span>SYS.READY</span>
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
              <span className="cover-path-label">STORY</span>
              <ArrowUpRight size={20} />
            </Link>
            <Link href="/contact" className="cover-path">
              <span className="cover-path-number">03</span>
              <span className="cover-path-label">HELLO</span>
              <ArrowUpRight size={20} />
            </Link>
          </nav>

          <div className="cover-footer">
            <span>INTERACTIVE DIGITAL COVER</span>
            <span>MOVE YOUR CURSOR</span>
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
