import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? { title: `${project.shortTitle} | Kristy Kate Taylor`, description: project.overview }
    : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main id="main-content" className="portfolio-v2 project-detail-page min-h-screen pb-20 pt-32">
      <div className="portfolio-shell">
        <Link
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          href="/projects"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        <section className="project-detail-intro mt-10 border-b border-white/[.09] pb-14 lg:pb-20">
          <div className="project-detail-copy">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[.18em] text-zinc-600">
              <span>0{projectIndex + 1}</span>
              <span className="h-px w-10 bg-white/10" />
              <span>{project.status}</span>
            </div>

            <h1 className="project-detail-title mt-7">{project.shortTitle}</h1>
            <p className="project-detail-full-title mt-6">{project.title}</p>
            <p className="project-detail-overview mt-7">{project.overview}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span className="v2-chip" key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <div className="project-detail-preview-shell">
            <div className="project-detail-window-bar" aria-hidden="true">
              <span /><span /><span />
              <small>{project.shortTitle} · interface preview</small>
            </div>
            <div className="project-detail-preview">
              <Image
                src={project.image}
                alt={`${project.title} interface screenshot`}
                fill
                priority
                unoptimized
                className="project-detail-image object-contain"
                sizes="(max-width: 1023px) 92vw, 760px"
              />
            </div>
            <p className="project-detail-preview-note">Interface preview · shown at a controlled size for clarity</p>
          </div>
        </section>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[.35fr_.65fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="v2-kicker">Project overview</p>
            <div className="mt-7 space-y-6 border-y border-white/[.09] py-6">
              <div>
                <span className="text-xs text-zinc-600">Role</span>
                <p className="mt-2 text-sm text-zinc-300">{project.role}</p>
              </div>
              <div>
                <span className="text-xs text-zinc-600">Category</span>
                <p className="mt-2 text-sm text-zinc-300">{project.category.join(" · ")}</p>
              </div>
              <div>
                <span className="text-xs text-zinc-600">Status</span>
                <p className="mt-2 text-sm text-zinc-300">{project.status}</p>
              </div>
            </div>
          </aside>

          <div className="space-y-16 sm:space-y-20">
            <CaseSection number="01" title="The challenge"><p>{project.problem}</p></CaseSection>
            <CaseSection number="02" title="The solution"><p>{project.solution}</p></CaseSection>
            <CaseSection number="03" title="Key features">
              <div className="case-feature-grid grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div className="case-feature flex gap-3 rounded-2xl border border-white/[.08] p-4" key={feature}>
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-black"><Check size={12} /></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CaseSection>
            <CaseSection number="04" title="Challenges and learning">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="v2-kicker">Challenges</p>
                  <ul className="mt-5 space-y-3">{project.challenges.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
                <div>
                  <p className="v2-kicker">Lessons</p>
                  <ul className="mt-5 space-y-3">{project.lessons.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
              </div>
            </CaseSection>
          </div>
        </div>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="next-project group mt-24 flex items-end justify-between gap-6 border-y border-white/[.09] py-12 sm:py-16"
        >
          <div>
            <p className="v2-kicker">Next project</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] text-white sm:text-6xl">{nextProject.shortTitle}</h2>
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/[.12] text-white transition group-hover:translate-x-2 group-hover:bg-white group-hover:text-black"><ArrowRight /></span>
        </Link>
      </div>
    </main>
  );
}

function CaseSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="case-editorial-section">
      <div className="flex items-center gap-4">
        <span className="text-xs text-zinc-600">{number}</span>
        <span className="h-px flex-1 bg-white/[.09]" />
      </div>
      <h2 className="mt-6 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">{title}</h2>
      <div className="mt-6 text-lg leading-8 text-zinc-400">{children}</div>
    </section>
  );
}
