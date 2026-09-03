"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

export function ProjectStoryList() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".project-story-row", root);

      rows.forEach((row) => {
        const frame = row.querySelector<HTMLElement>(".project-story-frame");
        const copy = row.querySelector<HTMLElement>(".project-story-copy");

        gsap.fromTo(
          row,
          { opacity: 0.34, y: 54, scale: 0.99 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 46%",
              scrub: 0.72,
            },
          },
        );

        gsap.to(row, {
          opacity: 0.52,
          scale: 0.99,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "bottom 54%",
            end: "bottom 12%",
            scrub: 0.72,
          },
        });

        if (frame) {
          gsap.fromTo(
            frame,
            { y: 22, rotateZ: row.dataset.reverse === "true" ? -0.6 : 0.6 },
            {
              y: -12,
              rotateZ: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            },
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { x: row.dataset.reverse === "true" ? -22 : 22 },
            {
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
                end: "top 50%",
                scrub: 0.7,
              },
            },
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="project-story-list">
      {projects.map((project, index) => {
        const reverse = index % 2 === 1;

        return (
          <article
            key={project.slug}
            className="project-story-row"
            data-reverse={reverse ? "true" : "false"}
          >
            <div className={`project-story-layout ${reverse ? "is-reverse" : ""}`}>
              <div className="project-story-frame">
                <Link href={`/projects/${project.slug}`} className="project-story-visual group">
                  <div className="project-story-image-bg" aria-hidden="true" />
                  <Image
                    src={project.image}
                    alt={`${project.shortTitle} interface`}
                    fill
                    unoptimized
                    className="project-story-image object-contain"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                  <span className="project-story-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
                </Link>
              </div>

              <div className="project-story-copy">
                <div className="project-story-meta">
                  <span>0{index + 1}</span>
                  <i />
                  <span>{project.status}</span>
                </div>

                <h2>{project.shortTitle}</h2>
                <p className="project-story-full-title">{project.title}</p>
                <p className="project-story-overview">{project.overview}</p>
                <p className="project-story-role">{project.role}</p>

                <div className="project-story-tech">
                  {project.technologies.slice(0, 6).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <Link href={`/projects/${project.slug}`} className="project-story-link">
                  View case study <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
