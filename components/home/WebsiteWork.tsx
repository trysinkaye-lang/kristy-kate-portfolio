import Image from "next/image";
import { getProject } from "@/data/projects";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import styles from "./work.module.css";

export function ArchitectureFeature() {
  const project = getProject("co-designs");
  const detail = project.gallery![0];
  return (
    <article id="work-co-designs" data-project="co-designs" className={`shell ${styles.architecture}`}>
      <div className={styles.projectRegister}><span>02 / Architecture & creative development</span><span>{project.status}</span></div>
      <div className={`${styles.archHeading} reveal`}><h3>{project.shortTitle}</h3><p>{project.headline}</p></div>
      <div className={styles.archGrid}>
        <div className={styles.archSide}>
          <figure className={styles.archDetail}>
            <Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} sizes="(max-width: 767px) 38vw, 260px" />
          </figure>
          <p>Architecture, portfolio imagery, and a scroll-controlled construction study in one responsive site.</p>
          <ProjectLinks project={project} />
        </div>
        <div className={styles.archPhoto}>
          <ProjectScreenshot project={project} sizes="(max-width: 767px) 92vw, 70vw" />
        </div>
      </div>
    </article>
  );
}

export function RealEstateFeature() {
  const project = getProject("marci-metzger");
  const landscape = project.gallery![1];
  return (
    <article id="work-marci-metzger" data-project="marci-metzger" className={styles.marci}>
      <div className="shell">
        <div className={styles.projectRegister}><span>04 / Real-estate website</span><span>{project.status}</span></div>
        <div className={styles.marciHero}>
          <figure className={styles.marciLandscape}>
            <Image src={landscape.src} width={landscape.width} height={landscape.height} alt={landscape.alt} sizes="(max-width: 767px) 92vw, 92vw" />
          </figure>
          <div className={styles.marciOverlay}>
            <p>{project.headline}</p>
            <h3>{project.shortTitle}</h3>
          </div>
          <div className={styles.marciFloatingScreen}>
            <ProjectScreenshot project={project} sizes="(max-width: 767px) 82vw, 42vw" />
          </div>
        </div>
        <div className={styles.marciFooter}>
          <p>A photography-led redesign with clearer paths for buyers, sellers, and local property discovery.</p>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
