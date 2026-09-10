import Image from "next/image";
import { getProject } from "@/data/projects";
import { ProjectFacts, ProjectLinks } from "@/components/projects/ProjectLinks";
import styles from "./work.module.css";

export function ArchitectureFeature() {
  const project = getProject("co-designs");
  const detail = project.gallery![0];
  const preview = project.gallery![1];

  return (
    <article data-project="co-designs" className={styles.architecture}>
      <div className={`shell ${styles.projectRegister}`}>
        <span>02 / Architecture & creative development</span>
        <span>{project.status}</span>
      </div>

      <div className={`shell ${styles.archHeading}`}>
        <h3>{project.shortTitle}</h3>
        <p>{project.headline}</p>
      </div>

      <div className={styles.archScene}>
        <p className={styles.archGhost} aria-hidden="true">SPACE / CODE</p>

        <figure className={styles.archHeroImage}>
          <Image src={project.image} width={project.imageWidth} height={project.imageHeight} alt={project.imageAlt!} sizes="(max-width: 767px) 92vw, 68vw" />
          <figcaption>Project imagery from C.O. Designs.</figcaption>
        </figure>

        <figure className={styles.archDetailImage}>
          <Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} sizes="(max-width: 767px) 42vw, 28vw" />
          <figcaption>Material. Light. Proportion.</figcaption>
        </figure>

        <figure className={styles.archPreviewImage}>
          <Image src={preview.src} width={preview.width} height={preview.height} alt={preview.alt} sizes="(max-width: 767px) 62vw, 34vw" />
          <figcaption>Actual development preview.</figcaption>
        </figure>
      </div>

      <div className={`shell ${styles.archClosing}`}>
        <p className={styles.archStatement}>Architecture is already about movement through space. The website should feel that way too.</p>
        <div className={styles.archCopy}>
          <p>{project.overview}</p>
          <ProjectFacts project={project} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function RealEstateFeature() {
  const project = getProject("marci-metzger");
  const detail = project.gallery![0];
  return <article data-project="marci-metzger" className={styles.marci}><div className="shell">
    <div className={styles.projectRegister}><span>04 / Real-estate website</span><span>{project.status}</span></div>
    <div className={styles.marciHeading}><p>{project.headline}</p><h3>{project.shortTitle}</h3></div>
    <figure className={styles.marciLandscape}><Image src={project.image} width={project.imageWidth} height={project.imageHeight} alt={project.imageAlt!} sizes="90vw" /><figcaption>Original imagery from the deployed redesign.</figcaption></figure>
    <div className={styles.marciBottom}><div><p className={styles.description}>{project.overview}</p><ProjectFacts project={project} /><ProjectLinks project={project} /></div><Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} sizes="(max-width: 767px) 36vw, 300px" /></div>
  </div></article>;
}

export function BrandFeature() {
  const project = getProject("lacomus");
  return <article data-project="lacomus" className={`shell ${styles.lacomus}`}>
    <div className={styles.projectRegister}><span>05 / Brand & product experience</span><span>{project.status}</span></div>
    <div className={styles.lacomusGrid}><figure><Image src="/media/lacomus-product.webp" width={800} height={1200} alt="Lacomus Pour Homme fragrance beside coffee and a laptop, from the actual project" sizes="(max-width: 767px) 72vw, 400px" /><figcaption>Product imagery from the current Lacomus project.</figcaption></figure><div><p className={styles.ongoing}>An ongoing study</p><h3>{project.shortTitle}</h3><p className={styles.projectStatement}>A quieter kind<br />of presence.</p><p className={styles.description}>{project.overview}</p><ProjectFacts project={project} /><ProjectLinks project={project} /></div></div>
  </article>;
}
