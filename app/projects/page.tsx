import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { projects, type Project } from "@/data/projects";
import styles from "./projects.module.css";

const systemProjects = projects.filter((project) => ["rbim", "ahdis", "erp-system"].includes(project.slug));
const websiteProjects = projects.filter((project) => ["co-designs-website", "marci-metzger-redesign", "lacomus-revamp"].includes(project.slug));
const designProjects = projects.filter((project) => ["design-systems"].includes(project.slug));

function LivePreview({ project }: { project: Project }) {
  if (!project.live) return null;

  const domain = project.live.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className={styles.preview}>
      <div className={styles.browserBar}>
        <div className={styles.dots} aria-hidden="true"><i /><i /><i /></div>
        <div className={styles.domain}>{domain}</div>
        <ExternalLink size={12} aria-hidden="true" />
      </div>
      <div className={styles.stage}>
        <iframe
          src={project.live}
          title={`${project.shortTitle} live website preview`}
          className={styles.frame}
          loading="lazy"
          tabIndex={-1}
        />
        <a className={styles.frameHit} href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.shortTitle} live website`} />
      </div>
    </div>
  );
}

function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        {project.live ? (
          <LivePreview project={project} />
        ) : (
          <TrackedLink
            href={`/projects/${project.slug}`}
            eventName="project_case_study_click"
            eventData={{ project: project.slug, source: "projects_visual" }}
            aria-label={`View ${project.shortTitle} case study`}
            className={styles.visualLink}
          >
            <ProjectScreenshot
              project={project}
              priority={priority}
              sizes="(max-width: 980px) calc(100vw - 56px), 52vw"
              constrainToSourceWidth={false}
              className="h-full border-0 bg-transparent shadow-none"
              imageClassName="w-full object-contain"
            />
          </TrackedLink>
        )}
      </div>

      <div className={styles.copy}>
        <div className={styles.meta}>
          <span className={styles.status}>{project.status}</span>
          {project.flagship ? <span>Flagship</span> : null}
          <span>•</span>
          <span>{project.category.slice(0, 2).join(" · ")}</span>
        </div>

        <h2 className={styles.title}>{project.shortTitle}</h2>
        <p className={styles.fullTitle}>{project.title}</p>
        <p className={styles.overview}>{project.overview}</p>

        <div className={styles.chips}>
          {project.highlights.map((item) => <span className="v2-chip" key={item}>{item}</span>)}
        </div>

        <div className={styles.facts}>
          <div>
            <span className={styles.factLabel}>Role</span>
            <p className={styles.role}>{project.role}</p>
          </div>
          <div>
            <span className={styles.factLabel}>Technology</span>
            <div className={styles.tech}>
              {project.technologies.slice(0, 5).map((item) => <span className="v2-chip" key={item}>{item}</span>)}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <TrackedLink
            href={`/projects/${project.slug}`}
            eventName="project_case_study_click"
            eventData={{ project: project.slug, source: "projects_cta" }}
            className={styles.caseLink}
          >
            View Case Study <ArrowRight size={16} />
          </TrackedLink>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" className={styles.liveLink}>
              Visit Live Site <ExternalLink size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProjectGroup({ kicker, title, description, items, first = false }: { kicker: string; title: string; description: string; items: Project[]; first?: boolean }) {
  return (
    <section className={styles.group}>
      <div className={styles.groupHeader}>
        <div>
          <p className="v2-kicker">{kicker}</p>
          <h2 className={styles.groupTitle}>{title}</h2>
        </div>
        <p className={styles.groupText}>{description}</p>
      </div>
      <div className={styles.list}>
        {items.map((project, index) => <ProjectCard project={project} key={project.slug} priority={first && index === 0} />)}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className={`portfolio-v2 ${styles.page}`}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className="v2-kicker">Selected work</p>
            <h1 className={styles.heroTitle}>Systems, websites, and interfaces built for real use.</h1>
          </div>
          <p className={styles.heroText}>
            A cleaner view of my strongest work across information systems, website design and development, and interface design—organized by what the project is meant to accomplish.
          </p>
        </header>

        <ProjectGroup
          kicker="Systems & applications"
          title="Operational software built around real workflows."
          description="Projects focused on structured data, day-to-day operations, reporting, validation, and usable interfaces."
          items={systemProjects}
          first
        />

        <ProjectGroup
          kicker="Website design & development"
          title="Web experiences shaped around each client and brand."
          description="Live website projects presented consistently, with direct access to the working site and a separate project case study."
          items={websiteProjects}
        />

        <ProjectGroup
          kicker="Interface & visual work"
          title="Design systems and digital interface work."
          description="Supporting design work focused on hierarchy, consistency, responsive layouts, and clear communication."
          items={designProjects}
        />

        <section className={styles.footerCta}>
          <h2 className={styles.footerTitle}>Have a system, website, or interface in mind?</h2>
          <Link href="/contact" className="v2-button v2-button-primary mt-8">Contact me <ArrowUpRight size={16} /></Link>
        </section>
      </div>
    </main>
  );
}
