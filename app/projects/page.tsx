import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main id="main-content" className="portfolio-v2 projects-page min-h-screen pb-20 pt-36">
      <div className="portfolio-shell">
        <header className="projects-hero relative max-w-3xl pb-16 sm:pb-20">
          <div className="projects-color-rail" aria-hidden="true"><span /><span /><span /></div>
          <p className="v2-kicker projects-kicker">Selected work</p>
          <h1 className="projects-heading mt-5 text-[clamp(3.7rem,8vw,7rem)] font-semibold leading-[.9] tracking-[-.06em] text-white">My recent work</h1>
          <p className="projects-subtitle mt-7 max-w-2xl text-lg leading-8 text-zinc-500">Information systems, business applications, and interfaces I’m proud to have designed and developed.</p>
        </header>

        <div className="projects-list divide-y divide-white/[.09] border-y border-white/[.09]">
          {projects.map((project, index) => (
            <article key={project.slug} className={`project-editorial-row project-accent-${index % 3} grid gap-8 py-12 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-14 lg:py-20`}>
              <Link href={`/projects/${project.slug}`} className={`project-editorial-visual project-visual-shell group relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/[.09] ${index % 2 ? "lg:order-2" : ""}`}>
                <div className="project-visual-glow" aria-hidden="true" />
                <Image src={project.image} alt={`${project.shortTitle} interface`} fill className="project-interface-image object-contain p-4 transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 1024px) 100vw, 58vw" />
                <span className="project-open-button absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-xl transition group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={18} /></span>
              </Link>

              <div className={`project-copy ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="project-meta flex items-center gap-4 text-xs uppercase tracking-[.18em] text-zinc-600">
                  <span className="project-index">0{index + 1}</span>
                  <span className="project-meta-line h-px w-10 bg-white/10" />
                  <span className="project-status"><i aria-hidden="true" />{project.status}</span>
                </div>
                <h2 className="project-title mt-6 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">{project.shortTitle}</h2>
                <p className="project-full-title mt-4 text-sm font-medium text-zinc-400">{project.title}</p>
                <p className="project-overview mt-6 max-w-xl text-lg leading-8 text-zinc-500">{project.overview}</p>
                <p className="project-role mt-6 text-sm text-zinc-400">{project.role}</p>
                <div className="project-tech mt-6 flex flex-wrap gap-2">{project.technologies.slice(0, 6).map((item) => <span className="v2-chip" key={item}>{item}</span>)}</div>
                <Link href={`/projects/${project.slug}`} className="project-case-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3">View case study <ArrowRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>

        <section className="projects-cta py-24 text-center"><p className="v2-kicker">Let’s connect</p><h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Have a system, website, or interface in mind?</h2><Link href="/contact" className="v2-button v2-button-primary mt-8">Contact me <ArrowUpRight size={16} /></Link></section>
      </div>
    </main>
  );
}
