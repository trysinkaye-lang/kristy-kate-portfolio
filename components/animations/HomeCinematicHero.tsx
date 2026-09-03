"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Braces, Database, Layers3, MonitorSmartphone } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnetLite } from "@/components/react-bits/MagnetLite";

export function HomeCinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const system = systemRef.current;
    if (!section || !copy || !system) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const uiLayer = system.querySelector<HTMLElement>("[data-layer='ui']");
        const codeLayer = system.querySelector<HTMLElement>("[data-layer='code']");
        const dataLayer = system.querySelector<HTMLElement>("[data-layer='data']");
        const desktopLayer = system.querySelector<HTMLElement>("[data-layer='desktop']");
        const nodes = system.querySelectorAll<HTMLElement>("[data-node]");
        const skillLabels = system.querySelectorAll<HTMLElement>("[data-skill-label]");
        const stageLabels = section.querySelectorAll<HTMLElement>("[data-stage-label]");
        const title = copy.querySelector<HTMLElement>(".cinematic-title");
        const secondary = copy.querySelectorAll<HTMLElement>("[data-hero-secondary]");

        if (!uiLayer || !codeLayer || !dataLayer || !desktopLayer || !title) return;

        gsap.set(skillLabels, { opacity: 0, y: 12 });
        gsap.set(stageLabels, { opacity: 0 });
        gsap.set(stageLabels[0], { opacity: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=330%",
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(system, { rotateX: 4, rotateY: -5, scale: 1.035, ease: "none", duration: 1 }, 0)
          .to(title, { x: -22, y: -10, ease: "none", duration: 1 }, 0)
          .to(secondary, { opacity: 0.72, y: -8, ease: "none", duration: 1 }, 0)
          .to(stageLabels[0], { opacity: 0, duration: 0.2 }, 0.7)
          .to(stageLabels[1], { opacity: 1, duration: 0.2 }, 0.8)

          .to(uiLayer, { x: 78, y: -30, z: 115, rotateY: -7, ease: "none", duration: 1 }, 1)
          .to(codeLayer, { x: -120, y: -84, z: 50, rotateZ: -4, rotateY: 5, ease: "none", duration: 1 }, 1)
          .to(dataLayer, { x: 120, y: 96, z: -42, rotateZ: 4, ease: "none", duration: 1 }, 1)
          .to(desktopLayer, { x: -104, y: 96, z: -70, rotateZ: -3, ease: "none", duration: 1 }, 1)
          .to(nodes, { scale: 1.15, opacity: 0.78, stagger: 0.035, ease: "none", duration: 0.7 }, 1.15)
          .to(stageLabels[1], { opacity: 0, duration: 0.2 }, 1.72)
          .to(stageLabels[2], { opacity: 1, duration: 0.2 }, 1.82)

          .to(uiLayer, { x: 145, y: -52, z: 185, rotateY: -11, ease: "none", duration: 1 }, 2)
          .to(codeLayer, { x: -195, y: -118, z: 105, rotateZ: -6, rotateY: 9, ease: "none", duration: 1 }, 2)
          .to(dataLayer, { x: 188, y: 132, z: -92, rotateZ: 7, ease: "none", duration: 1 }, 2)
          .to(desktopLayer, { x: -166, y: 132, z: -122, rotateZ: -5, ease: "none", duration: 1 }, 2)
          .to(skillLabels, { opacity: 1, y: 0, stagger: 0.08, ease: "none", duration: 0.75 }, 2.16)
          .to(stageLabels[2], { opacity: 0, duration: 0.2 }, 2.73)
          .to(stageLabels[3], { opacity: 1, duration: 0.2 }, 2.82)

          .to(system, { rotateX: -2, rotateY: 6, scale: 0.96, ease: "none", duration: 1 }, 3)
          .to(uiLayer, { x: 72, y: -18, z: 95, rotateY: -4, ease: "none", duration: 1 }, 3)
          .to(codeLayer, { x: -104, y: -66, z: 30, rotateZ: -2, rotateY: 2, ease: "none", duration: 1 }, 3)
          .to(dataLayer, { x: 106, y: 78, z: -28, rotateZ: 2, ease: "none", duration: 1 }, 3)
          .to(desktopLayer, { x: -92, y: 80, z: -50, rotateZ: -2, ease: "none", duration: 1 }, 3)
          .to(skillLabels, { opacity: 0.45, scale: 0.96, ease: "none", duration: 1 }, 3)
          .to(stageLabels[3], { opacity: 0, duration: 0.22 }, 3.76)
          .to(stageLabels[4], { opacity: 1, duration: 0.22 }, 3.84);
      },
    );

    return () => media.revert();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const system = systemRef.current;
    if (!system || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = system.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    system.style.setProperty("--system-rx", `${-y * 2.4}deg`);
    system.style.setProperty("--system-ry", `${x * 3.1}deg`);
  };

  const resetPointer = () => {
    const system = systemRef.current;
    if (!system) return;
    system.style.setProperty("--system-rx", "0deg");
    system.style.setProperty("--system-ry", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      className="cinematic-home-hero exploded-home-hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Interactive portfolio introduction"
    >
      <div className="cinematic-hero-bg" aria-hidden="true" />

      <div className="portfolio-shell cinematic-hero-grid exploded-hero-grid">
        <div ref={copyRef} className="cinematic-hero-copy exploded-hero-copy">
          <p className="cinematic-eyebrow" data-hero-secondary>
            Kristy Kate Taylor · Software Developer & Designer
          </p>

          <h1 className="cinematic-title exploded-title">
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

          <div className="exploded-stage-readout" aria-hidden="true">
            <span data-stage-label>01 · System assembled</span>
            <span data-stage-label>02 · Layers separating</span>
            <span data-stage-label>03 · Architecture revealed</span>
            <span data-stage-label>04 · Skills connected</span>
            <span data-stage-label>05 · Continue to the work</span>
          </div>
        </div>

        <div className="exploded-system-column">
          <div
            ref={systemRef}
            className="exploded-system"
            style={{ "--system-rx": "0deg", "--system-ry": "0deg" } as React.CSSProperties}
            aria-hidden="true"
          >
            <div className="system-orbit system-orbit-one" />
            <div className="system-orbit system-orbit-two" />

            <div className="system-layer system-layer-ui" data-layer="ui">
              <div className="system-window-bar">
                <span /><span /><span />
                <small>RBIM / interface</small>
              </div>
              <div className="system-shot-wrap">
                <Image
                  src="/media/rbim-dashboard.webp"
                  alt=""
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1023px) 92vw, 46vw"
                />
              </div>
            </div>

            <div className="system-layer system-layer-code" data-layer="code">
              <div className="system-layer-heading"><Braces size={15} /><span>Frontend layer</span></div>
              <code>
                <span>React</span>
                <span>TypeScript</span>
                <span>Tailwind CSS</span>
              </code>
            </div>

            <div className="system-layer system-layer-data" data-layer="data">
              <div className="system-layer-heading"><Database size={15} /><span>Data layer</span></div>
              <div className="database-cylinder"><i /><i /><i /></div>
              <code>
                <span>PostgreSQL</span>
                <span>SQLite</span>
              </code>
            </div>

            <div className="system-layer system-layer-desktop" data-layer="desktop">
              <div className="system-layer-heading"><MonitorSmartphone size={15} /><span>Application layer</span></div>
              <div className="desktop-core-icon"><Layers3 size={28} /></div>
              <code>
                <span>Tauri</span>
                <span>Rust</span>
              </code>
            </div>

            <span className="system-node node-a" data-node />
            <span className="system-node node-b" data-node />
            <span className="system-node node-c" data-node />
            <span className="system-node node-d" data-node />

            <span className="system-skill-label label-ui" data-skill-label>Interface</span>
            <span className="system-skill-label label-data" data-skill-label>Data</span>
            <span className="system-skill-label label-workflow" data-skill-label>Workflow</span>
            <span className="system-skill-label label-desktop" data-skill-label>Desktop</span>
          </div>
        </div>
      </div>

      <div className="cinematic-scroll-note" aria-hidden="true">
        <span>Scroll to disassemble</span>
        <i />
      </div>
    </section>
  );
}
