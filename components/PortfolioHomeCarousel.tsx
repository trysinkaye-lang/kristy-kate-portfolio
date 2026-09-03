"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeCinematicHero } from "@/components/animations/HomeCinematicHero";

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
    <main id="main-content" className="portfolio-v2 home14-page">
      <HomeCinematicHero />

      <section className="home14-statement">
        <div className="portfolio-shell home14-statement-grid">
          <p className="home14-section-label">What I build</p>
          <div>
            <p className="home14-statement-copy">
              Good software should make complicated work feel <em>obvious.</em>
            </p>
            <p className="home14-statement-support">
              I work across systems thinking, interface design, and implementation so the final product feels coherent from the data model to the screen.
            </p>
          </div>
        </div>
      </section>

      <section className="home14-capabilities-section">
        <div className="portfolio-shell">
          <div className="home14-capability-list">
            {capabilities.map((item) => (
              <article className="home14-capability-row" key={item.title}>
                <span className="home14-capability-index">{item.index}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="home14-capability-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home14-project-bridge">
        <div className="portfolio-shell home14-project-bridge-inner">
          <div>
            <p className="home14-section-label">Selected work</p>
            <h2>See the systems behind the interface.</h2>
          </div>
          <Link href="/projects" className="home14-project-link">
            Explore projects <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
