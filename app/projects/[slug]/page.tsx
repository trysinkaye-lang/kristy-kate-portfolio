import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publicProjects } from "@/data/projects";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { ImageInspector } from "@/components/projects/ImageInspector";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import styles from "@/styles/case-study.module.css";

// Reject unpublished project slugs with an actual HTTP 404, including direct requests.
export const dynamicParams = false;

export function generateStaticParams() {
  return publicProjects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = publicProjects.find(item => item.slug === slug);
  return project
    ? pageMetadata(project.shortTitle, project.overview, `/projects/${slug}`, {
        url: project.image,
        width: project.imageWidth,
        height: project.imageHeight,
        alt: project.imageAlt ?? `${project.shortTitle} interface`,
      })
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = publicProjects.findIndex(item => item.slug === slug);
  if (index < 0) notFound();

  const project = publicProjects[index];
  const next = publicProjects[(index + 1) % publicProjects.length];
  const indexLabel = String(index + 1).padStart(2, "0");
  const totalLabel = String(publicProjects.length).padStart(2, "0");

  return (
    <main id="main-content" tabIndex={-1} className={styles.caseStudy} data-case={slug}>
      <header className={["shell", styles.intro].join(" ")}>
        <div className={styles.breadcrumb}>
          <Link href="/projects" className={styles.back}>← Projects</Link>
          <span>Project {indexLabel} / {totalLabel}</span>
        </div>

        <div className={styles.titleLine}>
          <div>
            <p className={styles.category}>{project.category.slice(0, 2).join(" / ")}</p>
            <h1>{project.shortTitle}</h1>
          </div>
          <p className={styles.year}>{project.year ?? "Portfolio"} <span>/</span> {project.status}</p>
        </div>
        <p className={styles.summary}>{project.overview}</p>
      </header>

      <div className={styles.visual} aria-label={project.shortTitle + " project screenshot"}>
        <div className="shell">
          <ProjectScreenshot project={project} priority sizes="(max-width: 767px) 88vw, 760px" />
        </div>
      </div>

      <section className={["shell", styles.details].join(" ")} aria-labelledby="details-title">
        <div className={styles.detailsIntro}>
          <p className={styles.marker}>01 / Project</p>
          <h2 id="details-title">The details.</h2>
          <p>{project.solution}</p>
          <ProjectLinks project={project} source="case_study" caseStudy={false} />
        </div>
        <dl className={styles.facts}>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Category</dt><dd>{project.category.slice(0, 2).join(" / ")}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Technology</dt><dd>{project.technologies.join(" / ")}</dd></div>
        </dl>
      </section>

      <section className={["shell", styles.story].join(" ")} aria-label="Project functionality">
        <div className={styles.storyHeader}>
          <p className={styles.marker}>02 / Functionality</p>
          <h2>What it does</h2>
        </div>
        <ol className={styles.features}>
          {project.features.slice(0, 8).map((feature, i) => (
            <li key={feature}><span>{String(i + 1).padStart(2, "0")}</span><p>{feature}</p></li>
          ))}
        </ol>
      </section>

      {project.gallery?.length ? (
        <section className={styles.galleryBlock} aria-label="More project imagery">
          <div className="shell">
            <div className={styles.galleryHead}>
              <p className={styles.marker}>03 / Details</p>
              <h2>Inside the project</h2>
            </div>
            <div className={styles.galleryGrid}>
              {project.gallery.map(item => (
                <figure key={item.src} className={styles.gallery}>
                  <ImageInspector src={item.src} width={item.width} height={item.height} alt={item.alt}>
                    <Image src={item.src} width={item.width} height={item.height} alt={item.alt}
                      sizes="(max-width: 767px) 88vw, 520px" />
                  </ImageInspector>
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {project.architecture?.length ? (
        <section className={["shell", styles.technical].join(" ")} aria-labelledby="technical-heading">
          <div>
            <p className={styles.marker}>Engineering</p>
            <h2 id="technical-heading">How it works</h2>
          </div>
          <div className={styles.architecture}>
            {project.architecture.map(item => (
              <div key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={["shell", styles.outcome].join(" ")} aria-labelledby="outcome-heading">
        <div>
          <p className={styles.marker}>Outcome</p>
          <h2 id="outcome-heading">Project results</h2>
        </div>
        <div>
          {project.impact.slice(0, 2).map(item => <p key={item}>{item}</p>)}
        </div>
      </section>

      <nav className={["shell", styles.next].join(" ")} aria-label="Next project">
        <p className={styles.marker}>Next / {String((index + 1) % publicProjects.length + 1).padStart(2, "0")}</p>
        <TrackedLink href={`/projects/${next.slug}`} eventName="project_open"
          eventData={{ source: "next_project", project: next.slug }}>
          <span>{next.shortTitle}</span><span aria-hidden="true">↗</span>
        </TrackedLink>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "CreativeWork",
        name: project.title, description: project.overview,
        url: `${site.url}/projects/${project.slug}`,
        creator: { "@type": "Person", name: site.name, url: site.url },
        image: `${site.url}${project.image}`,
        keywords: project.technologies.join(", ")
      }).replace(/</g, "\\u003c") }} />
    </main>
  );
}
