"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./ProjectDirectory.module.css";

type Filter = "all" | "software" | "websites";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "software", label: "Software" },
  { id: "websites", label: "Websites" },
];

function inCategory(project: Project, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "software") return project.category.includes("Information Systems");
  return project.category.includes("Websites");
}

export function ProjectDirectory({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = projects.filter(project => inCategory(project, filter));
  return (
    <section className={["shell",styles.section].join(" ")} aria-label="Projects directory">
      <div className={styles.toolbar}>
        <div role="group" aria-label="Filter projects" className={styles.filters}>
          {filters.map(option => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              className={styles.filter}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
              <span aria-hidden="true">{String(projects.filter(project => inCategory(project, option.id)).length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <p className={styles.counter} role="status">
          Showing {String(shown.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div className={styles.grid}>
        {shown.map((project,index) => (
          <article className={index === 0 ? [styles.card,styles.featured].join(" ") : styles.card} key={project.slug}>
            <TrackedLink
              className={styles.imageLink}
              href={"/projects/"+project.slug}
              eventName="project_open"
              eventData={{project:project.slug,source:"directory_image"}}
              aria-label={"Explore "+project.shortTitle}
            >
              <span className={styles.imageHeader} aria-hidden="true">
                <span className={styles.windowDots}><i/><i/><i/></span>
                <span>{project.category[0]}</span>
                <span className={styles.windowArrow}>↗</span>
              </span>
              <span className={styles.imageFrame}>
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? project.shortTitle+" project preview"}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  sizes="(max-width: 767px) 90vw, (max-width: 1050px) 44vw, 680px"
                  unoptimized
                />
              </span>
            </TrackedLink>

            <div className={styles.info}>
              <div className={styles.meta}>
                <span>{String(index+1).padStart(2,"0")} / {project.category.slice(0,2).join(" · ")}</span>
                <span className={styles.status}>{project.status}</span>
              </div>
              <h2>
                <TrackedLink href={"/projects/"+project.slug} eventName="project_open"
                  eventData={{project:project.slug,source:"directory_title"}}>
                  {project.shortTitle}
                </TrackedLink>
              </h2>
              <p>{project.overview}</p>
              <div className={styles.bottom}>
                <span>{project.technologies.slice(0,3).join(" / ")}</span>
                <TrackedLink
                  href={"/projects/"+project.slug}
                  eventName="project_open"
                  eventData={{project:project.slug,source:"directory_cta"}}
                  aria-label={"Read "+project.shortTitle+" case study"}
                  className={styles.more}
                >
                  Case study <span aria-hidden="true">↗</span>
                </TrackedLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.footerNote}>
        Each project represents a distinct implementation or redesign. Projects in development are labeled as such.
      </p>
    </section>
  );
}
