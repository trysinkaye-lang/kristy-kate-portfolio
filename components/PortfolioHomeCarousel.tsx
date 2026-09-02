"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Github, Mail } from "lucide-react";
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
      <div className="hero3d-scene">
        <div className="hero3d-card hero3d-photo-card reference-portrait-card">
          <div className="hero3d-photo-shell">
            <img
              src="/media/kristy-kate-professional-portrait-v2.webp"
              alt="Kristy Kate Taylor"
              className="hero3d-photo"
              draggable={false}
              width={960}
              height={960}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <span className="reference-code-badge" aria-hidden="true"><Code2 size={20} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2">
      <section id="home" className="portfolio-hero portfolio-hero-3d reference-hero relative overflow-hidden pt-[72px]">
        <InteractiveDotGridLite className="absolute inset-0 opacity-30" />
        <div className="hero3d-bg hero3d-bg-one" aria-hidden="true" />
        <div className="hero3d-bg hero3d-bg-two" aria-hidden="true" />

        <div className="portfolio-shell relative z-10 grid min-h-[calc(100vh-72px)] items-center gap-12 py-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <p className="reference-intro mb-7 text-xl font-semibold text-white">Hey <span aria-hidden="true">👋</span>, I’m Kristy</p>

            <h1 className="max-w-4xl text-[clamp(3.5rem,6.2vw,6.5rem)] font-semibold leading-[.93] tracking-[-.058em] text-white">
              <SplitTextLite text="Software developer &" delay={28} />
              <br /><SplitTextLite text="UI/UX designer" delay={28} />
            </h1>

            <p className="mt-7 max-w-xl text-[clamp(1.05rem,1.45vw,1.28rem)] leading-[1.6] text-zinc-400">
              I build practical information systems and thoughtful interfaces that make complex work feel clear, reliable, and easy to use.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagnetLite><Link href="/contact" className="v2-button v2-button-primary"><Mail size={16} /> Contact me</Link></MagnetLite>
              <MagnetLite strength={0.12}><Link href="/projects" className="v2-button hero-secondary-button">View my work <ArrowRight size={16} /></Link></MagnetLite>
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

    </main>
  );
}
