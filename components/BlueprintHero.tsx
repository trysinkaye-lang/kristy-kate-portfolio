"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Github, Mail } from "lucide-react";
import { site } from "@/data/site";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import "./blueprint-hero.css";

const marqueeItems = ["Systems", "Workflows", "Interfaces", "Development", "React", "TypeScript", "PostgreSQL", "UI/UX"];

export function BlueprintHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      section.style.setProperty("--bp-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const visual = visualRef.current;
    if (!visual) return;
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.style.setProperty("--bp-x", `${x * 18}px`);
    visual.style.setProperty("--bp-y", `${y * 14}px`);
    visual.style.setProperty("--bp-rx", `${-y * 5}deg`);
    visual.style.setProperty("--bp-ry", `${x * 7}deg`);
  };

  const resetPointer = () => {
    const visual = visualRef.current;
    if (!visual) return;
    visual.style.setProperty("--bp-x", "0px");
    visual.style.setProperty("--bp-y", "0px");
    visual.style.setProperty("--bp-rx", "0deg");
    visual.style.setProperty("--bp-ry", "0deg");
  };

  return (
    <section ref={sectionRef} id="home" className="blueprint-hero" aria-label="Portfolio introduction">
      <div className="blueprint-sticky">
        <div className="blueprint-atmosphere" aria-hidden="true" />
        <div className="blueprint-grid" aria-hidden="true" />

        <div className="blueprint-opening portfolio-shell">
          <div className="blueprint-copy">
            <div className="blueprint-eyebrow"><span /> Kristy Kate Taylor · Software Developer</div>
            <h1>Building systems<br />that make work <em>clearer.</em></h1>
            <p>
              I design and build information systems, responsive web applications, and interfaces that turn complex workflows into clear digital experiences.
            </p>
            <div className="blueprint-actions">
              <Link href="/projects" className="blueprint-primary">Explore projects <ArrowRight size={17} /></Link>
              <Link href="/contact" className="blueprint-secondary"><Mail size={16} /> Contact me</Link>
            </div>
            <div className="blueprint-links">
              <a href={site.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
              <a href={`mailto:${site.email}`}><Mail size={15} /> {site.email}</a>
            </div>
          </div>

          <div
            ref={visualRef}
            className="blueprint-visual"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            aria-label="Interactive system blueprint visualization"
          >
            <div className="blueprint-window">
              <div className="blueprint-window-bar">
                <div><i /><i /><i /></div><span>SYSTEM_BLUEPRINT / 01</span><b>LIVE</b>
              </div>
              <div className="blueprint-canvas">
                <div className="blueprint-axis blueprint-axis-x" />
                <div className="blueprint-axis blueprint-axis-y" />
                <div className="blueprint-corner tl">+</div><div className="blueprint-corner tr">+</div>
                <div className="blueprint-corner bl">+</div><div className="blueprint-corner br">+</div>

                <div className="blueprint-module module-a"><span>01</span><strong>REQUIREMENTS</strong><small>Understand the real workflow</small></div>
                <div className="blueprint-module module-b"><span>02</span><strong>DATA</strong><small>Structure reliable information</small></div>
                <div className="blueprint-module module-c"><span>03</span><strong>INTERFACE</strong><small>Make complexity readable</small></div>

                <div className="blueprint-core">
                  <span className="blueprint-core-kicker">SYSTEM / FLOW</span>
                  <strong>CLEAR</strong>
                  <small>Reliable · Usable · Responsive</small>
                </div>

                <div className="blueprint-tag tag-a">SYSTEMS</div>
                <div className="blueprint-tag tag-b">WORKFLOWS</div>
                <div className="blueprint-tag tag-c">INTERFACES</div>
                <div className="blueprint-tag tag-d">DEVELOPMENT</div>
                <div className="blueprint-node node-a" /><div className="blueprint-node node-b" />
                <div className="blueprint-node node-c" /><div className="blueprint-node node-d" />
                <div className="blueprint-scan" />
              </div>
            </div>
          </div>
        </div>

        <div className="blueprint-reveal portfolio-shell">
          <p>Software development · Information systems · UI/UX</p>
          <h2>I make complex<br />work feel <span>clear.</span></h2>
          <div className="blueprint-reveal-actions">
            <Link href="/projects">View selected work <ArrowRight size={18} /></Link>
            <Link href="/about">About my approach</Link>
          </div>
        </div>

        <div className="blueprint-scroll-cue"><span>Scroll to unfold</span><ArrowDown size={15} /></div>
        <div className="blueprint-marquee"><ScrollVelocityLite items={marqueeItems} /></div>
      </div>
    </section>
  );
}
