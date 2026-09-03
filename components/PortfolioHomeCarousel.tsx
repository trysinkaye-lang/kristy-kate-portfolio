"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeCinematicHero } from "@/components/animations/HomeCinematicHero";

const capabilities = [
  {
    index: "01",
    title: "Information systems",
    description: "Records, workflows, reporting, and operational data shaped into clear, dependable software.",
  },
  {
    index: "02",
    title: "Web applications",
    description: "Responsive applications designed to stay usable and readable across desktop, tablet, and mobile.",
  },
  {
    index: "03",
    title: "UI/UX design",
    description: "Interfaces that reduce friction, improve hierarchy, and make complex tasks easier to understand.",
  },
];

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2">
      <HomeCinematicHero />

      <section className="portfolio-section home-capabilities border-t border-white/[.06]">
        <div className="portfolio-shell py-20 lg:py-24">
          <div className="home-capabilities-header">
            <div className="home-capabilities-copy">
              <p className="v2-kicker">What I build</p>
              <h2 className="v2-heading mt-4">Three areas. One clear focus.</h2>
              <p className="mt-5 max-w-xl leading-7 text-zinc-500">
                Useful software starts with understanding the work, then designing the simplest system that can support it well.
              </p>
            </div>
          </div>

          <div className="home-capability-grid mt-12">
            {capabilities.map((item) => (
              <article className="home-capability-card" key={item.title}>
                <span className="home-capability-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="home-work-cta">
            <p>Want to see how these come together in real projects?</p>
            <Link href="/projects" className="home-work-link">
              Explore projects <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
