"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlueprintHero } from "@/components/BlueprintHero";

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

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2">
      <BlueprintHero />

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
