import Image from "next/image";
import type { Project } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./ProjectDirectory.module.css";

export function ProjectDirectory({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.section} aria-label="Projects directory">
      <div className={["shell", styles.topline].join(" ")}>
        <span>Projects</span>
        <span>{String(projects.length).padStart(2, "0")} projects</span>
      </div>

      <div className={styles.list}>
        {projects.map((project, index) => {
          const link = "/projects/" + project.slug;
          return (
            <article
              key={project.slug}
              className={[styles.project, index % 2 === 1 ? styles.reversed : ""].filter(Boolean).join(" ")}
              data-project-slug={project.slug}
            >
              <div className={["shell", styles.projectInner].join(" ")}>
                <div className={styles.copy}>
                  <p className={styles.topMeta}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.category[0]}</span>
                  </p>
                  <h2>
                    <TrackedLink
                      href={link}
                      eventName="project_open"
                      eventData={{ project: project.slug, source: "directory_title" }}
                    >
                      {project.shortTitle}
                    </TrackedLink>
                  </h2>
                  <p className={styles.description}>{project.overview}</p>
                  <p className={styles.technology}>{project.technologies.slice(0, 3).join(" · ")}</p>
                  <div className={styles.actions}>
                    <TrackedLink
                      className={styles.read}
                      href={link}
                      eventName="project_open"
                      eventData={{ project: project.slug, source: "directory_cta" }}
                      aria-label={"View " + project.shortTitle + " project"}
                    >
                      View project <span aria-hidden="true">↗</span>
                    </TrackedLink>
                    <span className={styles.status}>{project.status}</span>
                  </div>
                </div>

                <TrackedLink
                  href={link}
                  className={styles.visual}
                  eventName="project_open"
                  eventData={{ project: project.slug, source: "directory_image" }}
                  aria-label={"Explore " + project.shortTitle}
                >
                  <span className={styles.imageFrame}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? project.shortTitle + " interface preview"}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      sizes="(max-width: 767px) 84vw, (max-width: 1200px) 38vw, 470px"
                      unoptimized
                      priority={index === 0}
                    />
                  </span>
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
