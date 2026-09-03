"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Github, Mail } from "lucide-react";
import { site } from "@/data/site";
import { SplitTextLite } from "@/components/react-bits/SplitTextLite";
import { MagnetLite } from "@/components/react-bits/MagnetLite";
import { InteractiveDotGridLite } from "@/components/react-bits/InteractiveDotGridLite";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import "./hero-scroll-motion.css";

const marqueeItems = ["React", "TypeScript", "PostgreSQL", "SQLite", "Tauri", "Rust", "PHP", "UI/UX", "GitHub", "System Design"];

const capabilities = [
  {
    index: "01",
    title: "Information systems",
    description: "Structured applications for records, workflows, reporting, and operational data.",
    meta: "Requirements · Data · Workflows",
  },
  {
    index: "02",
    title: "Web applications",
    description: "Responsive interfaces that feel clear on desktop, tablet, and mobile without sacrificing usability.",
    meta: "Next.js · React · TypeScript",
  },
  {
    index: "03",
    title: "UI/UX design",
    description: "Interface systems that turn dense tasks into readable, consistent, and easier-to-use experiences.",
    meta: "Design systems · Prototyping",
  },
];

const process = ["Understand the workflow", "Structure the data", "Design the experience", "Build and validate"];

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

    stage.style.setProperty("--hero-rx", `${-y * 14}deg`);
    stage.style.setProperty("--hero-ry", `${x * 18}deg`);
    stage.style.setProperty("--hero-x", `${x * 22}px`);
    stage.style.setProperty("--hero-y", `${y * 16}px`);
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
      aria-label="Interactive portrait"
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
          <div className="hero-copy-panel min-w-0">
            <p className="reference-intro hero-intro-motion mb-7 text-xl font-semibold text-white">Hey <span aria-hidden="true">👋</span>, I’m Kristy</p>

            <h1 className="hero-title-motion max-w-4xl text-[clamp(3.5rem,6.2vw,6.5rem)] font-semibold leading-[.93] tracking-[-.058em] text-white">
              <SplitTextLite text="Software developer &" delay={28} />
              <br /><SplitTextLite text="UI/UX designer" delay={28} />
            </h1>

            <p className="hero-description-motion mt-7 max-w-xl text-[clamp(1.05rem,1.45vw,1.28rem)] leading-[1.6] text-zinc-400">
              I build practical information systems and thoughtful interfaces that make complex work feel clear, reliable, and easy to use.
            </p>

            <div className="hero-actions-motion mt-9 flex flex-wrap gap-3">
              <MagnetLite><Link href="/contact" className="v2-button v2-button-primary"><Mail size={16} /> Contact me</Link></MagnetLite>
              <MagnetLite strength={0.12}><Link href="/projects" className="v2-button hero-secondary-button">View my work <ArrowRight size={16} /></Link></MagnetLite>
            </div>

            <div className="hero-links-motion mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500">
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

      <section className="portfolio-section home-capabilities border-t border-white/[.06]">
        <div className="portfolio-shell py-24 lg:py-28">
          <div className="home-capabilities-header">
            <div className="home-capabilities-copy">
              <p className="v2-kicker">What I build</p>
              <h2 className="v2-heading mt-4">Digital systems that make work easier to understand.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-zinc-500">
                Instead of repeating every project here, this page gives you the bigger picture: the kinds of problems I solve and how I approach them.
              </p>
            </div>
            <div className="home-capabilities-actions">
              <Link href="/projects" className="v2-button v2-button-primary">Explore projects <ArrowRight size={16} /></Link>
              <Link href="/about" className="v2-button">How I work</Link>
            </div>
          </div>

          <div className="home-capability-grid">
            {capabilities.map((item) => (
              <article className="home-capability-card" key={item.title}>
                <span className="home-capability-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="home-capability-meta">{item.meta}</span>
              </article>
            ))}
          </div>

          <div className="home-process">
            <div className="home-process-top">
              <div>
                <p className="v2-kicker">My process</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">A practical workflow from understanding the problem to validating the finished experience.</p>
              </div>
              <Link href="/about" className="text-sm font-semibold text-white transition hover:opacity-70">More about my approach →</Link>
            </div>
            <div className="home-process-list">
              {process.map((step, index) => (
                <div className="home-process-step" key={step}>
                  <span>0{index + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
