"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import DepthCarousel from "@/components/react-bits/DepthCarousel";
import { projects } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ProjectsSection() {
  const softwareProjects = useMemo(
    () => projects.filter((project) => project.slug !== "design-systems"),
    [],
  );
  const [active, setActive] = useState(0);
  const project = softwareProjects[active] ?? softwareProjects[0];
  const items = useMemo(
    () => softwareProjects.map((item) => ({ image: item.image, alt: `${item.shortTitle} interface screenshot` })),
    [softwareProjects],
  );

  return (
    <section id="projects" className="section-wrap">
      <SectionTitle
        eyebrow="Featured software projects"
        title="My projects"
        copy="Explore RBIM, AHDIS, and the ERP system through an interactive project carousel. Each project includes its real interface screenshot, role, technologies, and case study."
      />

      <div className="mt-10 grid items-stretch gap-8 xl:grid-cols-[1.18fr_.82fr]">
        <div className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.025] p-3 sm:p-5">
          <div className="h-[430px] sm:h-[520px] lg:h-[600px]">
            <DepthCarousel
              items={items}
              cardWidth={520}
              cardHeight={330}
              depth={220}
              spread={105}
              tilt={16}
              perspective={1500}
              visibleCards={3}
              falloff={0.14}
              blur={2}
              loop
              showControls
              showIndicators
              onChange={(index: any) => setActive(index)}
            />
          </div>
        </div>

        <article className="glass-card flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            {project.category.slice(0, 3).map((category) => (
              <span className="tag" key={category}>{category}</span>
            ))}
          </div>

          <p className="eyebrow mt-6">
            {String(active + 1).padStart(2, "0")} / {String(softwareProjects.length).padStart(2, "0")} · {project.status}
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
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

          <div className="mt-auto pt-8 text-sm text-slate-500">
            Drag, scroll, use the arrows, or use the dots to move between projects.
          </div>
        </article>
      </div>
    </section>
  );
}
