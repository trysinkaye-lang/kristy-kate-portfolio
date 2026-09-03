import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";

export default function ProjectsPage() {
  return (
    <main id="main-content" className="portfolio-v2 projects-page editorial-page projects-v13 min-h-screen pb-20 pt-36">
      <div className="portfolio-shell">
        <header className="projects-v13-hero">
          <div className="projects-v13-hero-copy">
            <div className="projects-v13-eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              Selected systems, interfaces, and product work
            </div>
            <h1 className="page-title projects-heading text-white">
              Work built for <span className="page-title-accent">real workflows.</span>
            </h1>
            <p className="page-intro projects-subtitle mt-7 max-w-2xl text-lg leading-8 text-zinc-500">
              I design and develop systems where data, workflow, and interface decisions have to work together—not just look good in a screenshot.
            </p>
          </div>

          <div className="projects-v13-hero-stats" aria-label="Portfolio highlights">
            <div><strong>04</strong><span>Case studies</span></div>
            <div><strong>03</strong><span>Information systems</span></div>
            <div><strong>Full cycle</strong><span>Requirements to interface</span></div>
          </div>
        </header>

        <ProjectsExplorer />

        <section className="projects-v13-cta">
          <div>
            <p className="v2-kicker">Have something complex to build?</p>
            <h2>Let&apos;s turn the workflow into a system people can actually use.</h2>
          </div>
          <Link href="/contact" className="v2-button v2-button-primary">
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
