import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      className="portfolio-v2 projects-page editorial-page min-h-screen pb-20 pt-36"
    >
      <div className="portfolio-shell">
        <header
          className="page-hero-panel projects-refined-hero flex flex-col justify-center"
          style={{ minHeight: "clamp(270px, 23vw, 320px)" }}
        >
          <h1 className="section-title max-w-4xl text-[clamp(3.5rem,6vw,5.85rem)] font-semibold leading-[.9] tracking-[-.06em]">
            My recent <span className="page-title-accent">work.</span>
          </h1>
          <p className="page-intro mt-5 max-w-[680px] text-[1.05rem] leading-7 sm:text-lg sm:leading-8">
            Information systems, business applications, and interfaces I&apos;m proud to have designed and developed.
          </p>
        </header>

        <div className="mt-6 grid gap-5 sm:mt-8">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`project-editorial-row project-accent-${index % 3} editorial-section grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10 xl:gap-12`}
            >
              <TrackedLink
                href={`/projects/${project.slug}`}
                eventName="project_case_study_click"
                eventData={{ project: project.slug, source: "projects_visual" }}
                aria-label={`View ${project.shortTitle} case study`}
                className={`group block min-w-0 ${index % 2 ? "lg:order-2" : ""}`}
              >
                <ProjectScreenshot
                  project={project}
                  priority={index === 0}
                  sizes="(max-width: 1100px) calc(100vw - 48px), 54vw"
                  className="transition-colors duration-200 group-hover:border-white/[.16] group-focus-visible:border-white/[.22] group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-violet-400/60"
                />
              </TrackedLink>

              <div className={`project-copy min-w-0 py-2 ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="project-meta flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[.14em] text-zinc-500">
                  <span className="project-status"><i aria-hidden="true" />{project.status}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-white/10" />
                  <span>{project.category.slice(0, 2).join(" · ")}</span>
                </div>

                <h2 className="section-title project-title mt-4 text-[clamp(2.45rem,4vw,4.1rem)] font-semibold leading-[.96] tracking-[-.05em]">
                  {project.shortTitle}
                </h2>
                <p className="project-full-title mt-3 max-w-xl text-sm font-medium leading-6 text-zinc-400">
                  {project.title}
                </p>
                <p className="project-overview mt-5 max-w-[62ch] text-[1rem] leading-7 text-zinc-400">
                  {project.overview}
                </p>

                <div className="mt-6 grid gap-5 border-t border-white/[.08] pt-5 sm:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
                  <div>
                    <span className="text-[.66rem] font-bold uppercase tracking-[.14em] text-zinc-500">Role</span>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{project.role}</p>
                  </div>
                  <div>
                    <span className="text-[.66rem] font-bold uppercase tracking-[.14em] text-zinc-500">Technology</span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((item) => (
                        <span className="v2-chip" key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <TrackedLink
                  href={`/projects/${project.slug}`}
                  eventName="project_case_study_click"
                  eventData={{ project: project.slug, source: "projects_cta" }}
                  className="project-case-link group mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  View Case Study
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" size={16} />
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>

        <section className="projects-cta page-cta editorial-section py-20 text-center sm:py-24">
          <h2 className="section-title mx-auto max-w-3xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl">
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
