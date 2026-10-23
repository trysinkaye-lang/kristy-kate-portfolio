import { publicProjects } from "@/data/projects";
import { ProjectDirectory } from "@/components/projects/ProjectDirectory";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/projects-index.module.css";

export const metadata = pageMetadata(
  "Projects",
  "Software systems, desktop applications, and websites developed by Kristy Kate Taylor.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={["shell",styles.header].join(" ")}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>The portfolio / 2026</p>
          <h1>Projects<span className={styles.period}>.</span></h1>
        </div>
        <p className={styles.intro}>
          Software, information systems, and websites shaped around how people actually work.
          Explore each project for the problem, technology, and implementation details.
        </p>
      </header>
      <ProjectDirectory projects={publicProjects} />
    </main>
  );
}
