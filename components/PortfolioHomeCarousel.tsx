"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { SplitTextLite } from "@/components/react-bits/SplitTextLite";
import { SpotlightCardLite } from "@/components/react-bits/SpotlightCardLite";
import { MagnetLite } from "@/components/react-bits/MagnetLite";
import { InteractiveDotGridLite } from "@/components/react-bits/InteractiveDotGridLite";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import { PortfolioShowcaseCarousel } from "@/components/PortfolioShowcaseCarousel";
import { TechStackOrbit } from "@/components/TechStackOrbit";

const strengths = ["Software Development", "Information Systems", "UI/UX Design", "Database Design"];
const marqueeItems = ["React", "TypeScript", "PostgreSQL", "SQLite", "Tauri", "Rust", "PHP", "UI/UX", "GitHub", "System Design"];
const featuredSystems = ["RBIM", "AHDIS", "ERP"];

export function PortfolioHomeCarousel() {
  const [portfolioTab, setPortfolioTab] = useState<"projects" | "stack">("projects");

  return (
    <main id="main-content" className="portfolio-v2">
      <section id="home" className="portfolio-hero relative overflow-hidden pt-[72px]">
        <InteractiveDotGridLite className="absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-amber-100/[.035] blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-[34rem] w-[34rem] rounded-full bg-emerald-200/[.035] blur-3xl" aria-hidden="true" />

        <div className="portfolio-shell relative z-10 grid min-h-[calc(100vh-72px)] items-center gap-16 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="min-w-0">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/[.09] bg-white/[.035] px-4 py-2 text-xs text-zinc-300 backdrop-blur-sm">
              <Sparkles size={13} className="text-emerald-300" />
              Software Developer · UI/UX Designer
            </div>

            <h1 className="max-w-4xl text-[clamp(3.3rem,6.4vw,6.4rem)] font-semibold leading-[.94] tracking-[-.055em] text-white">
              <SplitTextLite text="Hi, I’m Kristy." delay={34} />
            </h1>

            <p className="mt-6 max-w-2xl text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.45] tracking-[-.02em] text-zinc-300">
              I design and build practical digital products that make everyday work simpler, clearer, and easier to use.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
              My work spans information systems, data-driven tools, database design, and interfaces built around real workflows—not just good-looking screens.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagnetLite><a href="#portfolio" className="v2-button v2-button-primary">See my projects <ArrowDown size={16} /></a></MagnetLite>
              <MagnetLite strength={0.12}><a href="#contact" className="v2-button">Get in touch <ArrowUpRight size={15} /></a></MagnetLite>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span className="mr-1 text-xs uppercase tracking-[.18em] text-zinc-600">Featured systems</span>
              {featuredSystems.map((item) => (
                <span key={item} className="rounded-full border border-white/[.07] bg-white/[.02] px-3 py-1.5 text-xs text-zinc-400">{item}</span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500">
              <a className="transition hover:text-white" href={site.github} target="_blank" rel="noreferrer"><Github className="mr-2 inline" size={15} />GitHub</a>
              <a className="transition hover:text-white" href={`mailto:${site.email}`}><Mail className="mr-2 inline" size={15} />{site.email}</a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute -inset-5 rounded-[2.75rem] border border-white/[.035] bg-white/[.018]" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.35rem] border border-white/[.1] bg-[#111] p-2 shadow-[0_32px_100px_rgba(0,0,0,.48)]">
              <div className="relative overflow-hidden rounded-[1.95rem] bg-gradient-to-b from-stone-200 to-stone-300">
                <img
                  src="/media/kristy-profile.webp"
                  alt="Kristy Kate Taylor"
                  className="aspect-[4/5] w-full object-cover object-[center_22%]"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-6 pb-6 pt-20">
                  <p className="text-xs uppercase tracking-[.22em] text-white/55">Kristy Kate Taylor</p>
                  <p className="mt-2 text-lg font-medium text-white">Building useful systems with thoughtful design.</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-6 hidden rounded-2xl border border-white/[.1] bg-[#0d0d0d]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <span className="hero-status-dot h-2 w-2 rounded-full bg-emerald-400" />
                Available for opportunities
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-y border-white/[.06] bg-black/20 py-3 backdrop-blur-sm">
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
