import Link from "next/link";
import { publicProjects } from "@/data/projects";
import { ProjectDirectory } from "@/components/projects/ProjectDirectory";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/projects-index.module.css";

export const metadata = pageMetadata(
  "Projects",
  "Explore Kristy Kate Taylor's software systems, desktop applications, and website projects.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={["shell", styles.header].join(" ")}>
        <div className={styles.headline}>
          <p className={styles.eyebrow}>Kristy Kate Taylor / Portfolio</p>
          <h1>Projects<span aria-hidden="true">.</span></h1>
        </div>
        <div className={styles.intro}>
          <p>A collection of information systems, desktop applications and websites. Each entry shows the actual product, the tools used and what I built.</p>
          <Link href="/about" className={styles.aboutLink}>More about me <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <ProjectDirectory projects={publicProjects} />

      <aside className={styles.endNote}>
        <div className={["shell", styles.endInner].join(" ")}>
          <div>
            <p>Contact</p>
            <h2>Want to talk about a project?</h2>
          </div>
          <Link href="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
        </div>
      </aside>
    </main>
  );
}
