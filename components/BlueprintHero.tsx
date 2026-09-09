"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import "./blueprint-hero.css";
import "./home-scroll-fix.css";
import "./home-hero-breathing-room.css";
import "./home/hero-scroll-restored.css";

export function BlueprintHero() {
  const coverRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resetMotion = (cover: HTMLElement) => {
      cover.style.setProperty("--sp", "0");
      cover.style.setProperty("--se", "0");
      cover.style.setProperty("--hero-y", "0px");
      cover.style.setProperty("--hero-scale", "1");
      cover.style.setProperty("--hero-opacity", "1");
      cover.style.setProperty("--line-a-x", "0vw");
      cover.style.setProperty("--line-b-x", "0vw");
      cover.style.setProperty("--line-a-y", "0px");
      cover.style.setProperty("--line-b-y", "0px");
      cover.style.setProperty("--intro-x", "0vw");
      cover.style.setProperty("--intro-y", "0px");
      cover.style.setProperty("--intro-opacity", "1");
      cover.style.setProperty("--identity-y", "0px");
      cover.style.setProperty("--identity-opacity", "1");
      cover.style.setProperty("--proof-y", "0px");
      cover.style.setProperty("--proof-opacity", "1");
      cover.style.setProperty("--grid-y", "0px");
      cover.style.setProperty("--grid-r", "0deg");
      cover.style.setProperty("--orbit-r", "0deg");
    };

    const updateScroll = () => {
      const cover = coverRef.current;
      if (!cover) return;

      if (reduceMotion.matches || window.innerWidth <= 760) {
        resetMotion(cover);
        return;
      }

      const travel = Math.max(1, cover.offsetHeight - window.innerHeight);
      const scrolledThroughSection = window.scrollY - cover.offsetTop;
      const progress = Math.min(1, Math.max(0, scrolledThroughSection / travel));
      const eased = 1 - Math.pow(1 - progress, 3);

      cover.style.setProperty("--sp", progress.toFixed(4));
      cover.style.setProperty("--se", eased.toFixed(4));
      cover.style.setProperty("--hero-y", `${eased * -30}px`);
      cover.style.setProperty("--hero-scale", `${1 - eased * 0.022}`);
      cover.style.setProperty("--hero-opacity", `${1 - progress * 0.08}`);
      cover.style.setProperty("--line-a-x", `${eased * -4.8}vw`);
      cover.style.setProperty("--line-b-x", `${eased * 4.8}vw`);
      cover.style.setProperty("--line-a-y", `${eased * -8}px`);
      cover.style.setProperty("--line-b-y", `${eased * 10}px`);
      cover.style.setProperty("--intro-x", `${eased * 2.2}vw`);
      cover.style.setProperty("--intro-y", `${eased * -16}px`);
      cover.style.setProperty("--intro-opacity", `${1 - progress * 0.28}`);
      cover.style.setProperty("--identity-y", `${eased * -14}px`);
      cover.style.setProperty("--identity-opacity", `${1 - progress * 0.22}`);
      cover.style.setProperty("--proof-y", `${eased * -12}px`);
      cover.style.setProperty("--proof-opacity", `${Math.max(0, 1 - progress * 1.55)}`);
      cover.style.setProperty("--grid-y", `${eased * 42}px`);
      cover.style.setProperty("--grid-r", `${eased * 4.5}deg`);
      cover.style.setProperty("--orbit-r", `${eased * 18}deg`);
    };

    const queueUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScroll);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    window.addEventListener("pageshow", queueUpdate);
    reduceMotion.addEventListener("change", queueUpdate);

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
      reduceMotion.removeEventListener("change", queueUpdate);
    };
  }, []);

  return (
    <section ref={coverRef} id="home" className="home-cover home-cover-clean" aria-label="Portfolio home">
      <div className="cover-sticky">
        <div className="cover-noise" aria-hidden="true" />
        <div className="cover-grid" aria-hidden="true" />
        <div className="cover-light" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-a" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-b" aria-hidden="true" />

        <div className="portfolio-shell cover-shell">
          <div className="cover-professional-layout">
            <div className="cover-identity">
              <span className="cover-name">{site.name}</span>
              <span className="cover-identity-divider" aria-hidden="true" />
              <span className="cover-role">{site.title}</span>
            </div>

            <div className="cover-headline-block">
              <h1>
                <span className="cover-line-a">DEVELOPER</span>
                <em className="cover-line-b">&amp; DESIGNER.</em>
              </h1>

              <div className="cover-intro-column">
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

                  <TrackedLink
                    href="/contact"
                    eventName="home_contact_click"
                    eventData={{ source: "hero" }}
                    className="v2-button"
                  >
                    Contact Me
                  </TrackedLink>
                </div>
              </div>
            </div>

            <div className="cover-proof" aria-label="Core portfolio disciplines">
              <span>Website Design</span>
              <span>Full-Stack Development</span>
              <span>Information Systems</span>
              <span>Responsive Interfaces</span>
            </div>
          </div>
        </div>

        <div className="cover-scroll-cue" aria-hidden="true">
          <ArrowDown size={16} /> Scroll to selected work
        </div>
      </div>
    </section>
  );
}
