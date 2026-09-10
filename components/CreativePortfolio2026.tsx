"use client";

import { useEffect } from "react";
import { ArrowDownRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import "./creative-portfolio-2026.css";

const featured = ["rbim", "co-designs-website", "ahdis", "marci-metzger-redesign", "lacomus-revamp"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

const capabilities = [
  ["01", "UI / UX DESIGN", "Interface systems, responsive composition, interaction design and visual direction."],
  ["02", "FULL-STACK DEVELOPMENT", "React, Next.js, TypeScript, APIs, authentication and application architecture."],
  ["03", "INFORMATION SYSTEMS", "Operational software, data workflows, PostgreSQL, SQLite, reporting and validation."],
  ["04", "CREATIVE DEVELOPMENT", "Motion systems, GSAP, Three.js, WebGL and expressive frontend prototypes."],
];

export function CreativePortfolio2026() {
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealNodes.forEach((node) => observer.observe(node));

    const hero = document.querySelector<HTMLElement>(".cp26-portrait-stage");
    const onPointerMove = (event: PointerEvent) => {
      if (!hero || window.innerWidth < 900) return;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--mx", `${x * 14}px`);
      hero.style.setProperty("--my", `${y * 10}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <main id="main-content" className="cp26-home">
      <section className="cp26-hero" aria-labelledby="cp26-title">
        <div className="cp26-hero-top" data-reveal>
          <span>{site.name}</span>
          <span>Creative developer · Philippines</span>
          <a href="#work">Selected work ↓</a>
        </div>

        <div className="cp26-word-stage" aria-hidden="true">
          <div className="cp26-word cp26-word-a"><span>FULL-STACK DEVELOPER</span><span>FULL-STACK DEVELOPER</span></div>
          <div className="cp26-word cp26-word-b"><span>UI/UX DESIGNER</span><span>UI/UX DESIGNER</span></div>
          <div className="cp26-word cp26-word-c"><span>CREATIVE DEVELOPER</span><span>CREATIVE DEVELOPER</span></div>
        </div>

        <div className="cp26-portrait-stage" data-reveal>
          <div className="cp26-portrait-frame">
            <img src="/media/kristy-kate-professional-portrait-v2.webp" alt="Kristy Kate Taylor" />
          </div>
        </div>

        <div className="cp26-hero-copy" data-reveal>
          <p className="cp26-label">Independent portfolio · 2026</p>
          <h1 id="cp26-title">I DESIGN DIGITAL EXPERIENCES <em>AND</em> BUILD THE SYSTEMS BEHIND THEM.</h1>
          <p>
            From expressive websites to operational information systems, I work across interface design,
            frontend craft, application logic and data workflows.
          </p>
        </div>
      </section>

      <section className="cp26-about" data-reveal>
        <div className="cp26-section-index">01 / ABOUT</div>
        <div className="cp26-about-copy">
          <p>
            I&apos;m a developer and designer working at the intersection of <strong>visual direction</strong> and
            <strong> technical systems</strong>. I care about typography, motion, usability, data integrity and the
            details that make software feel deliberate rather than assembled.
          </p>
          <a className="cp26-inline-link" href="/about">More about me <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section id="work" className="cp26-work" aria-labelledby="cp26-work-title">
        <header className="cp26-work-head" data-reveal>
          <div className="cp26-section-index">02 / FEATURED WORK</div>
          <h2 id="cp26-work-title">SELECTED PROJECTS</h2>
          <p>Different problems deserve different visual systems.</p>
        </header>

        <div className="cp26-projects">
          {featured.map((project, index) => (
            <article className={`cp26-project cp26-project-${index + 1}`} key={project.slug} data-reveal>
              <a href={`/projects/${project.slug}`} className="cp26-project-media" aria-label={`View ${project.shortTitle} case study`}>
                <img src={project.image} alt={`${project.shortTitle} project preview`} />
                <span className="cp26-project-hover">OPEN <ArrowUpRight size={18} /></span>
              </a>
              <div className="cp26-project-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{project.shortTitle}</h3>
                  <p>{project.title}</p>
                </div>
                <div className="cp26-project-tags">{project.category.slice(0, 3).join(" · ")}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="cp26-view-all" data-reveal>
          <a href="/projects">VIEW ALL PROJECTS <ArrowDownRight size={19} /></a>
        </div>
      </section>

      <section className="cp26-statement" data-reveal>
        <p className="cp26-label">A practical creative practice</p>
        <p className="cp26-statement-text">
          GOOD DESIGN ISN&apos;T A SKIN OVER SOFTWARE. <em>IT IS HOW THE SYSTEM EXPLAINS ITSELF.</em>
        </p>
      </section>

      <section className="cp26-capabilities" aria-labelledby="cp26-capabilities-title">
        <header data-reveal>
          <div className="cp26-section-index">03 / CAPABILITIES</div>
          <h2 id="cp26-capabilities-title">WHAT I BRING TO A PROJECT</h2>
        </header>
        <div className="cp26-capability-list">
          {capabilities.map(([number, title, text]) => (
            <article key={title} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cp26-dark-band" data-reveal>
        <div>
          <p className="cp26-label">Beyond the interface</p>
          <h2>DESIGN JUDGMENT<br />BACKED BY<br /><em>TECHNICAL DEPTH.</em></h2>
        </div>
        <p>
          My strongest work connects the visible layer to what users cannot see: validation rules, data models,
          responsive behavior, performance, accessibility and operational constraints.
        </p>
      </section>

      <section className="cp26-contact" aria-labelledby="cp26-contact-title">
        <div className="cp26-section-index" data-reveal>04 / CONTACT</div>
        <div className="cp26-contact-body" data-reveal>
          <p>Freelance · contract · full-time opportunities</p>
          <h2 id="cp26-contact-title">LET&apos;S MAKE<br /><em>SOMETHING MEMORABLE.</em></h2>
          <div className="cp26-contact-links">
            <a href={`mailto:${site.email}`}><Mail size={17} /> {site.email}</a>
            <a href={site.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
            <a href="/packages">Project packages <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
