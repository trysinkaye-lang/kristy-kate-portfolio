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

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=62%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(title, { y: -18, opacity: 0.9, ease: "none", duration: 1 }, 0)
          .to(secondary, { y: -8, opacity: 0.78, ease: "none", duration: 1 }, 0)
          .to(
            portraitStage,
            { y: -28, scale: 1.018, rotate: 0.6, ease: "none", duration: 1 },
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

    stage.style.setProperty("--portrait-rx", `${-y * 2.2}deg`);
    stage.style.setProperty("--portrait-ry", `${x * 2.8}deg`);
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
                sizes="(max-width: 1023px) 78vw, 36vw"
              />
              <div className="home-portrait-soft-glow" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="cinematic-scroll-note" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  );
}
