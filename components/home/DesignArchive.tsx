import Image from "next/image";
import { getProject } from "@/data/projects";
import { ProjectFacts, ProjectLinks } from "@/components/projects/ProjectLinks";
import styles from "./work.module.css";
export function DesignArchive() {
  const project = getProject("design-systems");
  const items = [{ src: project.image, alt: project.imageAlt!, width: project.imageWidth, height: project.imageHeight, caption: "RBIM / record management & interface hierarchy" }, ...project.gallery!];
  return <article data-project="design-systems" className={`shell ${styles.archive}`}>
    <div className={styles.projectRegister}><span>07 / A design archive</span><span>Ongoing collection</span></div>
    <div className={styles.archiveHeading}><h3>INTERFACE &<br />DIGITAL DESIGN WORK</h3><p>Visual decisions behind working software. Dashboards, interface patterns, and information made easier to read.</p></div>
    <div className={styles.archiveRail} role="region" aria-label="Interface design archive — scroll to explore" tabIndex={0}>{items.map(item => <figure key={item.alt}><Image src={item.src} width={item.width} height={item.height} alt={item.alt} sizes="(max-width: 600px) 78vw, 420px" /><figcaption>{item.caption}</figcaption></figure>)}</div>
    <div className={styles.archiveBottom}><ProjectFacts project={project} /><ProjectLinks project={project} /></div>
  </article>;
}
