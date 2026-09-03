"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnetLite } from "@/components/react-bits/MagnetLite";

export function HomeCinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const portrait = portraitRef.current;
    const copy = copyRef.current;
    if (!section || !stage || !portrait || !copy) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const lineOne = copy.querySelector<HTMLElement>("[data-line='one']");
        const lineTwo = copy.querySelector<HTMLElement>("[data-line='two']");
        const lineThree = copy.querySelector<HTMLElement>("[data-line='three']");
        const secondary = copy.querySelectorAll<HTMLElement>("[data-hero-secondary]");
        const rails = stage.querySelectorAll<HTMLElement>("[data-rail]");
        const marks = stage.querySelectorAll<HTMLElement>("[data-mark]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=170%",
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(lineOne, { x: -62, y: -18, ease: "none", duration: 1 }, 0)
          .to(lineTwo, { x: 46, y: -8, ease: "none", duration: 1 }, 0)
          .to(lineThree, { x: -18, y: 18, ease: "none", duration: 1 }, 0)
          .to(secondary, { opacity: 0.52, y: -18, ease: "none", duration: 1 }, 0)
          .to(portrait, { x: -72, y: -24, scale: 1.08, rotate: -1.2, ease: "none", duration: 1 }, 0)
          .to(rails, { scaleX: 1.12, opacity: 0.62, stagger: 0.05, ease: "none", duration: 1 }, 0)
          .to(marks, { y: (index) => (index % 2 === 0 ? -28 : 32), opacity: 0.72, stagger: 0.04, ease: "none", duration: 1 }, 0.1)
          .to(copy, { y: -28, ease: "none", duration: 0.8 }, 1)
          .to(portrait, { x: -28, y: -52, scale: 1.02, rotate: 0.5, ease: "none", duration: 0.8 }, 1)
          .to(stage, { "--home14-glow": 1, ease: "none", duration: 0.8 } as gsap.TweenVars, 1);
      },
    );

    return () => media.revert();
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const portrait = portraitRef.current;
    if (!portrait || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = portrait.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.style.setProperty("--home14-rx", `${-y * 2.4}deg`);
    portrait.style.setProperty("--home14-ry", `${x * 3.2}deg`);
  };

  const resetPointer = () => {
    const portrait = portraitRef.current;
    if (!portrait) return;
    portrait.style.setProperty("--home14-rx", "0deg");
    portrait.style.setProperty("--home14-ry", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      className="home14-hero"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      aria-label="Portfolio introduction"
    >
      <div ref={stageRef} className="home14-stage" aria-hidden="true">
        <span className="home14-rail rail-a" data-rail />
        <span className="home14-rail rail-b" data-rail />
        <span className="home14-rail rail-c" data-rail />
        <span className="home14-mark mark-a" data-mark>DEV</span>
        <span className="home14-mark mark-b" data-mark>UI/UX</span>
        <span className="home14-mark mark-c" data-mark>SYSTEMS</span>
        <span className="home14-orbit orbit-a" />
        <span className="home14-orbit orbit-b" />
      </div>

      <div className="portfolio-shell home14-grid">
        <div ref={copyRef} className="home14-copy">
          <p className="home14-eyebrow" data-hero-secondary>
            Kristy Kate Taylor · Software Developer & UI/UX Designer
          </p>

          <h1 className="home14-title">
            <span data-line="one">I build digital</span>
            <span data-line="two"><em>systems</em> that feel</span>
            <span data-line="three">clear.</span>
          </h1>

          <p className="home14-description" data-hero-secondary>
            I turn complex workflows into dependable software, responsive web applications, and interfaces people can understand quickly.
          </p>

          <div className="home14-actions" data-hero-secondary>
            <MagnetLite>
              <Link href="/projects" className="v2-button v2-button-primary">
                View my work <ArrowRight size={16} />
              </Link>
            </MagnetLite>
            <Link href="/about" className="home14-text-link">About me</Link>
          </div>
        </div>

        <div className="home14-portrait-column">
          <div
            ref={portraitRef}
            className="home14-portrait"
            style={{ "--home14-rx": "0deg", "--home14-ry": "0deg" } as React.CSSProperties}
          >
            <div className="home14-portrait-frame">
              <Image
                src="/media/kristy-kate-professional-portrait-v2.webp"
                alt="Kristy Kate Taylor"
                fill
                priority
                className="home14-portrait-image object-cover"
                sizes="(max-width: 1023px) 82vw, 36vw"
              />
              <div className="home14-portrait-shade" aria-hidden="true" />
            </div>
            <span className="home14-corner corner-tl" aria-hidden="true" />
            <span className="home14-corner corner-br" aria-hidden="true" />
          </div>
          <div className="home14-portrait-meta" aria-hidden="true">
            <span>Based in the Philippines</span>
            <span>Developer × Designer</span>
          </div>
        </div>
      </div>

      <div className="home14-scroll" aria-hidden="true">
        <span>Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
