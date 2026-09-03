"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties, type PointerEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Layers3,
  MonitorSmartphone,
  Palette,
} from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { TechLogo } from "@/components/ui/TechLogo";

const filters = [
  { label: "All", icon: Layers3 },
  { label: "Information Systems", icon: MonitorSmartphone },
  { label: "UI/UX", icon: Palette },
  { label: "Business Systems", icon: BriefcaseBusiness },
] as const;

type Filter = (typeof filters)[number]["label"];

export function ProjectsExplorer() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category.includes(activeFilter)),
    [activeFilter],
  );

  const moveSpotlight = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section className="projects-explorer" aria-labelledby="projects-explorer-title">
      <div className="projects-explorer-toolbar">
        <div>
          <p className="v2-kicker">Explore the work</p>
          <h2 id="projects-explorer-title" className="projects-explorer-heading">
            Case studies with the thinking left in.
          </h2>
        </div>

        <div className="projects-filter" aria-label="Filter projects">
          {filters.map(({ label, icon: Icon }) => {
            const active = activeFilter === label;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                className={`projects-filter-button ${active ? "is-active" : ""}`}
                onClick={() => setActiveFilter(label)}
              >
                <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="projects-result-line" aria-live="polite">
        <span>{String(visibleProjects.length).padStart(2, "0")}</span>
        <p>{activeFilter === "All" ? "Selected projects" : activeFilter}</p>
      </div>

      <div className="projects-interactive-grid">
        {visibleProjects.map((project, index) => {
          const sourceIndex = projects.findIndex((item) => item.slug === project.slug);
          const featured = sourceIndex === 0;

          return (
            <article
              key={project.slug}
              className={`projects-interactive-card project-accent-${sourceIndex % 3} ${featured ? "is-featured" : ""}`}
              onPointerMove={moveSpotlight}
              style={{ "--card-order": index } as CSSProperties}
            >
              <span className="projects-card-spotlight" aria-hidden="true" />

              <TrackedLink
                href={`/projects/${project.slug}`}
                eventName="project_case_study_click"
                eventData={{ project: project.slug, source: "projects_visual_v13" }}
                className="projects-card-visual group"
                aria-label={`View ${project.shortTitle} case study`}
              >
                <div className="projects-card-image-wrap">
                  <Image
                    src={project.image}
                    alt={`${project.shortTitle} interface`}
                    fill
                    className="projects-card-image"
                    sizes={featured ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 1024px) 100vw, 45vw"}
                  />
                </div>

                <div className="projects-visual-overlay" aria-hidden="true" />
                <span className="projects-card-number">{String(sourceIndex + 1).padStart(2, "0")}</span>
                <span className="projects-card-open">
                  <ArrowUpRight size={18} />
                </span>
                <span className="projects-card-status"><i aria-hidden="true" />{project.status}</span>
              </TrackedLink>

              <div className="projects-card-content">
                <div className="projects-card-category-row">
                  {project.category.slice(0, 3).map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>

                <h3>{project.shortTitle}</h3>
                <p className="projects-card-full-title">{project.title}</p>
                <p className="projects-card-overview">{project.overview}</p>

                <div className="projects-story-grid">
                  <div>
                    <span>Problem</span>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <span>Solution</span>
                    <p>{project.solution}</p>
                  </div>
                </div>

                <div className="projects-proof-row">
                  <div>
                    <span>Role</span>
                    <strong>{project.role}</strong>
                  </div>
                  <div>
                    <span>Features</span>
                    <strong>{project.features.length}</strong>
                  </div>
                  <div>
                    <span>Challenges</span>
                    <strong>{project.challenges.length}</strong>
                  </div>
                </div>

                <div className="projects-tech-row" aria-label={`${project.shortTitle} technology stack`}>
                  {project.technologies.slice(0, featured ? 7 : 5).map((technology) => (
                    <span className="projects-tech-chip" key={technology}>
                      <TechLogo name={technology} size={15} />
                      {technology}
                    </span>
                  ))}
                </div>

                <TrackedLink
                  href={`/projects/${project.slug}`}
                  eventName="project_case_study_click"
                  eventData={{ project: project.slug, source: "projects_cta_v13" }}
                  className="projects-card-cta"
                >
                  Explore case study <ArrowRight size={16} />
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
