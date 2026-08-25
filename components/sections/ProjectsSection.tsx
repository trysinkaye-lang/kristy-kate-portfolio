"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="section-wrap">
      <SectionTitle
        eyebrow="Featured software projects"
        title="Systems I’ve built"
        copy="Browse real interfaces from RBIM, AHDIS, an ERP business system, and additional design work. Each project focuses on a real workflow, clear data, and usable software."
      />

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.03] shadow-2xl shadow-black/20">
        <div className="grid lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-slate-950 sm:min-h-[380px] lg:min-h-[520px]">
            <img
              src={project.image}
              alt={`${project.title} interface screenshot`}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              {project.category.slice(0, 3).map((category) => (
                <span className="tag backdrop-blur" key={category}>{category}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {project.status}
            </p>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-5 leading-7 text-slate-300">{project.overview}</p>
            <p className="mt-5 text-sm text-slate-400">
              <span className="text-slate-200">Role:</span> {project.role}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
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

            <div className="mt-auto pt-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2" aria-label="Project carousel navigation">
                  {projects.map((item, index) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Show ${item.shortTitle}`}
                      aria-current={index === active ? "true" : undefined}
                      className={`h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-cyan-300" : "w-2.5 bg-white/25 hover:bg-white/50"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="secondary-cta !px-3"
                    onClick={() => move(-1)}
                    aria-label="Previous project"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="secondary-cta !px-3"
                    onClick={() => move(1)}
                    aria-label="Next project"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
