import { getProject } from "@/data/projects";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { ProjectFacts, ProjectLinks } from "@/components/projects/ProjectLinks";
import styles from "./work.module.css";

export function RBIMFeature() {
  const project = getProject("rbim");
  return <article data-project="rbim" className={styles.rbim}>
    <div className="shell">
      <div className={styles.projectRegister}><span>01 / Flagship software</span><span>{project.status}</span></div>
      <div className={styles.rbimHeading}><h3>{project.shortTitle}</h3><p>{project.headline}</p></div>
      <div className={styles.rbimStage}>
        <div className={styles.rbimCopy}><p className="eyebrow">Registry of Barangay<br />Inhabitants and Migrants</p><p>{project.overview}</p><ProjectLinks project={project} /></div>
        <div className={styles.rbimScreen}><ProjectScreenshot project={project} /></div>
      </div>
      <div className={styles.systemRegister}>{project.architecture?.map(item => <div key={item.title}><h4>{item.title}</h4><p>{item.detail}</p></div>)}</div>
      <ProjectFacts project={project} />
    </div>
  </article>;
}
export function AHDISFeature() {
  const project = getProject("ahdis");
  return <article data-project="ahdis" className={`shell ${styles.ahdis}`}>
    <div className={styles.projectRegister}><span>03 / Information system</span><span>{project.status}</span></div>
    <div className={styles.ahdisGrid}>
      <div><h3>{project.shortTitle}</h3><p className={styles.projectStatement}>{project.headline}</p><p className={styles.description}>{project.overview}</p><ProjectFacts project={project} /><ProjectLinks project={project} /></div>
      <div className={styles.analytical}><p className="eyebrow">Profiles → insights → reports</p><ProjectScreenshot project={project} /><div className={styles.scope}><span>Program scope</span><strong>10–19</strong><p>Age-aware adolescent reporting.<br />Local records. Clear boundaries.</p></div></div>
    </div>
  </article>;
}
export function ERPFeature() {
  const project = getProject("erp-system");
  return <article data-project="erp-system" className={styles.erp}><div className="shell">
    <div className={styles.projectRegister}><span>06 / Business information system</span><span>{project.status}</span></div>
    <div className={styles.erpGrid}><div><h3>ERP SYSTEM</h3><p className={styles.projectStatement}>{project.headline}</p><p className={styles.description}>{project.overview}</p><ProjectFacts project={project} /><ProjectLinks project={project} /></div><ProjectScreenshot project={project} /></div>
    <p className={styles.operations}>{["Sales & expenses", "Inventory & purchasing", "HR & payroll", "Accounting & reports"].map(item => <span key={item}>{item}</span>)}</p>
  </div></article>;
}
