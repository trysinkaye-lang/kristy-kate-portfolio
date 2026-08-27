"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { MagnetLite } from "@/components/react-bits/MagnetLite";
import { SpotlightCardLite } from "@/components/react-bits/SpotlightCardLite";
import { TiltCardLite } from "@/components/react-bits/TiltCardLite";

export function PortfolioShowcaseCarousel() {
  const softwareProjects = useMemo(
    () => projects.filter((project) => project.slug !== "design-systems"),
    [],
  );
  const [active, setActive] = useState(0);
  const dragStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    const count = softwareProjects.length;
    setActive(((index % count) + count) % count);
  };

  return (
    <div className="mt-12">
      <div
        className="portfolio-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured software projects"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(active - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(active + 1);
          }
        }}
        onPointerDown={(event) => {
          dragStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (dragStart.current === null) return;
          const delta = event.clientX - dragStart.current;
          dragStart.current = null;
          if (Math.abs(delta) < 55) return;
          goTo(active + (delta < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
      >
        <div className="portfolio-carousel-viewport">
          <div
            className="portfolio-carousel-track"
            style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
          >
            {softwareProjects.map((project, index) => (
              <article
                key={project.slug}
                className="portfolio-carousel-slide"
                aria-hidden={active !== index}
              >
                <div className="rb-electric-frame rounded-[2rem]">
                  <SpotlightCardLite className="rounded-[2rem]">
                    <div className="overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#0a0a0a]">
                      <div className="grid lg:grid-cols-[1.12fr_.88fr]">
                        <TiltCardLite className="rb-project-visual flex min-h-[340px] items-center justify-center border-b border-white/[.07] bg-[#0e0e0e] p-5 sm:min-h-[480px] sm:p-8 lg:min-h-[610px] lg:border-b-0 lg:border-r">
                          <img
                            src={project.image}
                            alt={`${project.shortTitle} interface`}
                            className="max-h-[550px] w-full rounded-xl object-contain"
                            draggable={false}
                          />
                        </TiltCardLite>

                        <div className="flex min-w-0 flex-col p-7 sm:p-10 lg:p-12">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs uppercase tracking-[.2em] text-zinc-600">{project.status}</span>
                            <span className="text-sm tabular-nums text-zinc-600">
                              {String(index + 1).padStart(2, "0")} / {String(softwareProjects.length).padStart(2, "0")}
                            </span>
                          </div>

                          <h3 className="mt-6 text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">
                            {project.shortTitle}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-zinc-500">{project.title}</p>
                          <p className="mt-7 leading-7 text-zinc-300">{project.overview}</p>

                          <div className="mt-8 border-t border-white/[.07] pt-7">
                            <p className="text-xs uppercase tracking-[.18em] text-zinc-600">Role</p>
                            <p className="mt-2 text-sm text-zinc-300">{project.role}</p>
                          </div>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.technologies.slice(0, 6).map((technology) => (
                              <span key={technology} className="v2-chip">{technology}</span>
                            ))}
                          </div>

                          <div className="mt-8">
                            <MagnetLite strength={0.12}>
                              <Link href={`/projects/${project.slug}`} className="v2-button v2-button-primary">
                                View case study <ArrowUpRight size={16} />
                              </Link>
                            </MagnetLite>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-10">
                            <div className="flex items-center gap-2" aria-label="Carousel pagination">
                              {softwareProjects.map((item, dotIndex) => (
                                <button
                                  key={item.slug}
                                  type="button"
                                  onClick={() => goTo(dotIndex)}
                                  aria-label={`Go to ${item.shortTitle}`}
                                  aria-current={active === dotIndex ? "true" : undefined}
                                  className={`portfolio-carousel-dot ${active === dotIndex ? "is-active" : ""}`}
                                />
                              ))}
                            </div>

                            <div className="flex gap-2">
                              <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous project" className="v2-arrow">
                                <ArrowLeft size={18} />
                              </button>
                              <button type="button" onClick={() => goTo(active + 1)} aria-label="Next project" className="v2-arrow">
                                <ArrowRight size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpotlightCardLite>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Choose project">
        {softwareProjects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => goTo(index)}
            className={`portfolio-carousel-selector ${active === index ? "is-active" : ""}`}
          >
            <span className="text-xs text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
            <span className="mt-2 block font-medium text-zinc-200">{project.shortTitle}</span>
            <span className="mt-1 block text-xs text-zinc-600">{project.category.slice(0, 2).join(" · ")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
