"use client";

import dynamic from "next/dynamic";
import { ArrowDownRight, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";

const MoltenMetal = dynamic(() => import("@/components/react-bits/MoltenMetal"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 22% 28%, rgba(103,232,249,.18), transparent 34%), radial-gradient(circle at 78% 62%, rgba(99,102,241,.2), transparent 36%)",
      }}
    />
  ),
});

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <MoltenMetal
          color1="#0b1f3a"
          color2="#4f46e5"
          color3="#67e8f9"
          speed={0.14}
          scale={4.8}
          detail={2}
          glow={1.05}
          brightness={0.82}
          grain
          grainIntensity={0.018}
          mouseStrength={0.1}
          opacity={0.9}
        />
      </div>
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.25fr_.75fr] lg:px-8">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[.18em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,.8)]" />
            Software Developer + Designer
          </div>

          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[.98] tracking-[-.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
            Building systems that work <span className="text-gradient">and interfaces people understand.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            {site.headline} I work across software development, web applications, information systems, databases, UI/UX, digital design, and AI-assisted workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="primary-cta" href="#projects">
              View My Projects <ArrowDownRight size={17} />
            </a>
            <a className="secondary-cta" href="#designs">View My Designs</a>
            <a className="secondary-cta" href="#about">About Me</a>
            <a className="secondary-cta" href="#resume" title="Resume PDF will be added once provided">
              <FileDown size={16} /> Download Resume
            </a>
            <a className="secondary-cta" href="#contact">Contact Me</a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <a className="social-link" href={site.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <span className="social-link cursor-not-allowed opacity-60" title="LinkedIn URL placeholder">
              <Linkedin size={16} /> LinkedIn
            </span>
            <a className="social-link" href={`mailto:${site.email}`}>
              <Mail size={16} /> Email
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="profile-orbit">
            <div className="profile-card">
              <div className="profile-monogram" aria-label="Professional portrait placeholder">KT</div>
              <p className="mt-3 text-xs text-slate-500">Portrait placeholder — replace with your professional photo.</p>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[.22em] text-cyan-300">Current focus</p>
                <p className="mt-2 text-xl font-medium text-white">Software Development<br />UI/UX + System Design</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <span className="mini-chip">React / TypeScript</span>
                <span className="mini-chip">PostgreSQL / SQLite</span>
                <span className="mini-chip">Tauri / PHP</span>
                <span className="mini-chip">Figma / Canva</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
