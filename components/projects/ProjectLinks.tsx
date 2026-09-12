import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Project } from "@/data/projects";
import styles from "./projects.module.css";
export function ProjectLinks({ project, source = "home", caseStudy = true }: { project: Project; source?: string; caseStudy?: boolean }) {
  return <div className={styles.links}>
    {caseStudy ? <TrackedLink href={`/projects/${project.slug}`} eventName="project_open" eventData={{ project: project.slug, source }} className="text-link" aria-label={`Read ${project.shortTitle} case study`}>Case study <span aria-hidden="true">↗</span></TrackedLink> : null}
    {project.live ? <TrackedLink href={project.live} eventName="live_project_open" eventData={{ project: project.slug, source }} target="_blank" rel="noreferrer" className="text-link" aria-label={`Open ${project.shortTitle} live site (new tab)`}>Live {project.status === "Deployed redesign" ? "site" : "preview"} <span aria-hidden="true">↗</span></TrackedLink> : null}
    {project.github ? <TrackedLink href={project.github} eventName="github_open" eventData={{ project: project.slug, source }} target="_blank" rel="noreferrer" className={styles.sourceLink} aria-label={`View ${project.shortTitle} on GitHub (new tab)`}>GitHub</TrackedLink> : null}
  </div>;
}
export function ProjectFacts({ project }: { project: Project }) {
  return <div className={styles.facts}><p>{project.role}</p><p>{project.technologies.join(" / ")}</p></div>;
}
