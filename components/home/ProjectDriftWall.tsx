import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./SelectedWork.module.css";

const featuredSlugs = ["rbim", "ahdis", "co-designs", "marci-metzger"] as const;
const featuredProjects = featuredSlugs.flatMap(slug => projects.filter(project => project.slug === slug));

export function ProjectDriftWall() {
  return (
    <section className={styles.section} aria-label="Featured case studies">
      <div className="shell">
        <nav className={styles.gallery} aria-label="Projects gallery">
          {featuredProjects.map((project, index) => (
            <article className={styles.card} key={project.slug}>
              <Link className={styles.imageLink} href={"/projects/" + project.slug} aria-label={"View " + project.shortTitle + " case study"}>
                <span className={styles.imageFrame}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? project.shortTitle + " project screenshot"}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    sizes="(max-width: 767px) 88vw, (max-width: 1100px) 44vw, 640px"
                    unoptimized
                  />
                </span>
              </Link>
              <div className={styles.info}>
                <p className={styles.number}>{String(index + 1).padStart(2, "0")} / {project.category.slice(0, 1).join("")}</p>
                <h3 className={styles.title}>
                  <Link href={"/projects/" + project.slug}>{project.shortTitle}</Link>
                </h3>
                <p className={styles.description}>{project.overview}</p>
                <Link className={styles.readMore} href={"/projects/" + project.slug} aria-label={"Read " + project.shortTitle + " project details"}>
                  View case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </nav>

        <div className={styles.bottom}>
          <p>Also developed: CleanAid, a data-cleansing capstone project.</p>
          <Link href="/projects">All projects <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
