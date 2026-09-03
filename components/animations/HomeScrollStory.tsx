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
        const phase = stage.querySelectorAll<HTMLElement>("[data-phase]");
        const progress = stage.querySelector<HTMLElement>("[data-progress]");

        if (!software || !systems || !interfaces || !resolve || !portal || !portalLabel || !progress) return;

        gsap.set([software, systems, interfaces], { opacity: 0.3, scale: 1 });
        gsap.set(software, { opacity: 1 });
        gsap.set(resolve, { opacity: 0, y: 28 });
        gsap.set(portal, { scaleX: 0.12, scaleY: 0.035, opacity: 0.7, borderRadius: "999px" });
        gsap.set(portalLabel, { opacity: 0 });
        gsap.set(phase, { opacity: 0 });
        gsap.set(phase[0], { opacity: 1 });
        gsap.set(progress, { scaleX: 0.08 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: "top top",
            end: "+=270%",
            scrub: 0.85,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(software, { opacity: 0.28, scale: 0.985, ease: "none", duration: 1 }, 0)
          .to(systems, { opacity: 1, scale: 1.018, ease: "none", duration: 1 }, 0)
          .to(progress, { scaleX: 0.34, ease: "none", duration: 1 }, 0)
          .to(phase[0], { opacity: 0, duration: 0.14 }, 0.72)
          .to(phase[1], { opacity: 1, duration: 0.14 }, 0.78)

          .to(systems, { opacity: 0.28, scale: 0.985, ease: "none", duration: 1 }, 1)
          .to(interfaces, { opacity: 1, scale: 1.018, ease: "none", duration: 1 }, 1)
          .to(portal, { scaleX: 0.6, scaleY: 0.055, opacity: 0.92, ease: "none", duration: 1 }, 1)
          .to(progress, { scaleX: 0.67, ease: "none", duration: 1 }, 1)
          .to(phase[1], { opacity: 0, duration: 0.14 }, 1.72)
          .to(phase[2], { opacity: 1, duration: 0.14 }, 1.78)

          .to([software, systems, interfaces], { opacity: 0.08, scale: 0.97, ease: "none", duration: 1 }, 2)
          .to(intro, { opacity: 0.28, ease: "none", duration: 1 }, 2)
          .to(portal, { scaleX: 1.78, scaleY: 1.3, opacity: 1, borderRadius: "30px", ease: "none", duration: 1 }, 2)
          .to(portalLabel, { opacity: 1, ease: "none", duration: 0.45 }, 2.16)
          .to(resolve, { opacity: 1, y: 0, ease: "none", duration: 0.7 }, 2.24)
          .to(progress, { scaleX: 1, ease: "none", duration: 1 }, 2)
          .to(phase[2], { opacity: 0, duration: 0.14 }, 2.72)
          .to(phase[3], { opacity: 1, duration: 0.14 }, 2.78);
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={storyRef} className="home16-story home17-story" aria-label="Scroll-driven portfolio introduction">
      <div ref={stageRef} className="home16-stage home17-stage">
        <div className="home16-grid" aria-hidden="true" />
        <div className="home16-glow" aria-hidden="true" />

        <div className="portfolio-shell home16-stage-inner home17-stage-inner">
          <div className="home16-topline" data-intro>
            <span>Kristy Kate Taylor</span>
            <span>Software Developer · UI/UX Designer</span>
          </div>

          <div className="home17-heading-block" aria-hidden="true">
            <span className="home17-word" data-word="software">SOFTWARE</span>
            <span className="home17-word home17-word-editorial" data-word="systems">SYSTEMS</span>
            <span className="home17-word" data-word="interfaces">INTERFACES</span>
          </div>

          <div className="home17-progress-track" aria-hidden="true">
            <span data-progress />
          </div>

          <div className="home16-portal home17-portal" data-portal aria-hidden="true">
            <div className="home16-portal-noise" />
            <span data-portal-label>DESIGN × DEVELOPMENT</span>
          </div>

          <div className="home16-resolve home17-resolve" data-resolve>
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

          <div className="home16-scroll" data-intro aria-hidden="true">
            <span>Scroll to explore</span>
            <ArrowDown size={14} />
          </div>
        </div>
      </div>
    </section>
  );
}
