import Image from "next/image";
import Link from "next/link";
import { publicProjects } from "@/data/projects";
import styles from "./SelectedWork.module.css";

const featured = ["rbim", "ahdis", "co-designs", "marci-metzger"] as const;
const featuredProjects = featured.flatMap(slug => publicProjects.filter(project => project.slug === slug));

export function ProjectDriftWall() {
  return (
    <div className={styles.section}>
      <nav className={styles.gallery} aria-label="Projects gallery">
        {featuredProjects.map((project,index) => (
          <article className={styles.project} key={project.slug}>
            <span className={styles.number}>{String(index + 1).padStart(2,"0")}</span>
            <div className={styles.copy}>
              <p className={styles.category}>{project.category[0]}</p>
              <h3><Link href={"/projects/" + project.slug}>{project.shortTitle}</Link></h3>
              <p className={styles.description}>{project.overview}</p>
              <Link className={styles.read} href={"/projects/" + project.slug}
                aria-label={"View " + project.shortTitle + " project"}>
                View project <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <Link className={styles.preview} href={"/projects/" + project.slug}
              aria-label={"Explore " + project.shortTitle}>
              <Image src={project.image}
                alt={project.imageAlt ?? project.shortTitle + " interface preview"}
                width={project.imageWidth} height={project.imageHeight}
                sizes="(max-width: 767px) 36vw, 270px" unoptimized />
            </Link>
          </article>
        ))}
      </nav>
      <div className={styles.end}>
        <p>More in the archive: ERP System and other development work.</p>
        <Link href="/projects">All projects <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  );
}
