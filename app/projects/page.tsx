import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectStoryList } from "@/components/projects/ProjectStoryList";

export default function ProjectsPage() {
  return (
    <main id="main-content" className="portfolio-v2 projects-page min-h-screen pb-20 pt-36">
      <div className="portfolio-shell">
        <header className="projects-hero relative max-w-4xl pb-16 sm:pb-20">
          <div className="projects-color-rail" aria-hidden="true"><span /><span /><span /></div>
          <p className="v2-kicker projects-kicker">Selected work</p>
          <h1 className="projects-heading mt-5">Case studies, not just cards.</h1>
          <p className="projects-subtitle mt-7 max-w-2xl">
            Information systems, business applications, and interfaces presented as the problems, decisions, and workflows behind the final screens.
          </p>
        </header>

        <ProjectStoryList />

        <section className="projects-cta py-24 text-center">
          <p className="v2-kicker">Let’s connect</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">
            Have a system, website, or interface in mind?
          </h2>
          <Link href="/contact" className="v2-button v2-button-primary mt-8">
            Contact me <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
