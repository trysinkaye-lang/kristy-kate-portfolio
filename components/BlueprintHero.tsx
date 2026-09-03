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
      const eased = 1 - Math.pow(1 - progress, 3);

      cover.style.setProperty("--sp", progress.toFixed(4));
      cover.style.setProperty("--se", eased.toFixed(4));
      cover.style.setProperty("--title-y", `${eased * -92}px`);
      cover.style.setProperty("--line-a-x", `${eased * -8.5}vw`);
      cover.style.setProperty("--line-b-x", `${eased * 8.5}vw`);
      cover.style.setProperty("--line-a-z", `${eased * 150}px`);
      cover.style.setProperty("--line-b-z", `${eased * 58}px`);
      cover.style.setProperty("--scene-rx", `${eased * 11}deg`);
      cover.style.setProperty("--scene-ry", `${eased * -7}deg`);
      cover.style.setProperty("--scene-z", `${eased * -115}px`);
      cover.style.setProperty("--scene-scale", `${1 - eased * 0.075}`);
      cover.style.setProperty("--grid-y", `${eased * 76}px`);
      cover.style.setProperty("--grid-r", `${eased * 9}deg`);
      cover.style.setProperty("--orbit-r", `${eased * 32}deg`);
      cover.style.setProperty("--paths-y", `${(1 - eased) * 54}px`);
      cover.style.setProperty("--paths-z", `${eased * 86}px`);
      cover.style.setProperty("--plane-a-x", `${eased * -12}vw`);
      cover.style.setProperty("--plane-b-x", `${eased * 14}vw`);
      cover.style.setProperty("--plane-r", `${eased * 24}deg`);
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
    cover.style.setProperty("--rx", `${(0.5 - y) * 3.3}deg`);
    cover.style.setProperty("--ry", `${(x - 0.5) * 4.8}deg`);
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
        <div className="cover-depth-plane cover-depth-plane-a" aria-hidden="true" />
        <div className="cover-depth-plane cover-depth-plane-b" aria-hidden="true" />
        <div className="cover-depth-ring" aria-hidden="true"><i /><b /></div>

        <div className="portfolio-shell cover-shell">
          <div className="cover-stage">
            <div className="cover-title-wrap">
              <div className="cover-role">SOFTWARE / UI·UX</div>
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
          <span>SCROLL TO MOVE THROUGH DEPTH</span>
          <ArrowDown size={14} />
        </div>
      </div>
    </section>
  );
}
