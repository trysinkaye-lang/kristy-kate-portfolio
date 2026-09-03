import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export default function ProjectsPage() {
  return (
    <main id="main-content" className="portfolio-v2 projects-page editorial-page min-h-screen pb-20 pt-36">
      <div className="portfolio-shell">
        <header className="page-hero page-hero-panel projects-hero">
          <h1 className="page-title projects-heading text-white">My recent <span className="page-title-accent">work.</span></h1>
          <p className="page-intro projects-subtitle mt-7 max-w-2xl text-lg leading-8 text-zinc-500">Information systems, business applications, and interfaces I’m proud to have designed and developed.</p>
        </header>

        <div className="projects-list mt-12">
          {projects.map((project, index) => (
            <article key={project.slug} className={`project-editorial-row project-accent-${index % 3} editorial-section grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-14`}>
              <TrackedLink
                href={`/projects/${project.slug}`}
                eventName="project_case_study_click"
                eventData={{ project: project.slug, source: "projects_visual" }}
                aria-label={`View ${project.shortTitle} case study`}
                className={`project-editorial-visual project-visual-shell group relative aspect-[16/10] overflow-hidden border border-white/[.09] ${index % 2 ? "lg:order-2" : ""}`}
              >
                <div className="project-visual-glow" aria-hidden="true" />
                <Image src={project.image} alt={`${project.shortTitle} interface`} fill className="project-interface-image object-contain p-4 transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 1024px) 100vw, 58vw" />
                <span className="project-open-button absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white backdrop-blur-xl transition group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={18} /></span>
              </TrackedLink>

              <div className={`project-copy ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="project-meta flex items-center gap-3 text-xs uppercase tracking-[.16em] text-zinc-600">
                  <span className="project-status"><i aria-hidden="true" />{project.status}</span>
                </div>
                <h2 className="section-title project-title mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">{project.shortTitle}</h2>
                <p className="project-full-title mt-4 text-sm font-medium text-zinc-400">{project.title}</p>
                <p className="project-overview mt-6 max-w-xl text-lg leading-8 text-zinc-500">{project.overview}</p>
                <div className="mt-7 grid gap-4">
                  <div className="border-t border-white/[.07] pt-4">
                    <span className="text-[.68rem] font-bold uppercase tracking-[.15em] text-zinc-600">Problem</span>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">{project.problem}</p>
                  </div>
                  <div className="border-t border-white/[.07] pt-4">
                    <span className="text-[.68rem] font-bold uppercase tracking-[.15em] text-zinc-600">Solution</span>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">{project.solution}</p>
                  </div>
                </div>
                <div className="project-role mt-6">
                  <span className="text-[.68rem] font-bold uppercase tracking-[.15em] text-zinc-600">Role</span>
                  <p className="mt-2 text-sm text-zinc-400">{project.role}</p>
                </div>
                <div className="project-tech mt-6">
                  <span className="text-[.68rem] font-bold uppercase tracking-[.15em] text-zinc-600">Stack</span>
                  <div className="mt-3 flex flex-wrap gap-2">{project.technologies.slice(0, 6).map((item) => <span className="v2-chip" key={item}>{item}</span>)}</div>
                </div>
                <TrackedLink
                  href={`/projects/${project.slug}`}
                  eventName="project_case_study_click"
                  eventData={{ project: project.slug, source: "projects_cta" }}
                  className="project-case-link mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
                >
                  View case study <ArrowRight size={16} />
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>

        <section className="projects-cta page-cta editorial-section py-24 text-center"><h2 className="section-title mx-auto max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Have a system, website, or interface in mind?</h2><Link href="/contact" className="v2-button v2-button-primary mt-8">Contact me <ArrowUpRight size={16} /></Link></section>
      </div>
    </main>
  );
}
