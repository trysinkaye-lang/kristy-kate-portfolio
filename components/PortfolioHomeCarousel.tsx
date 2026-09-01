"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { SplitTextLite } from "@/components/react-bits/SplitTextLite";
import { MagnetLite } from "@/components/react-bits/MagnetLite";
import { InteractiveDotGridLite } from "@/components/react-bits/InteractiveDotGridLite";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import { PortfolioShowcaseCarousel } from "@/components/PortfolioShowcaseCarousel";
import "./hero-scroll-motion.css";

const marqueeItems = ["React", "TypeScript", "PostgreSQL", "SQLite", "Tauri", "Rust", "PHP", "UI/UX", "GitHub", "System Design"];

function Hero3DStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateScrollMotion = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      const centered = progress - 0.5;

      stage.style.setProperty("--scroll-scene", `${centered * 72}px`);
      stage.style.setProperty("--scroll-photo", `${centered * -34}px`);
      stage.style.setProperty("--scroll-rbim", `${centered * -64}px`);
      stage.style.setProperty("--scroll-ahdis", `${centered * 46}px`);
      stage.style.setProperty("--scroll-design", `${centered * -40}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stage.style.setProperty("--hero-rx", `${-y * 10}deg`);
    stage.style.setProperty("--hero-ry", `${x * 13}deg`);
    stage.style.setProperty("--hero-x", `${x * 16}px`);
    stage.style.setProperty("--hero-y", `${y * 12}px`);
  };

  const resetPointer = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--hero-rx", "0deg");
    stage.style.setProperty("--hero-ry", "0deg");
    stage.style.setProperty("--hero-x", "0px");
    stage.style.setProperty("--hero-y", "0px");
  };

  return (
    <div
      ref={stageRef}
      className="hero3d-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Interactive portrait and featured systems"
    >
      <div className="hero3d-glow hero3d-glow-a" aria-hidden="true" />
      <div className="hero3d-glow hero3d-glow-b" aria-hidden="true" />
      <div className="hero3d-ring" aria-hidden="true" />

      <div className="hero3d-scene">
        <div className="hero3d-card hero3d-photo-card">
          <div className="hero3d-photo-shell">
            <Image
              src="/media/kristy-profile-scroll.webp"
              alt="Kristy Kate Taylor"
              className="hero3d-photo"
              draggable={false}
              fill
              priority
              sizes="(max-width: 768px) 80vw, 420px"
            />
            <div className="hero3d-photo-copy">
              <span>Kristy Kate Taylor</span>
              <strong>Software Developer · UI/UX Designer</strong>
            </div>
          </div>
        </div>

        <div className="hero3d-float hero3d-float-rbim">
          <span className="hero3d-float-index">01</span>
          <strong>RBIM</strong>
          <small>Information system</small>
        </div>

        <div className="hero3d-float hero3d-float-ahdis">
          <span className="hero3d-float-index">02</span>
          <strong>AHDIS</strong>
          <small>Health data system</small>
        </div>

        <div className="hero3d-float hero3d-float-design">
          <span className="hero3d-float-dot" />
          <strong>UI / UX</strong>
          <small>Clear interfaces</small>
        </div>

        <div className="hero3d-status">
          <span className="hero-status-dot" />
          Available for opportunities
        </div>
      </div>
    </div>
  );
}

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2">
      <section id="home" className="portfolio-hero portfolio-hero-3d relative overflow-hidden pt-[72px]">
        <InteractiveDotGridLite className="absolute inset-0 opacity-30" />
        <div className="hero3d-bg hero3d-bg-one" aria-hidden="true" />
        <div className="hero3d-bg hero3d-bg-two" aria-hidden="true" />

        <div className="portfolio-shell relative z-10 grid min-h-[calc(100vh-72px)] items-center gap-12 py-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/[.1] bg-white/[.045] px-4 py-2 text-xs text-zinc-200 backdrop-blur-xl">
              <Sparkles size={13} className="text-violet-300" />
              Welcome — I&apos;m a developer who loves thoughtful design
            </div>

            <h1 className="max-w-4xl text-[clamp(3.25rem,6.1vw,6.15rem)] font-semibold leading-[.93] tracking-[-.058em] text-white">
              <SplitTextLite text="Hi, I’m Kristy." delay={32} />
              <br />
              <span className="hero-gradient-text"><SplitTextLite text="I make complex work feel simple." delay={28} /></span>
            </h1>

            <p className="mt-7 max-w-2xl text-[clamp(1.08rem,1.65vw,1.4rem)] leading-[1.55] text-zinc-300">
              I design and develop digital systems, interfaces, and data-driven tools that are practical to use and pleasant to interact with.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagnetLite><a href="#portfolio" className="v2-button v2-button-primary">Explore projects <ArrowDown size={16} /></a></MagnetLite>
              <MagnetLite strength={0.12}><Link href="/contact" className="v2-button hero-secondary-button">Let&apos;s talk <ArrowUpRight size={15} /></Link></MagnetLite>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500">
              <a className="transition hover:text-white" href={site.github} target="_blank" rel="noreferrer"><Github className="mr-2 inline" size={15} />GitHub</a>
              <a className="transition hover:text-white" href={`mailto:${site.email}`}><Mail className="mr-2 inline" size={15} />{site.email}</a>
            </div>
          </div>

          <Hero3DStage />
        </div>

        <div className="relative z-10 border-y border-white/[.065] bg-black/15 py-3 backdrop-blur-md">
          <ScrollVelocityLite items={marqueeItems} />
        </div>
      </section>

      <section id="portfolio" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell py-24 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="v2-kicker">Featured work</p>
              <h2 className="v2-heading mt-4">Systems built for real work.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-zinc-500">A preview of my software and interface projects.</p>
            </div>
            <Link href="/projects" className="v2-button">View all projects <ArrowUpRight size={16} /></Link>
          </div>
          <PortfolioShowcaseCarousel />
        </div>
      </section>

      <footer className="border-t border-white/[.06] px-5 py-8 text-center text-sm text-zinc-700">Kristy Kate Taylor · Software Developer & UI/UX Designer</footer>
    </main>
  );
}
