import Image from "next/image";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/pages.module.css";

export const metadata = pageMetadata(
  "Work",
  "Selected software systems, architecture and real-estate websites, and interface design by Kristy Kate Taylor.",
  "/projects",
);

const visibleProjects = projects.filter(project => project.slug !== "lacomus");

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className={`shell ${styles.page}`}>
      <header className={styles.indexHeader}>
        <p className="eyebrow">Project index</p>
        <h1>Selected work.</h1>
        <p>Six projects across software, web, and interface design.</p>
      </header>
      <div className={styles.projectIndex}>
        {visibleProjects.map((project, index) => (
          <article key={project.slug}>
            <span className={styles.indexNumber}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.indexCopy}>
              <p className="caption">{project.category.join(" / ")}</p>
              <h2>
                <TrackedLink eventName="project_open" eventData={{ project: project.slug, source: "index" }} href={`/projects/${project.slug}`}>
                  {project.shortTitle}
                </TrackedLink>
              </h2>
              <p>{project.headline ?? project.overview}</p>
              <span className={styles.status}>{project.status}</span>
              <TrackedLink eventName="project_open" eventData={{ project: project.slug, source: "index_cta" }} href={`/projects/${project.slug}`} className="text-link" aria-label={`Read ${project.shortTitle} case study`}>
                Explore project <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
            <TrackedLink href={`/projects/${project.slug}`} eventName="project_open" eventData={{ project: project.slug, source: "index_image" }} aria-label={`Explore ${project.shortTitle}`} className={styles.indexImage}>
              <Image
                src={project.image}
                alt={project.imageAlt ?? `${project.shortTitle} interface`}
                width={project.imageWidth}
                height={project.imageHeight}
                style={{ maxWidth: project.imageWidth }}
                sizes="(max-width: 767px) 88vw, (max-width: 1100px) 44vw, 600px"
                unoptimized
                draggable={false}
              />
            </TrackedLink>
          </article>
        ))}
      </div>
    </main>
  );
}
