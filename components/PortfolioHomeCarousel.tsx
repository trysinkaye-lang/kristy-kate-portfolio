"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { SplitTextLite } from "@/components/react-bits/SplitTextLite";
import { SpotlightCardLite } from "@/components/react-bits/SpotlightCardLite";
import { MagnetLite } from "@/components/react-bits/MagnetLite";
import { InteractiveDotGridLite } from "@/components/react-bits/InteractiveDotGridLite";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import { PortfolioShowcaseCarousel } from "@/components/PortfolioShowcaseCarousel";
import { TechStackOrbit } from "@/components/TechStackOrbit";
import "./hero-scroll-motion.css";

const strengths = ["Software Development", "Information Systems", "UI/UX Design", "Database Design"];
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
            <img
              src="/media/kristy-profile-scroll.webp"
              alt="Kristy Kate Taylor"
              className="hero3d-photo"
              draggable={false}
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
  const [portfolioTab, setPortfolioTab] = useState<"projects" | "stack">("projects");

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
              <MagnetLite strength={0.12}><a href="#contact" className="v2-button hero-secondary-button">Let&apos;s talk <ArrowUpRight size={15} /></a></MagnetLite>
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

      <section id="about" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell grid gap-12 py-24 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
          <div>
            <p className="v2-kicker">About</p>
            <h2 className="v2-heading mt-4">I turn requirements into usable systems.</h2>
          </div>
          <div>
            <p className="max-w-3xl text-xl leading-9 text-zinc-300">
              I work across software development, information systems, databases, and interface design. My goal is to make complex workflows feel organized, understandable, and reliable for the people using them.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[.07] bg-white/[.07] sm:grid-cols-2">
              {strengths.map((item, index) => (
                <SpotlightCardLite key={item} className="bg-[#0b0b0b] px-6 py-6">
                  <span className="text-xs text-zinc-600">0{index + 1}</span>
                  <p className="mt-2 font-medium text-zinc-200">{item}</p>
                </SpotlightCardLite>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell py-24 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="v2-kicker">Selected work</p>
              <h2 className="v2-heading mt-4">Portfolio Showcase</h2>
              <p className="mt-5 max-w-2xl leading-7 text-zinc-500">A focused view of the systems I have designed and developed.</p>
            </div>
            <div className="inline-flex w-fit rounded-full border border-white/[.08] bg-white/[.025] p-1">
              <button type="button" onClick={() => setPortfolioTab("projects")} className={`v2-tab ${portfolioTab === "projects" ? "is-active" : ""}`}>Projects</button>
              <button type="button" onClick={() => setPortfolioTab("stack")} className={`v2-tab ${portfolioTab === "stack" ? "is-active" : ""}`}>Tech Stack</button>
            </div>
          </div>

          {portfolioTab === "projects" ? <PortfolioShowcaseCarousel /> : <TechStackOrbit />}
        </div>
      </section>

      <section id="experience" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell grid gap-12 py-24 lg:grid-cols-[.65fr_1.35fr] lg:py-28">
          <div>
            <p className="v2-kicker">Experience</p>
            <h2 className="v2-heading mt-4">Building systems with purpose.</h2>
          </div>
          <div className="divide-y divide-white/[.07] border-y border-white/[.07]">
            <div className="grid gap-3 py-7 sm:grid-cols-[160px_1fr]"><span className="text-xs uppercase tracking-[.18em] text-zinc-600">Education</span><div><h3 className="font-medium text-white">BS Information Technology</h3><p className="mt-2 text-sm text-zinc-500">University of Science and Technology of Southern Philippines</p></div></div>
            <div className="grid gap-3 py-7 sm:grid-cols-[160px_1fr]"><span className="text-xs uppercase tracking-[.18em] text-zinc-600">Systems</span><div><h3 className="font-medium text-white">RBIM · AHDIS · ERP</h3><p className="mt-2 text-sm leading-6 text-zinc-500">Software development, system workflows, database design, interface design, validation, and deployment-focused improvements.</p></div></div>
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell py-24 lg:py-28">
          <SpotlightCardLite className="rounded-[2rem] border border-white/[.08] bg-[#0a0a0a] p-8 sm:p-12 lg:p-16">
            <p className="v2-kicker">Contact</p>
            <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl lg:text-6xl">Have a project or opportunity in mind?</h2>
                <p className="mt-5 max-w-2xl leading-7 text-zinc-500">I’m open to conversations about software development, systems, and interface design.</p>
              </div>
              <div className="lg:text-right">
                <MagnetLite className="lg:justify-end" strength={0.12}><a className="v2-button v2-button-primary" href={`mailto:${site.email}`}>Email me <Mail size={16} /></a></MagnetLite>
                <p className="mt-4 text-sm text-zinc-600">{site.email}</p>
              </div>
            </div>
          </SpotlightCardLite>
        </div>
      </section>

      <footer className="border-t border-white/[.06] px-5 py-8 text-center text-sm text-zinc-700">Kristy Kate Taylor · Software Developer & UI/UX Designer</footer>
    </main>
  );
}
