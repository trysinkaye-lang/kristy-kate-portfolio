import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";

const websiteProjects = projects.filter((project) =>
  ["lacomus-revamp", "co-designs-website"].includes(project.slug),
);

export function WebsiteDesignWork() {
  return (
    <section className="home-flow-section home-web-work" aria-labelledby="website-work-title">
      <div className="portfolio-shell">
        <div className="home-web-work-intro">
          <p className="v2-kicker">Website design & development</p>
          <h2 id="website-work-title" className="v2-heading mt-4">
            I don&apos;t only build systems. I design experiences for the web.
          </h2>
          <p className="home-section-lede mt-5">
            Current website work spanning luxury product storytelling and architecture-focused interactive design. These projects are openly marked as in development while I continue refining them.
          </p>
        </div>

        <div className="home-web-projects">
          {websiteProjects.map((project, index) => (
            <article className="home-web-project" key={project.slug}>
              <div className="home-web-project-number">0{index + 3}</div>
              <div className="home-web-project-visual">
                <ProjectScreenshot
                  project={project}
                  sizes="(max-width: 1024px) calc(100vw - 48px), 55vw"
                  constrainToSourceWidth={false}
                />
              </div>

              <div className="home-web-project-copy">
                <div className="home-web-project-status">
                  <span /> {project.status}
                </div>
                <h3>{project.shortTitle}</h3>
                <p className="home-web-project-title">{project.title}</p>
                <p className="home-web-project-overview">{project.overview}</p>

                <div className="home-web-project-meta">
                  <div><span>Role</span><strong>{project.role}</strong></div>
                  <div><span>Focus</span><strong>{project.highlights.join(" · ")}</strong></div>
                </div>

                <div className="home-web-project-actions">
                  <TrackedLink
                    href={`/projects/${project.slug}`}
                    eventName="project_case_study_click"
                    eventData={{ project: project.slug, source: "website_work" }}
                    className="project-case-link"
                  >
                    Explore Project <ArrowRight size={16} />
                  </TrackedLink>

                  {project.live ? (
                    <TrackedLink
                      href={project.live}
                      eventName="project_live_click"
                      eventData={{ project: project.slug, source: "website_work" }}
                      className="project-live-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Development <ExternalLink size={15} />
                    </TrackedLink>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
