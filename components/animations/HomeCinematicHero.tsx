"use client";

import Link from "next/link";
import { ArrowRight, Braces, Database, Layers3, MonitorSmartphone, Network } from "lucide-react";
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
        const appLayer = system.querySelector<HTMLElement>("[data-layer='app']");
        const nodes = system.querySelectorAll<HTMLElement>("[data-node]");
        const skillLabels = system.querySelectorAll<HTMLElement>("[data-skill-label]");
        const stageLabels = section.querySelectorAll<HTMLElement>("[data-stage-label]");
        const title = copy.querySelector<HTMLElement>(".cinematic-title");
        const secondary = copy.querySelectorAll<HTMLElement>("[data-hero-secondary]");

        if (!uiLayer || !codeLayer || !dataLayer || !appLayer || !title) return;

        gsap.set(skillLabels, { opacity: 0, y: 12 });
        gsap.set(stageLabels, { opacity: 0 });
        gsap.set(stageLabels[0], { opacity: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(system, { rotateX: 4, rotateY: -5, scale: 1.03, ease: "none", duration: 1 }, 0)
          .to(title, { x: -18, y: -8, ease: "none", duration: 1 }, 0)
          .to(secondary, { opacity: 0.74, y: -6, ease: "none", duration: 1 }, 0)
          .to(stageLabels[0], { opacity: 0, duration: 0.2 }, 0.68)
          .to(stageLabels[1], { opacity: 1, duration: 0.2 }, 0.78)

          .to(uiLayer, { x: 82, y: -28, z: 120, rotateY: -7, ease: "none", duration: 1 }, 1)
          .to(codeLayer, { x: -122, y: -86, z: 52, rotateZ: -4, rotateY: 5, ease: "none", duration: 1 }, 1)
          .to(dataLayer, { x: 122, y: 98, z: -46, rotateZ: 4, ease: "none", duration: 1 }, 1)
          .to(appLayer, { x: -108, y: 98, z: -72, rotateZ: -3, ease: "none", duration: 1 }, 1)
          .to(nodes, { scale: 1.14, opacity: 0.78, stagger: 0.035, ease: "none", duration: 0.7 }, 1.12)
          .to(stageLabels[1], { opacity: 0, duration: 0.2 }, 1.72)
          .to(stageLabels[2], { opacity: 1, duration: 0.2 }, 1.82)

          .to(uiLayer, { x: 148, y: -52, z: 186, rotateY: -11, ease: "none", duration: 1 }, 2)
          .to(codeLayer, { x: -198, y: -120, z: 108, rotateZ: -6, rotateY: 9, ease: "none", duration: 1 }, 2)
          .to(dataLayer, { x: 192, y: 134, z: -94, rotateZ: 7, ease: "none", duration: 1 }, 2)
          .to(appLayer, { x: -170, y: 134, z: -124, rotateZ: -5, ease: "none", duration: 1 }, 2)
          .to(skillLabels, { opacity: 1, y: 0, stagger: 0.08, ease: "none", duration: 0.75 }, 2.14)
          .to(stageLabels[2], { opacity: 0, duration: 0.2 }, 2.72)
          .to(stageLabels[3], { opacity: 1, duration: 0.2 }, 2.82)

          .to(system, { rotateX: -2, rotateY: 5, scale: 0.97, ease: "none", duration: 1 }, 3)
          .to(uiLayer, { x: 70, y: -16, z: 92, rotateY: -4, ease: "none", duration: 1 }, 3)
          .to(codeLayer, { x: -104, y: -64, z: 28, rotateZ: -2, rotateY: 2, ease: "none", duration: 1 }, 3)
          .to(dataLayer, { x: 104, y: 76, z: -28, rotateZ: 2, ease: "none", duration: 1 }, 3)
          .to(appLayer, { x: -90, y: 78, z: -48, rotateZ: -2, ease: "none", duration: 1 }, 3)
          .to(skillLabels, { opacity: 0.48, scale: 0.96, ease: "none", duration: 1 }, 3)
          .to(stageLabels[3], { opacity: 0, duration: 0.22 }, 3.74)
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
    system.style.setProperty("--system-rx", `${-y * 2.2}deg`);
    system.style.setProperty("--system-ry", `${x * 2.8}deg`);
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
            <span data-stage-label>05 · Explore the work</span>
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
                <small>Interface system</small>
              </div>
              <div className="system-ui-blueprint">
                <div className="blueprint-sidebar"><i /><i /><i /><i /><i /></div>
                <div className="blueprint-main">
                  <div className="blueprint-topline"><span /><span /></div>
                  <div className="blueprint-metrics"><i /><i /><i /></div>
                  <div className="blueprint-panel"><span /><span /><span /><span /></div>
                </div>
              </div>
            </div>

            <div className="system-layer system-layer-code" data-layer="code">
              <div className="system-layer-heading"><Braces size={15} /><span>Frontend layer</span></div>
              <code>
                <span>React</span>
                <span>TypeScript</span>
                <span>Responsive UI</span>
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

            <div className="system-layer system-layer-desktop" data-layer="app">
              <div className="system-layer-heading"><MonitorSmartphone size={15} /><span>Application layer</span></div>
              <div className="desktop-core-icon"><Layers3 size={28} /></div>
              <code>
                <span>Desktop</span>
                <span>Web</span>
              </code>
            </div>

            <div className="system-network-core"><Network size={24} /></div>

            <span className="system-node node-a" data-node />
            <span className="system-node node-b" data-node />
            <span className="system-node node-c" data-node />
            <span className="system-node node-d" data-node />

            <span className="system-skill-label label-ui" data-skill-label>Interface</span>
            <span className="system-skill-label label-data" data-skill-label>Data</span>
            <span className="system-skill-label label-workflow" data-skill-label>Workflow</span>
            <span className="system-skill-label label-desktop" data-skill-label>Applications</span>
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
