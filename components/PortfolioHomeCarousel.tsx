"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeScrollStory } from "@/components/animations/HomeScrollStory";

const capabilities = [
  {
    index: "01",
    title: "Information systems",
    description: "Structured workflows, records, validation, reporting, and dependable operational software.",
  },
  {
    index: "02",
    title: "Web applications",
    description: "Responsive products designed to stay clear and usable across desktop, tablet, and mobile.",
  },
  {
    index: "03",
    title: "UI/UX design",
    description: "Readable hierarchy and interaction design that reduce friction in complex tools.",
  },
];

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2 home16-page">
      <HomeScrollStory />

      <section className="home16-manifesto">
        <div className="portfolio-shell home16-manifesto-grid">
          <p className="home16-section-label">What I build</p>
          <div>
            <p className="home16-manifesto-copy">
              Software should reduce friction, not add another layer of complexity.
            </p>
            <p className="home16-manifesto-support">
              I work across systems thinking, interface design, and implementation so each product feels coherent from the data model to the final interaction.
            </p>
          </div>
        </div>
      </section>

      <section className="home16-capabilities">
        <div className="portfolio-shell">
          <div className="home16-capability-list">
            {capabilities.map((item) => (
              <article className="home16-capability-row" key={item.title}>
                <span className="home16-capability-index">{item.index}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="home16-capability-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home16-project-bridge">
        <div className="portfolio-shell home16-project-bridge-inner">
          <div>
            <p className="home16-section-label">Selected work</p>
            <h2>See how the thinking becomes software.</h2>
          </div>
          <Link href="/projects" className="home16-project-link">
            Explore projects <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
