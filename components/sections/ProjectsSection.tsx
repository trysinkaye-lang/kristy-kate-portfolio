"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function ProjectsSection() {
  const softwareProjects = useMemo(
    () => projects.filter((project) => project.slug !== "design-systems"),
    [],
  );
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const count = softwareProjects.length;

  const goTo = (index: number) => {
    setActive(((index % count) + count) % count);
  };

  const goPrevious = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  const relativePosition = (index: number) => {
    let position = index - active;
    if (position > count / 2) position -= count;
    if (position < -count / 2) position += count;
    return position;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;

    if (Math.abs(distance) < 55) return;
    if (distance < 0) goNext();
    else goPrevious();
  };

  return (
    <section id="projects" className="section-wrap border-t border-white/6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Featured projects"
          title="Portfolio showcase"
          copy="Swipe or use the controls to explore RBIM, AHDIS, and the ERP system. Each project keeps its real interface, role, technologies, and case study in focus."
        />

        <div className="flex items-center gap-3" aria-label="Project carousel controls">
          <button
            type="button"
            onClick={goPrevious}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.025] text-white transition hover:border-white/25 hover:bg-white/[.06]"
            aria-label="Previous project"
          >
            <ArrowLeft size={18} />
          </button>
          <p className="min-w-14 text-center text-sm tabular-nums text-slate-500">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={goNext}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.025] text-white transition hover:border-white/25 hover:bg-white/[.06]"
            aria-label="Next project"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        className="relative mt-10 min-h-[720px] overflow-hidden sm:min-h-[760px] lg:min-h-[610px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Software projects"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goPrevious();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goNext();
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        {softwareProjects.map((project, index) => {
          const position = relativePosition(index);
          const isActive = position === 0;
          const isNeighbor = Math.abs(position) === 1;

          let transform = "translateX(0) scale(1)";
          let opacity = 1;
          let zIndex = 20;

          if (position === -1) {
            transform = "translateX(-86%) scale(.92)";
            opacity = 0.38;
            zIndex = 10;
          } else if (position === 1) {
            transform = "translateX(86%) scale(.92)";
            opacity = 0.38;
            zIndex = 10;
          } else if (!isActive) {
            transform = position < 0 ? "translateX(-120%) scale(.88)" : "translateX(120%) scale(.88)";
            opacity = 0;
            zIndex = 0;
          }

          return (
            <article
              key={project.slug}
              aria-hidden={!isActive}
              className="absolute left-1/2 top-0 w-[94%] -translate-x-1/2 overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#070b12] transition-[transform,opacity] duration-500 ease-out sm:w-[90%] lg:w-[84%]"
              style={{
                transform: `translateX(-50%) ${transform}`,
                opacity,
                zIndex,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <div className="grid lg:grid-cols-[1.15fr_.85fr]">
                <div className="flex min-h-[300px] items-center justify-center border-b border-white/8 bg-[#0a0f18] p-4 sm:min-h-[390px] sm:p-6 lg:min-h-[560px] lg:border-b-0 lg:border-r">
                  <img
                    src={project.image}
                    alt={`${project.shortTitle} system interface`}
                    className="max-h-[500px] w-full rounded-xl object-contain shadow-2xl shadow-black/30"
                    draggable={false}
                  />
                </div>

                <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="eyebrow">{project.status}</span>
                    <span className="text-xs text-slate-600">{project.category.slice(0, 2).join(" · ")}</span>
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

                  <p className="mt-auto pt-8 text-xs leading-5 text-slate-600">
                    Swipe on touch screens or use the arrows to move between projects.
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Choose project">
        {softwareProjects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => goTo(index)}
            className={`group flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
              active === index
                ? "border-white/20 bg-white/[.08] text-white"
                : "border-white/8 bg-transparent text-slate-500 hover:border-white/15 hover:text-slate-300"
            }`}
          >
            <span
              className={`h-1.5 rounded-full transition-all ${active === index ? "w-5 bg-white" : "w-1.5 bg-slate-600 group-hover:bg-slate-400"}`}
            />
            {project.shortTitle}
          </button>
        ))}
      </div>
    </section>
  );
}
