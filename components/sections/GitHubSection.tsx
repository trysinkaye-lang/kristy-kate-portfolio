import { Github, LockKeyhole, ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export function GitHubSection() {
  return (
    <section className="section-wrap" aria-labelledby="github-heading">
      <div id="github-heading">
        <SectionTitle
          eyebrow="GitHub / development activity"
          title="Code when it can be public. Case studies when it cannot."
          copy="Some system repositories may be private, so the portfolio is designed to show verified project context without exposing confidential source code."
        />
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <a className="service-card group" href={site.github} target="_blank" rel="noreferrer">
          <Github size={28} />
          <h3 className="mt-5 text-2xl font-semibold text-white">trysinkaye-lang</h3>
          <p className="mt-3 max-w-md leading-7 text-slate-400">Open the GitHub profile for repositories and development activity that are safe to share publicly.</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300">View GitHub profile <ArrowUpRight size={15}/></span>
        </a>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.slice(0,2).map(project => (
            <div className="stack-card" key={project.slug}>
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">Featured system</p>
                <LockKeyhole size={16} className="text-slate-500" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{project.shortTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{project.overview}</p>
              <p className="mt-5 text-xs text-slate-500">Repository link intentionally omitted unless the project is confirmed public.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
