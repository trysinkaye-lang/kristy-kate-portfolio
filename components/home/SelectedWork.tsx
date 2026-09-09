import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";

const featuredProjects = projects.filter((project) => ["rbim", "ahdis"].includes(project.slug));

export function SelectedWork() {
  return (
    <section className="home-flow-section home-selected-work" aria-labelledby="selected-work-title">
      <div className="portfolio-shell">
        <div className="home-section-heading home-section-heading-wide">
          <div>
            <p className="v2-kicker">Selected work / systems</p>
            <h2 id="selected-work-title" className="v2-heading mt-4">Systems built for real-world operations.</h2>
          </div>
          <p className="home-section-lede">
            RBIM and AHDIS show how I turn complex data and day-to-day workflows into reliable software, with structured records, validation, reporting, and desktop-first usability built in.
          </p>
        </div>

        <div className="home-system-projects">
          {featuredProjects.map((project, index) => (
            <article key={project.slug} className="home-system-project">
              <TrackedLink
                href={`/projects/${project.slug}`}
                eventName="project_case_study_click"
                eventData={{ project: project.slug, source: "home_visual" }}
                aria-label={`View ${project.shortTitle} case study`}
                className={`home-system-visual group ${index % 2 ? "home-system-visual-reverse" : ""}`}
              >
                <ProjectScreenshot
                  project={project}
                  priority={index === 0}
                  sizes="(max-width: 1024px) calc(100vw - 40px), 58vw"
                  className="home-system-screenshot transition-colors duration-200 group-hover:border-white/[.18]"
                />
              </TrackedLink>

              <div className={`home-system-copy ${index % 2 ? "home-system-copy-reverse" : ""}`}>
                <div className="home-system-eyebrow">
                  <span>0{index + 1}</span>
                  <span className="project-status"><i aria-hidden="true" />{project.status}</span>
                </div>

                <h3>{project.shortTitle}</h3>
                <p className="home-system-title">{project.title}</p>
                <p className="home-system-overview">{project.overview}</p>

                <div className="home-system-meta">
                  <div><span>Role</span><strong>{project.role}</strong></div>
                  <div><span>Built around</span><strong>{project.highlights.join(" · ")}</strong></div>
                </div>

                <div className="home-system-tech">
                  {project.technologies.slice(0, 6).map((item) => <span className="v2-chip" key={item}>{item}</span>)}
                </div>

                <TrackedLink
                  href={`/projects/${project.slug}`}
                  eventName="project_case_study_click"
                  eventData={{ project: project.slug, source: "home_cta" }}
                  className="project-case-link"
                >
                  View Case Study <ArrowRight size={16} />
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>

        <div className="home-view-all">
          <TrackedLink href="/projects" eventName="home_view_projects" eventData={{ source: "selected_work" }} className="v2-button">
            View All Projects <ArrowUpRight size={16} />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
