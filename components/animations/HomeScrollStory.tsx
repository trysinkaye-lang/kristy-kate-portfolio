"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnetLite } from "@/components/react-bits/MagnetLite";

export function HomeScrollStory() {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    if (!story || !stage) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const software = stage.querySelector<HTMLElement>("[data-word='software']");
        const systems = stage.querySelector<HTMLElement>("[data-word='systems']");
        const interfaces = stage.querySelector<HTMLElement>("[data-word='interfaces']");
        const resolve = stage.querySelector<HTMLElement>("[data-resolve]");
        const intro = stage.querySelectorAll<HTMLElement>("[data-intro]");
        const portal = stage.querySelector<HTMLElement>("[data-portal]");
        const portalLabel = stage.querySelector<HTMLElement>("[data-portal-label]");
        const ticks = stage.querySelectorAll<HTMLElement>("[data-tick]");
        const phase = stage.querySelectorAll<HTMLElement>("[data-phase]");

        if (!software || !systems || !interfaces || !resolve || !portal || !portalLabel) return;

        gsap.set(systems, { xPercent: 34, opacity: 0.16 });
        gsap.set(interfaces, { xPercent: -28, opacity: 0.12 });
        gsap.set(resolve, { opacity: 0, y: 40 });
        gsap.set(portal, { scale: 0.56, borderRadius: "999px" });
        gsap.set(portalLabel, { opacity: 0 });
        gsap.set(phase, { opacity: 0 });
        gsap.set(phase[0], { opacity: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: "top top",
            end: "+=300%",
            scrub: 0.85,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(software, { xPercent: -22, yPercent: -16, scale: 0.9, ease: "none", duration: 1 }, 0)
          .to(systems, { xPercent: 0, opacity: 1, scale: 1.08, ease: "none", duration: 1 }, 0)
          .to(intro, { opacity: 0.58, y: -10, ease: "none", duration: 1 }, 0)
          .to(ticks, { x: (i) => (i % 2 === 0 ? 28 : -24), opacity: 0.7, stagger: 0.02, ease: "none", duration: 1 }, 0)
          .to(phase[0], { opacity: 0, duration: 0.15 }, 0.72)
          .to(phase[1], { opacity: 1, duration: 0.15 }, 0.78)

          .to(software, { xPercent: -42, yPercent: -26, opacity: 0.2, ease: "none", duration: 1 }, 1)
          .to(systems, { xPercent: 18, yPercent: -5, opacity: 0.35, scale: 0.92, ease: "none", duration: 1 }, 1)
          .to(interfaces, { xPercent: 0, yPercent: 10, opacity: 1, scale: 1.08, ease: "none", duration: 1 }, 1)
          .to(portal, { scale: 0.9, rotate: -4, ease: "none", duration: 1 }, 1)
          .to(phase[1], { opacity: 0, duration: 0.15 }, 1.72)
          .to(phase[2], { opacity: 1, duration: 0.15 }, 1.78)

          .to(software, { opacity: 0.07, yPercent: -36, ease: "none", duration: 1 }, 2)
          .to(systems, { opacity: 0.08, xPercent: 36, ease: "none", duration: 1 }, 2)
          .to(interfaces, { opacity: 0.08, yPercent: 32, ease: "none", duration: 1 }, 2)
          .to(portal, { scale: 1.82, rotate: 0, borderRadius: "34px", ease: "none", duration: 1 }, 2)
          .to(portalLabel, { opacity: 1, y: -4, ease: "none", duration: 0.55 }, 2.18)
          .to(resolve, { opacity: 1, y: 0, ease: "none", duration: 0.7 }, 2.25)
          .to(phase[2], { opacity: 0, duration: 0.15 }, 2.72)
          .to(phase[3], { opacity: 1, duration: 0.15 }, 2.78);
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={storyRef} className="home16-story" aria-label="Scroll-driven portfolio introduction">
      <div ref={stageRef} className="home16-stage">
        <div className="home16-grid" aria-hidden="true" />
        <div className="home16-glow" aria-hidden="true" />

        <div className="portfolio-shell home16-stage-inner">
          <div className="home16-topline" data-intro>
            <span>Kristy Kate Taylor</span>
            <span>Software Developer · UI/UX Designer</span>
          </div>

          <div className="home16-word-field" aria-hidden="true">
            <span className="home16-word home16-word-software" data-word="software">SOFTWARE</span>
            <span className="home16-word home16-word-systems" data-word="systems">SYSTEMS</span>
            <span className="home16-word home16-word-interfaces" data-word="interfaces">INTERFACES</span>
          </div>

          <div className="home16-portal" data-portal aria-hidden="true">
            <div className="home16-portal-noise" />
            <span data-portal-label>DESIGN × DEVELOPMENT</span>
          </div>

          <div className="home16-resolve" data-resolve>
            <p>One focus</p>
            <h1>I make complex work feel clear.</h1>
            <div className="home16-resolve-actions">
              <MagnetLite>
                <Link href="/projects" className="v2-button v2-button-primary">
                  View selected work <ArrowRight size={16} />
                </Link>
              </MagnetLite>
              <Link href="/about" className="home16-text-link">About me</Link>
            </div>
          </div>

          <div className="home16-phase" aria-hidden="true">
            <span data-phase>01 · Software</span>
            <span data-phase>02 · Systems</span>
            <span data-phase>03 · Interfaces</span>
            <span data-phase>04 · Clarity</span>
          </div>

          <div className="home16-ticks" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => (
              <i key={index} data-tick />
            ))}
          </div>

          <div className="home16-scroll" data-intro aria-hidden="true">
            <span>Scroll to shape the story</span>
            <ArrowDown size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}
