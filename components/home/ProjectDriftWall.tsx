import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./SelectedWork.module.css";

const featuredSlugs = ["rbim", "ahdis", "co-designs", "marci-metzger"] as const;
const featuredProjects = featuredSlugs.flatMap(slug => projects.filter(project => project.slug === slug));

export function ProjectDriftWall() {
  return (
    <section className={styles.section} aria-labelledby="featured-work-title" data-motion-section>
      <div className="shell">
        <div className={styles.top}>
          <div>
            <p className={styles.label}>Real projects / real problem-solving</p>
            <h3 id="featured-work-title">From systems to screens.</h3>
          </div>
          <Link href="/projects" className={styles.viewAll}>View all projects <span aria-hidden="true">↗</span></Link>
        </div>

        <nav className={styles.gallery} aria-label="Selected projects gallery">
          {featuredProjects.map((project, index) => (
            <article className={styles.card} key={project.slug} data-project>
              <Link className={styles.imageLink} href={"/projects/" + project.slug} aria-label={"View " + project.shortTitle + " case study"} data-spotlight>
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
                <div>
                  <p className={styles.number}>{String(index + 1).padStart(2, "0")} / {project.category.slice(0, 2).join(" · ")} · {project.status}</p>
                  <h4 className={styles.title}>
                    <Link href={"/projects/" + project.slug}>{project.shortTitle}</Link>
                  </h4>
                  <p className={styles.description}>{project.overview}</p>
                  <div className={styles.tags} aria-label={project.shortTitle + " technologies"}>
                    {project.technologies.slice(0, 4).map(technology => <span key={technology}>{technology}</span>)}
                  </div>
                </div>
                <Link className={styles.arrow} href={"/projects/" + project.slug} aria-label={"Read " + project.shortTitle + " project details"}>↗</Link>
              </div>
            </article>
          ))}
        </nav>

        <div className={styles.note}>
          <p><strong>Also in my toolkit:</strong> CleanAid, a data-cleansing capstone project built around improving data quality.</p>
          <Link href="/about">More about my approach ↗</Link>
        </div>
      </div>
    </section>
  );
}
