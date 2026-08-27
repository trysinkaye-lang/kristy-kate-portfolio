"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ProjectsSection() {
  const softwareProjects = useMemo(
    () => projects.filter((project) => project.slug !== "design-systems"),
    [],
  );
  const [active, setActive] = useState(0);
  const project = softwareProjects[active] ?? softwareProjects[0];

  return (
    <section id="projects" className="section-wrap border-t border-white/6">
      <SectionTitle
        eyebrow="Featured projects"
        title="Systems I have designed and developed"
        copy="A focused look at RBIM, AHDIS, and the ERP system — including the real interfaces, technologies, responsibilities, and case studies behind each project."
      />

      <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Featured projects">
        {softwareProjects.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === index
                ? "border-white bg-white text-slate-950"
                : "border-white/10 bg-white/[.025] text-slate-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {item.shortTitle}
          </button>
        ))}
      </div>

      <article className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#070b12]">
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="flex min-h-[300px] items-center justify-center border-b border-white/8 bg-[#0a0f18] p-4 sm:min-h-[420px] sm:p-6 lg:min-h-[540px] lg:border-b-0 lg:border-r">
            <img
              src={project.image}
              alt={`${project.shortTitle} system interface`}
              className="max-h-[500px] w-full rounded-xl object-contain shadow-2xl shadow-black/30"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{project.status}</span>
            </div>

            <h3 className="mt-4 text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-5 leading-7 text-slate-300">{project.overview}</p>

            <div className="mt-7 border-t border-white/8 pt-6">
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-1 text-sm font-medium text-slate-200">{project.role}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.slice(0, 7).map((technology) => (
                <span className="tech-chip" key={technology}>{technology}</span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="primary-cta" href={`/projects/${project.slug}`}>
                View Case Study <ArrowUpRight size={16} />
              </Link>
              {project.github && (
                <a className="secondary-cta" href={project.github} target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {softwareProjects.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setActive(index)}
            className={`rounded-2xl border p-4 text-left transition ${
              active === index
                ? "border-white/20 bg-white/[.06]"
                : "border-white/8 bg-white/[.02] hover:bg-white/[.04]"
            }`}
          >
            <span className="text-sm font-semibold text-white">{item.shortTitle}</span>
            <span className="mt-1 block text-xs leading-5 text-slate-500">{item.category.slice(0, 2).join(" · ")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
