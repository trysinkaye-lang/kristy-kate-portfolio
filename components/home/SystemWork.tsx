import { getProject } from "@/data/projects";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import styles from "./work.module.css";

export function RBIMFeature() {
  const project = getProject("rbim");
  return (
    <article id="work-rbim" data-project="rbim" className={styles.rbim}>
      <div className="shell">
        <div className={styles.projectRegister}><span>01 / Flagship software</span><span>{project.status}</span></div>
        <div className={`${styles.rbimHeading} reveal`}>
          <h3>{project.shortTitle}</h3>
          <p>{project.headline}</p>
        </div>
        <div className={styles.rbimStage}>
          <div className={styles.rbimCopy}>
            <p className="eyebrow">Information system</p>
            <p>Offline-first population records for barangay workflows, reporting, certificates, and migration data.</p>
            <ProjectLinks project={project} />
          </div>
          <div className={styles.rbimScreen}><ProjectScreenshot project={project} /></div>
        </div>
      </div>
    </article>
  );
}

export function AHDISFeature() {
  const project = getProject("ahdis");
  return (
    <article id="work-ahdis" data-project="ahdis" className={`shell ${styles.ahdis}`}>
      <div className={styles.projectRegister}><span>03 / Information system</span><span>{project.status}</span></div>
      <div className={styles.ahdisGrid}>
        <div>
          <h3>{project.shortTitle}</h3>
          <p className={styles.projectStatement}>{project.headline}</p>
          <p className={styles.description}>Desktop adolescent health records and reporting, focused on the 10–19 program scope.</p>
          <ProjectLinks project={project} />
        </div>
        <div className={styles.analytical}>
          <ProjectScreenshot project={project} />
          <div className={styles.scope}><span>Program scope</span><strong>10–19</strong></div>
        </div>
      </div>
    </article>
  );
}
