import Image from "next/image";
import type { Project } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./ProjectDirectory.module.css";

export function ProjectDirectory({projects}:{projects:Project[]}) {
  return (
    <section className={styles.section} aria-label="Projects directory">
      <div className={["shell",styles.topline].join(" ")}>
        <span>Project index / {String(projects.length).padStart(2,"0")}</span>
        <span>Desktop / Web / Information systems</span>
      </div>
      <div className={["shell",styles.list].join(" ")}>
        {projects.map((project,index) => (
          <article className={styles.item} key={project.slug} data-project-slug={project.slug}>
            <TrackedLink
              className={styles.link}
              href={"/projects/"+project.slug}
              eventName="project_open"
              eventData={{project:project.slug,source:"directory"}}
              aria-label={"Explore "+project.shortTitle}
            >
              <span className={styles.count}>({String(index+1).padStart(2,"0")})</span>
              <div className={styles.description}>
                <h2>{project.shortTitle}</h2>
                <span>{project.overview}</span>
              </div>
              <span className={styles.visual}>
                <Image src={project.image} alt={project.imageAlt ?? project.shortTitle+" interface preview"}
                  width={project.imageWidth} height={project.imageHeight}
                  sizes="(max-width: 767px) 28vw, 220px" unoptimized />
              </span>
              <span className={styles.category}>
                {project.category[0]}
                <small>{project.year ?? project.status}</small>
              </span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </TrackedLink>
          </article>
        ))}
      </div>
    </section>
  );
}
