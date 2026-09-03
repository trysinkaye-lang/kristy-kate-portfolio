"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnetLite } from "@/components/react-bits/MagnetLite";

export function HomeCinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const portraitTiltRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portraitStage = portraitStageRef.current;
    const copy = copyRef.current;
    if (!section || !portraitStage || !copy) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const title = copy.querySelector(".cinematic-title");
        const secondary = copy.querySelectorAll("[data-hero-secondary]");
        const floatingItems = portraitStage.querySelectorAll("[data-portrait-float]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=78%",
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(title, { y: -28, opacity: 0.88, ease: "none", duration: 1 }, 0)
          .to(secondary, { y: -14, opacity: 0.72, ease: "none", duration: 1 }, 0)
          .to(
            portraitStage,
            { y: -44, scale: 1.035, rotate: 1.25, ease: "none", duration: 1 },
            0,
          )
          .to(
            floatingItems,
            { y: (index) => (index % 2 === 0 ? -22 : 18), ease: "none", duration: 1 },
            0,
          );
      },
    );

    return () => media.revert();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const stage = portraitTiltRef.current;
    if (!stage || window.matchMedia("(pointer: coarse)").matches) return;

    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stage.style.setProperty("--portrait-rx", `${-y * 3.5}deg`);
    stage.style.setProperty("--portrait-ry", `${x * 4.5}deg`);
  };

  const resetPointer = () => {
    const stage = portraitTiltRef.current;
    if (!stage) return;
    stage.style.setProperty("--portrait-rx", "0deg");
    stage.style.setProperty("--portrait-ry", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      className="cinematic-home-hero editorial-home-hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Portfolio introduction"
    >
      <div className="cinematic-hero-bg" aria-hidden="true" />

      <div className="portfolio-shell cinematic-hero-grid">
        <div ref={copyRef} className="cinematic-hero-copy">
          <p className="cinematic-eyebrow" data-hero-secondary>
            Kristy Kate Taylor · Software Developer & Designer
          </p>

          <h1 className="cinematic-title">
            <span className="cinematic-title-line">I design and build</span>
            <span className="cinematic-title-line cinematic-title-emphasis">
              <em>useful digital</em> systems.
            </span>
          </h1>

          <p className="cinematic-description" data-hero-secondary>
            I turn complex workflows into clear information systems, responsive web applications,
            and interfaces that are practical for real people to use.
          </p>

          <div className="cinematic-actions" data-hero-secondary>
            <MagnetLite>
              <Link href="/projects" className="v2-button v2-button-primary">
                View Projects <ArrowRight size={16} />
              </Link>
            </MagnetLite>
            <Link href="/about" className="cinematic-text-link">About Me</Link>
            <Link href="/contact" className="cinematic-text-link">Contact Me</Link>
          </div>
        </div>

        <div ref={portraitStageRef} className="home-portrait-stage-v2">
          <div
            ref={portraitTiltRef}
            className="home-portrait-tilt"
            style={{ "--portrait-rx": "0deg", "--portrait-ry": "0deg" } as React.CSSProperties}
          >
            <div className="home-portrait-frame-v2">
              <Image
                src="/media/kristy-kate-professional-portrait-v2.webp"
                alt="Kristy Kate Taylor"
                fill
                priority
                className="home-portrait-image-v2 object-cover"
                sizes="(max-width: 1023px) 82vw, 40vw"
              />
              <div className="home-portrait-soft-glow" aria-hidden="true" />
            </div>
          </div>

          <div className="home-portrait-badge home-portrait-badge-top" data-portrait-float>
            <span>Developer + Designer</span>
            <strong>Building systems with clarity.</strong>
          </div>

          <div className="home-portrait-badge home-portrait-badge-bottom" data-portrait-float>
            <span>Focus</span>
            <div>
              <i>Information Systems</i>
              <i>Web Applications</i>
              <i>UI/UX</i>
            </div>
          </div>

          <div className="home-portrait-index" aria-hidden="true">KT / 01</div>
        </div>
      </div>

      <div className="cinematic-scroll-note" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  );
}
