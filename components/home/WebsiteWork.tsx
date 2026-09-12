import Image from "next/image";
import { getProject } from "@/data/projects";
import { ProjectFacts, ProjectLinks } from "@/components/projects/ProjectLinks";
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
          <figure><Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} sizes="(max-width: 767px) 34vw, 200px" /><figcaption>Interior imagery from the studio.</figcaption></figure>
          <p>{project.overview}</p>
          <ProjectFacts project={project} /><ProjectLinks project={project} />
        </div>
        <div className={styles.archPhoto}><ProjectScreenshot project={project} sizes="(max-width: 767px) 90vw, 65vw" /><p className={styles.imageNote}><span>Development detail</span>A scroll-controlled construction sequence, with an accessible static fallback.</p></div>
      </div>
    </article>
  );
}

export function RealEstateFeature() {
  const project = getProject("marci-metzger");
  const detail = project.gallery![0];
  return (
    <article id="work-marci-metzger" data-project="marci-metzger" className={styles.marci}>
      <div className="shell">
        <div className={styles.projectRegister}><span>04 / Real-estate website</span><span>{project.status}</span></div>
        <div className={`${styles.marciHeading} reveal`}><p>{project.headline}</p><h3>{project.shortTitle}</h3></div>
        <div className={styles.marciPresentation}>
          <ProjectScreenshot project={project} sizes="(max-width: 900px) 90vw, 65vw" />
          <div className={styles.marciDetails}>
            <p className={styles.description}>{project.overview}</p>
            <ProjectFacts project={project} /><ProjectLinks project={project} />
            <figure><Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} sizes="(max-width: 900px) 180px, 240px" /><figcaption>Original buyer-focused project imagery.</figcaption></figure>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BrandFeature() {
  const project = getProject("lacomus");
  const detail = project.gallery![0];
  return (
    <article id="work-lacomus" data-project="lacomus" className={`shell ${styles.lacomus}`}>
      <div className={styles.projectRegister}><span>05 / Brand & product experience</span><span>{project.status}</span></div>
      <div className={`${styles.lacomusHeading} reveal`}><div><p className={styles.ongoing}>An ongoing study</p><h3>{project.shortTitle}</h3></div><p className={styles.projectStatement}>A quieter kind<br />of presence.</p></div>
      <div className={styles.lacomusGrid}>
        <div><ProjectScreenshot project={project} sizes="(max-width: 767px) 90vw, 65vw" /></div>
        <div className={styles.lacomusDetails}>
          <figure><Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} sizes="(max-width: 767px) 32vw, 180px" /><figcaption>Existing Lacomus campaign imagery.</figcaption></figure>
          <p className={styles.description}>{project.overview}</p>
          <ProjectFacts project={project} /><ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
