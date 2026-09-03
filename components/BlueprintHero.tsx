"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import "./blueprint-hero.css";
import "./home-scroll-fix.css";

export function BlueprintHero() {
  const coverRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;

    const updateScroll = () => {
      const cover = coverRef.current;
      if (!cover) return;

      const travel = Math.max(1, cover.offsetHeight - window.innerHeight);
      const sectionTop = cover.offsetTop;
      const scrolledThroughSection = window.scrollY - sectionTop;
      const progress = Math.min(1, Math.max(0, scrolledThroughSection / travel));
      const eased = 1 - Math.pow(1 - progress, 3);

      cover.style.setProperty("--sp", progress.toFixed(4));
      cover.style.setProperty("--se", eased.toFixed(4));
      cover.style.setProperty("--title-y", `${eased * -54}px`);
      cover.style.setProperty("--line-a-x", `${eased * -5.4}vw`);
      cover.style.setProperty("--line-b-x", `${eased * 5.4}vw`);
      cover.style.setProperty("--line-a-z", `${eased * 96}px`);
      cover.style.setProperty("--line-b-z", `${eased * 42}px`);
      cover.style.setProperty("--scene-rx", `${eased * 7}deg`);
      cover.style.setProperty("--scene-ry", `${eased * -4.5}deg`);
      cover.style.setProperty("--scene-z", `${eased * -72}px`);
      cover.style.setProperty("--scene-scale", `${1 - eased * 0.045}`);
      cover.style.setProperty("--grid-y", `${eased * 48}px`);
      cover.style.setProperty("--grid-r", `${eased * 6}deg`);
      cover.style.setProperty("--orbit-r", `${eased * 22}deg`);
      cover.style.setProperty("--paths-y", `${(1 - eased) * 34}px`);
      cover.style.setProperty("--paths-z", `${eased * 54}px`);
      cover.style.setProperty("--plane-a-x", `${eased * -8}vw`);
      cover.style.setProperty("--plane-b-x", `${eased * 9}vw`);
      cover.style.setProperty("--plane-r", `${eased * 16}deg`);
    };

    const queueUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScroll);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    window.addEventListener("pageshow", queueUpdate);

    if (typeof ResizeObserver !== "undefined" && coverRef.current) {
      resizeObserver = new ResizeObserver(queueUpdate);
      resizeObserver.observe(coverRef.current);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.removeEventListener("pageshow", queueUpdate);
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
              <div className="cover-identity">
                <span className="cover-name">{site.name}</span>
                <span className="cover-identity-divider" aria-hidden="true" />
                <span className="cover-role">{site.title}</span>
              </div>

              <h1>
                <span className="cover-line-a">DEVELOPER</span>
                <em className="cover-line-b">&amp; DESIGNER.</em>
              </h1>

              <p className="cover-signature">{site.headline}</p>

              <div className="cover-actions">
                <TrackedLink
                  href="/projects"
                  eventName="home_view_projects"
                  eventData={{ source: "hero" }}
                  className="v2-button v2-button-primary"
                >
                  View My Work <ArrowUpRight size={16} />
                </TrackedLink>

                {site.resume ? (
                  <TrackedLink
                    href={site.resume}
                    eventName="home_resume_click"
                    eventData={{ source: "hero" }}
                    className="v2-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </TrackedLink>
                ) : null}

                <TrackedLink
                  href="/contact"
                  eventName="home_contact_click"
                  eventData={{ source: "hero" }}
                  className="v2-button"
                >
                  Contact Me
                </TrackedLink>
              </div>

              <div className="cover-rule" aria-hidden="true"><i /></div>
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
        </div>

        <div className="cover-scroll-cue" aria-hidden="true">
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}
