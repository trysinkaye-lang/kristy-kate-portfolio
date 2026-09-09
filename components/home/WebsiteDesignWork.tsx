import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";

const websiteProjects = ["co-designs-website", "marci-metzger-redesign", "lacomus-revamp"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

export function WebsiteDesignWork() {
  return (
    <section className="home-flow-section home-web-work" aria-labelledby="website-work-title">
      <div className="portfolio-shell">
        <div className="home-web-work-intro">
          <div>
            <p className="v2-kicker">Website design & development</p>
            <h2 id="website-work-title" className="v2-heading mt-4">
              Websites I&apos;m designing and building.
            </h2>
          </div>
          <p className="home-section-lede">
            Real website work, shown from the live deployments. Each project has a different visual direction, audience, and interaction model.
          </p>
        </div>

        <div className="home-web-projects">
          {websiteProjects.map((project, index) => (
            <article className="home-web-project" key={project.slug}>
              <div className="home-web-project-visual">
                <div className="home-site-browser" aria-label={`${project.shortTitle} live website preview`}>
                  <div className="home-site-browser-bar" aria-hidden="true">
                    <span className="home-site-browser-dots"><i /><i /><i /></span>
                    <span className="home-site-browser-domain">
                      {project.live?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </span>
                    <span>0{index + 1}</span>
                  </div>

                  {project.live ? (
                    <div className="home-site-browser-stage">
                      <iframe
                        src={project.live}
                        title={`${project.shortTitle} live website preview`}
                        loading="lazy"
                        tabIndex={-1}
                        className="home-site-browser-frame"
                      />
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="home-site-browser-hitarea"
                        aria-label={`Open ${project.shortTitle} live website`}
                      />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={`${project.shortTitle} project preview`}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      loading="lazy"
                      className="home-web-project-image"
                    />
                  )}
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
                    View Project Details <ArrowRight size={16} />
                  </TrackedLink>

                  {project.live ? (
                    <a
                      href={project.live}
                      className="project-live-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Live Site <ExternalLink size={15} />
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
