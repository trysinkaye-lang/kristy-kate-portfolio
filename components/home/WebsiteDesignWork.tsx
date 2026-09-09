import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";

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
            I design websites as carefully as I develop them.
          </h2>
          <p className="home-section-lede mt-5">
            Current website work across luxury product storytelling and architecture. Both are shown with real project imagery and are clearly marked as in development.
          </p>
        </div>

        <div className="home-web-projects">
          {websiteProjects.map((project, index) => (
            <article className="home-web-project" key={project.slug}>
              <div className="home-web-project-visual">
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.shortTitle} live development`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.shortTitle} current project preview`}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      loading="lazy"
                      className="home-web-project-image"
                    />
                  </a>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={`${project.shortTitle} current project preview`}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    loading="lazy"
                    className="home-web-project-image"
                  />
                )}
                <div className="home-web-project-visual-meta" aria-hidden="true">
                  <span>0{index + 3}</span>
                  <span>{project.shortTitle}</span>
                </div>
              </div>

              <div className="home-web-project-copy">
                <div className="home-web-project-status">
                  <span /> {project.status}
                </div>
                <h3>{project.shortTitle}</h3>
                <p className="home-web-project-title">{project.title}</p>
                <p className="home-web-project-overview">{project.overview}</p>

                <div className="home-web-project-meta">
                  <div>
                    <span>Role</span>
                    <strong>{project.role}</strong>
                  </div>
                  <div>
                    <span>Focus</span>
                    <strong>{project.highlights.join(" · ")}</strong>
                  </div>
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
                    <a
                      href={project.live}
                      className="project-live-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Development <ExternalLink size={15} />
                    </a>
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
