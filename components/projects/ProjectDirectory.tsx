import Image from "next/image";
import type { Project } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "./ProjectDirectory.module.css";

export function ProjectDirectory({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.section} aria-label="Projects directory">
      <div className={["shell", styles.topline].join(" ")}>
        <p>Explore the work</p>
        <p>{String(projects.length).padStart(2, "0")} projects / Software &amp; websites</p>
      </div>

      <div className={styles.list}>
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, "0");
          const link = "/projects/" + project.slug;

          return (
            <article
              key={project.slug}
              className={[
                styles.project,
                index === 0 ? styles.featured : "",
                index % 2 === 1 ? styles.reversed : "",
              ].filter(Boolean).join(" ")}
              data-project-slug={project.slug}
            >
              <div className={["shell", styles.projectInner].join(" ")}>
                <div className={styles.copy}>
                  <div className={styles.topMeta}>
                    <span>{number} / {String(projects.length).padStart(2, "0")}</span>
                    <span>{project.category.slice(0, 2).join(" / ")}</span>
                  </div>

                  <h2>
                    <TrackedLink
                      href={link}
                      eventName="project_open"
                      eventData={{ project: project.slug, source: "directory_title" }}
                    >
                      {project.shortTitle}
                    </TrackedLink>
                  </h2>

                  <p className={styles.headline}>{project.headline ?? project.title}</p>
                  <p className={styles.description}>{project.overview}</p>

                  <div className={styles.underCopy}>
                    <p className={styles.technology}>{project.technologies.slice(0, 4).join(" · ")}</p>
                    <TrackedLink
                      className={styles.read}
                      href={link}
                      eventName="project_open"
                      eventData={{ project: project.slug, source: "directory_cta" }}
                      aria-label={"Read " + project.shortTitle + " case study"}
                    >
                      Explore project <span aria-hidden="true">↗</span>
                    </TrackedLink>
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
                      sizes="(max-width: 767px) 90vw, (max-width: 1200px) 48vw, 760px"
                      unoptimized
                      priority={index === 0}
                    />
                  </span>
                  <span className={styles.visualCaption}>
                    <span>{project.shortTitle} / Project preview</span>
                    <span aria-hidden="true">View ↗</span>
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
