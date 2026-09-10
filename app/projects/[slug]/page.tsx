import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "@/styles/case-study.module.css";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return project ? pageMetadata(project.shortTitle, project.overview, `/projects/${slug}`) : { title: "Project not found" };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(item => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return <main id="main-content" tabIndex={-1} className={styles.caseStudy} data-case={slug}>
    <header className={`shell ${styles.intro}`}>
      <Link href="/projects" className={styles.back}>← All work</Link>
      <div className={styles.register}><p className="eyebrow">{project.category.join(" / ")}</p><span>{project.status}</span></div>
      <h1>{project.shortTitle}</h1>
      <div className={styles.introCopy}><h2>{project.headline}</h2><div><p>{project.overview}</p><ProjectLinks project={project} source="case_study" caseStudy={false} /></div></div>
      <dl className={styles.facts}><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>{project.year ? "Year / status" : "Status"}</dt><dd>{project.year ? `${project.year} / ` : ""}{project.status}</dd></div><div><dt>Selected technology</dt><dd>{project.technologies.join(" / ")}</dd></div></dl>
    </header>
    <div className={styles.visual}><div className="shell"><ProjectScreenshot project={project} priority sizes={`(max-width: 767px) 88vw, ${project.imageWidth}px`} /></div></div>
    <div className={`shell ${styles.body}`}><aside className={styles.contents}><p className="eyebrow">Inside the project</p><nav aria-label="Case study contents"><a href="#context">Context & problem</a><a href="#approach">The approach</a><a href="#workflows">Key workflows</a>{project.architecture ? <a href="#architecture">Technical decisions</a> : null}<a href="#outcome">Outcome</a><a href="#reflection">Challenges & learning</a></nav></aside>
      <div className={styles.narrative}>
        <section id="context"><p className="eyebrow">Context & problem</p><h2>{project.title}</h2><p>{project.problem}</p></section>
        <section id="approach"><p className="eyebrow">Design & development</p><h2>A considered approach.</h2><p>{project.solution}</p></section>
        <section id="workflows"><p className="eyebrow">Inside the experience</p><h2>Key workflows & features.</h2><ul className={styles.features}>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>
        {project.architecture ? <section id="architecture"><p className="eyebrow">The engineering</p><h2>Structure behind the screen.</h2><div className={styles.architecture}>{project.architecture.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div></section> : null}
        {project.gallery?.map(item => <figure key={item.src} className={styles.gallery} style={{ maxWidth: item.width }}><Image src={item.src} width={item.width} height={item.height} alt={item.alt} sizes="(max-width: 767px) 88vw, 680px" /><figcaption>{item.caption}</figcaption></figure>)}
        <section id="outcome"><p className="eyebrow">{project.status === "Work in progress" ? "Current state" : "Outcome"}</p><h2>What the work makes possible.</h2>{project.impact.map(item => <p key={item}>{item}</p>)}</section>
        <section id="reflection"><p className="eyebrow">Reflection</p><h2>Challenges & learning.</h2><div className={styles.reflection}><div><h3>The challenges</h3><ul>{project.challenges.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>What I learned</h3><ul>{project.lessons.map(item => <li key={item}>{item}</li>)}</ul></div></div></section>
      </div>
    </div>
    <div className={`shell ${styles.next}`}><p className="eyebrow">Continue exploring</p><TrackedLink href={`/projects/${next.slug}`} eventName="project_open" eventData={{ source: "next_project", project: next.slug }}><h2>{next.shortTitle}</h2><span aria-hidden="true">↗</span></TrackedLink></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.overview, url: `${site.url}/projects/${project.slug}`, creator: { "@type": "Person", name: site.name, url: site.url }, image: `${site.url}${project.image}`, keywords: project.technologies.join(", ") }).replace(/</g, "\\u003c") }} />
  </main>;
}
