import Image from "next/image";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/pages.module.css";

export const metadata = pageMetadata(
  "Projects",
  "Software systems, desktop applications, and websites developed by Kristy Kate Taylor.",
  "/projects",
);

const visibleProjects = projects.filter(project => project.slug !== "lacomus");

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className={["shell", styles.page, styles.projectsPage].join(" ")}>
      <header className={styles.indexHeader}>
        <p className="eyebrow">Portfolio / {String(visibleProjects.length).padStart(2, "0")} projects</p>
        <h1>Projects</h1>
        <p>Practical software, intuitive interfaces, and websites designed for real people.</p>
      </header>

      <div className={styles.projectIndex}>
        {visibleProjects.map((project, index) => (
          <article key={project.slug}>
            <TrackedLink
              href={"/projects/" + project.slug}
              eventName="project_open"
              eventData={{ project: project.slug, source: "index_image" }}
              aria-label={"Explore " + project.shortTitle}
              className={styles.indexImage}
            >
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.shortTitle + " interface"}
                width={project.imageWidth}
                height={project.imageHeight}
                sizes="(max-width: 767px) 88vw, (max-width: 1000px) 43vw, 650px"
                unoptimized
              />
            </TrackedLink>
            <div className={styles.indexCopy}>
              <div className={styles.projectMeta}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.category.slice(0, 2).join(" / ")}</span>
              </div>
              <h2>
                <TrackedLink eventName="project_open" eventData={{ project: project.slug, source: "index" }} href={"/projects/" + project.slug}>
                  {project.shortTitle}
                </TrackedLink>
              </h2>
              <p>{project.headline ?? project.overview}</p>
              <div className={styles.projectActions}>
                <span className={styles.status}>{project.status}</span>
                <TrackedLink eventName="project_open" eventData={{ project: project.slug, source: "index_cta" }} href={"/projects/" + project.slug} className="text-link" aria-label={"Read " + project.shortTitle + " case study"}>
                  View project <span aria-hidden="true">↗</span>
                </TrackedLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
