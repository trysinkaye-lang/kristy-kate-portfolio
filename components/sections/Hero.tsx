"use client";

import { ArrowDownRight, Github, Mail } from "lucide-react";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="max-w-4xl">
          <p className="eyebrow">Kristy Kate Taylor</p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-.055em] text-white sm:text-6xl lg:text-7xl">
            Software Developer &amp; UI/UX Designer
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            I design and develop practical digital systems, web applications, and user-centered interfaces with a focus on clarity, reliability, and real-world workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="primary-cta" href="#projects">
              View Projects <ArrowDownRight size={17} />
            </a>
            <a className="secondary-cta" href="#contact">Contact Me</a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <a className="social-link" href={site.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a className="social-link" href={`mailto:${site.email}`}>
              <Mail size={16} /> Email
            </a>
          </div>
        </div>

        <div className="mt-14 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-3">
          {["Software Development", "Information Systems", "UI/UX Design"].map((item) => (
            <div key={item} className="bg-[#070b12] px-5 py-5 text-sm font-medium text-slate-300 sm:px-6">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
