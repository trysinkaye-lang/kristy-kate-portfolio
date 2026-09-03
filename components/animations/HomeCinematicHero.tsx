"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Braces, Database, LayoutTemplate, Network } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnetLite } from "@/components/react-bits/MagnetLite";

export function HomeCinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const board = boardRef.current;
    if (!section || !copy || !board) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const lineOne = copy.querySelector<HTMLElement>("[data-line='one']");
        const lineTwo = copy.querySelector<HTMLElement>("[data-line='two']");
        const lineThree = copy.querySelector<HTMLElement>("[data-line='three']");
        const secondary = copy.querySelectorAll<HTMLElement>("[data-hero-secondary]");
        const panels = board.querySelectorAll<HTMLElement>("[data-panel]");
        const labels = board.querySelectorAll<HTMLElement>("[data-label]");
        const lines = board.querySelectorAll<HTMLElement>("[data-connector]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=190%",
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(lineOne, { x: -46, y: -12, ease: "none", duration: 1 }, 0)
          .to(lineTwo, { x: 32, y: -4, ease: "none", duration: 1 }, 0)
          .to(lineThree, { x: -12, y: 16, ease: "none", duration: 1 }, 0)
          .to(secondary, { opacity: 0.58, y: -12, ease: "none", duration: 1 }, 0)
          .to(panels[0], { x: -38, y: -24, rotate: -2.5, ease: "none", duration: 1 }, 0)
          .to(panels[1], { x: 48, y: -18, rotate: 3, ease: "none", duration: 1 }, 0)
          .to(panels[2], { x: -30, y: 34, rotate: 2, ease: "none", duration: 1 }, 0)
          .to(panels[3], { x: 34, y: 28, rotate: -2, ease: "none", duration: 1 }, 0)
          .to(labels, { letterSpacing: ".16em", opacity: 0.92, stagger: 0.03, ease: "none", duration: 1 }, 0.1)
          .to(lines, { scaleX: 1.14, opacity: 0.72, stagger: 0.04, ease: "none", duration: 1 }, 0.12)
          .to(board, { rotateX: -2, rotateY: 4, scale: 1.02, ease: "none", duration: 1 }, 0.9)
          .to(panels[0], { x: 12, y: -42, rotate: 0, ease: "none", duration: 0.9 }, 1)
          .to(panels[1], { x: 66, y: 8, rotate: 0, ease: "none", duration: 0.9 }, 1)
          .to(panels[2], { x: -54, y: 58, rotate: 0, ease: "none", duration: 0.9 }, 1)
          .to(panels[3], { x: 28, y: 54, rotate: 0, ease: "none", duration: 0.9 }, 1)
          .to(copy, { y: -22, ease: "none", duration: 0.9 }, 1);
      },
    );

    return () => media.revert();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const board = boardRef.current;
    if (!board || window.matchMedia("(pointer: coarse)").matches) return;

    const rect = board.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    board.style.setProperty("--home15-rx", `${-y * 1.8}deg`);
    board.style.setProperty("--home15-ry", `${x * 2.4}deg`);
  };

  const resetPointer = () => {
    const board = boardRef.current;
    if (!board) return;
    board.style.setProperty("--home15-rx", "0deg");
    board.style.setProperty("--home15-ry", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      className="home15-hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Portfolio introduction"
    >
      <div className="home15-ambient" aria-hidden="true" />

      <div className="portfolio-shell home15-grid">
        <div ref={copyRef} className="home15-copy">
          <p className="home15-eyebrow" data-hero-secondary>
            Kristy Kate Taylor · Software Developer & UI/UX Designer
          </p>

          <h1 className="home15-title">
            <span data-line="one">I build digital</span>
            <span data-line="two"><em>systems</em> with</span>
            <span data-line="three">clarity.</span>
          </h1>

          <p className="home15-description" data-hero-secondary>
            I turn complex workflows into dependable software, responsive web applications, and interfaces people can understand quickly.
          </p>

          <div className="home15-actions" data-hero-secondary>
            <MagnetLite>
              <Link href="/projects" className="v2-button v2-button-primary">
                View my work <ArrowRight size={16} />
              </Link>
            </MagnetLite>
            <Link href="/about" className="home15-text-link">About me</Link>
          </div>
        </div>

        <div className="home15-board-wrap" aria-hidden="true">
          <div
            ref={boardRef}
            className="home15-board"
            style={{ "--home15-rx": "0deg", "--home15-ry": "0deg" } as React.CSSProperties}
          >
            <span className="home15-axis axis-x" data-connector />
            <span className="home15-axis axis-y" data-connector />
            <span className="home15-axis axis-d" data-connector />

            <div className="home15-core">
              <span>KT</span>
              <small>Build / Design</small>
            </div>

            <div className="home15-panel panel-dev" data-panel>
              <Braces size={19} />
              <span data-label>Development</span>
              <small>Logic · Components · Systems</small>
            </div>

            <div className="home15-panel panel-ui" data-panel>
              <LayoutTemplate size={19} />
              <span data-label>UI / UX</span>
              <small>Hierarchy · Interaction · Responsive</small>
            </div>

            <div className="home15-panel panel-data" data-panel>
              <Database size={19} />
              <span data-label>Data</span>
              <small>Structure · Validation · Reporting</small>
            </div>

            <div className="home15-panel panel-web" data-panel>
              <Network size={19} />
              <span data-label>Web Systems</span>
              <small>Interfaces · APIs · Connectivity</small>
            </div>

            <span className="home15-index index-a">01</span>
            <span className="home15-index index-b">02</span>
            <span className="home15-index index-c">03</span>
            <span className="home15-index index-d">04</span>
          </div>
        </div>
      </div>

      <div className="home15-scroll" aria-hidden="true">
        <span>Scroll to shift the system</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
