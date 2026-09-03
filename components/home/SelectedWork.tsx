import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";

const featuredProjects = projects.filter((project) =>
  ["rbim", "ahdis"].includes(project.slug),
);

export function SelectedWork() {
  return (
    <section
      className="home-flow-section home-selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="portfolio-shell">
        <div className="home-section-heading">
          <div>
            <p className="v2-kicker">Selected work</p>
            <h2
              id="selected-work-title"
              className="v2-heading mt-4"
            >
              Real systems, built around real workflows.
            </h2>
          </div>
          <p className="home-section-lede">
            A focused look at the information systems that best represent my
            software development and interface work.
          </p>
        </div>

        <div className="projects-list mt-12">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className={`project-editorial-row project-accent-${index % 3} editorial-section grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-14`}
            >
              <TrackedLink
                href={`/projects/${project.slug}`}
                eventName="project_case_study_click"
                eventData={{ project: project.slug, source: "home_visual" }}
                aria-label={`View ${project.shortTitle} case study`}
                className={`project-editorial-visual project-visual-shell group relative aspect-[16/10] overflow-hidden border border-white/[.09] ${index % 2 ? "lg:order-2" : ""}`}
              >
                <div className="project-visual-glow" aria-hidden="true" />
                <Image
                  src={project.image}
                  alt={`${project.shortTitle} interface`}
                  fill
                  className="project-interface-image object-contain p-4 transition duration-700 group-hover:scale-[1.025]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <span className="project-open-button absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white backdrop-blur-xl transition group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={18} />
                </span>
              </TrackedLink>

              <div className={`project-copy ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="project-meta flex items-center gap-3 text-xs uppercase tracking-[.16em] text-zinc-600">
                  <span className="project-status">
                    <i aria-hidden="true" />
                    {project.status}
                  </span>
                </div>

                <h3 className="section-title project-title mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">
                  {project.shortTitle}
                </h3>
                <p className="project-full-title mt-4 text-sm font-medium text-zinc-400">
                  {project.title}
                </p>

                <div className="home-project-facts mt-7">
                  <div>
                    <span>Problem</span>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <span>Solution</span>
                    <p>{project.solution}</p>
                  </div>
                  <div>
                    <span>Role</span>
                    <p>{project.role}</p>
                  </div>
                </div>

                <div className="project-tech mt-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 7).map((item) => (
                    <span className="v2-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <TrackedLink
                  href={`/projects/${project.slug}`}
                  eventName="project_case_study_click"
                  eventData={{ project: project.slug, source: "home_cta" }}
                  className="project-case-link mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
                >
                  View Case Study <ArrowRight size={16} />
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>

        <div className="home-view-all">
          <TrackedLink
            href="/projects"
            eventName="home_view_projects"
            eventData={{ source: "selected_work" }}
            className="v2-button"
          >
            View All Projects <ArrowUpRight size={16} />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
