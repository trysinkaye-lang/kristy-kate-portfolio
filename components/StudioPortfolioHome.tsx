"use client";

import { useEffect } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import "./studio-portfolio-home.css";

const featuredSlugs = ["rbim", "co-designs-website", "ahdis", "marci-metzger-redesign"];
const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

const disciplines = [
  {
    title: "Digital design",
    items: "UI/UX direction · Responsive systems · Interaction design · Design systems",
  },
  {
    title: "Web development",
    items: "React · Next.js · TypeScript · Frontend architecture · API integration",
  },
  {
    title: "Information systems",
    items: "Data workflows · PostgreSQL · SQLite · Validation · Reporting · Offline-first",
  },
  {
    title: "Creative development",
    items: "GSAP · Three.js · WebGL · Motion systems · Interactive prototypes",
  },
];

export function StudioPortfolioHome() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-studio-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-visible"));
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content" className="studio-home">
      <section className="studio-hero" aria-labelledby="studio-hero-title">
        <div className="studio-ambient" aria-hidden="true" />
        <div className="studio-shell studio-hero-shell">
          <div className="studio-hero-meta" data-studio-reveal>
            <div className="studio-identity">
              <span className="studio-index">01</span>
              <span>{site.name}</span>
            </div>
            <div className="studio-availability">
              <i aria-hidden="true" />
              Available for selected projects &amp; opportunities
            </div>
          </div>

          <div className="studio-hero-layout">
            <div className="studio-title-wrap" data-studio-reveal>
              <p className="studio-kicker">Design engineer · full-stack developer</p>
              <h1 id="studio-hero-title" className="studio-display">
                <span>DESIGN</span>
                <span>CODE</span>
                <em>&amp; SYSTEMS.</em>
              </h1>
            </div>

            <aside className="studio-hero-aside" data-studio-reveal>
              <p>
                I design interfaces and build the software behind them — from expressive websites to
                operational information systems.
              </p>
              <div className="studio-hero-actions">
                <TrackedLink
                  href="#selected-work"
                  eventName="home_view_projects"
                  eventData={{ source: "studio_hero" }}
                  className="studio-primary-link"
                >
                  Explore selected work <ArrowDown size={16} />
                </TrackedLink>
                <TrackedLink
                  href="/contact"
                  eventName="home_contact_click"
                  eventData={{ source: "studio_hero" }}
                  className="studio-text-link"
                >
                  Start a conversation <ArrowUpRight size={15} />
                </TrackedLink>
              </div>
            </aside>
          </div>

          <div className="studio-hero-footer" data-studio-reveal>
            <span>Website design</span>
            <span>Full-stack development</span>
            <span>Information systems</span>
            <span>Creative frontend</span>
          </div>
        </div>
      </section>

      <section id="selected-work" className="studio-section studio-work" aria-labelledby="studio-work-title">
        <div className="studio-shell">
          <header className="studio-section-head" data-studio-reveal>
            <div>
              <p className="studio-kicker">02 / Selected work</p>
              <h2 id="studio-work-title">Work that proves both sides of the craft.</h2>
            </div>
            <p>
              Product thinking, interface design, application architecture, and implementation — shown through
              real systems and client-facing web work.
            </p>
          </header>

          <div className="studio-project-list">
            {featuredProjects.map((project, index) => (
              <article className="studio-project" key={project.slug} data-studio-reveal>
                <TrackedLink
                  href={`/projects/${project.slug}`}
                  eventName="project_case_study_click"
                  eventData={{ project: project.slug, source: "studio_home_visual" }}
                  className="studio-project-visual"
                  aria-label={`View ${project.shortTitle} case study`}
                >
                  <ProjectScreenshot
                    project={project}
                    priority={index === 0}
                    sizes="(max-width: 900px) calc(100vw - 32px), 62vw"
                    className="studio-project-image"
                  />
                  <span className="studio-project-open" aria-hidden="true"><ArrowUpRight size={20} /></span>
                </TrackedLink>

                <div className="studio-project-copy">
                  <div className="studio-project-number">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <p className="studio-project-category">{project.category.slice(0, 2).join(" / ")}</p>
                    <h3>{project.shortTitle}</h3>
                    <p className="studio-project-title">{project.title}</p>
                  </div>
                  <div className="studio-project-bottom">
                    <p>{project.overview}</p>
                    <div className="studio-project-meta">
                      <span>{project.role}</span>
                      <span>{project.status}</span>
                    </div>
                    <TrackedLink
                      href={`/projects/${project.slug}`}
                      eventName="project_case_study_click"
                      eventData={{ project: project.slug, source: "studio_home_copy" }}
                      className="studio-text-link studio-project-link"
                    >
                      View case study <ArrowRight size={15} />
                    </TrackedLink>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="studio-all-work" data-studio-reveal>
            <TrackedLink
              href="/projects"
              eventName="home_view_projects"
              eventData={{ source: "studio_selected_work" }}
              className="studio-primary-link"
            >
              View the full project archive <ArrowUpRight size={16} />
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="studio-statement" aria-label="Portfolio statement">
        <div className="studio-shell" data-studio-reveal>
          <p className="studio-kicker">A practical creative practice</p>
          <p className="studio-statement-copy">
            I care about how a product <em>feels</em>, how a system <em>works</em>, and whether the code can
            still be understood after the launch-day polish is gone.
          </p>
        </div>
      </section>

      <section className="studio-section studio-practice" aria-labelledby="studio-practice-title">
        <div className="studio-shell">
          <header className="studio-section-head studio-practice-head" data-studio-reveal>
            <div>
              <p className="studio-kicker">03 / Practice</p>
              <h2 id="studio-practice-title">What I bring to a project.</h2>
            </div>
            <p>
              A compact skill set that connects visual direction to implementation instead of treating design and
              engineering as separate hand-offs.
            </p>
          </header>

          <div className="studio-discipline-list">
            {disciplines.map((discipline, index) => (
              <article className="studio-discipline" key={discipline.title} data-studio-reveal>
                <span className="studio-discipline-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{discipline.title}</h3>
                <p>{discipline.items}</p>
                <span className="studio-discipline-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section studio-about" aria-labelledby="studio-about-title">
        <div className="studio-shell studio-about-grid">
          <div data-studio-reveal>
            <p className="studio-kicker">04 / About</p>
            <h2 id="studio-about-title">Design judgment backed by technical depth.</h2>
          </div>

          <div className="studio-about-copy" data-studio-reveal>
            <p className="studio-about-lede">
              I’m a BS Information Technology graduate working across software development, UI/UX, web experiences,
              databases, and desktop applications.
            </p>
            <p>
              My strongest work starts with real operational requirements: who uses the product, what must stay
              accurate, what has to work on slower devices or unreliable connections, and what makes the interface
              easier to trust.
            </p>
            <TrackedLink href="/about" eventName="home_about_click" eventData={{ source: "studio_home" }} className="studio-text-link">
              Read more about my approach <ArrowUpRight size={15} />
            </TrackedLink>
          </div>

          <div className="studio-facts" data-studio-reveal>
            <div><span>Based</span><strong>{site.location}</strong></div>
            <div><span>Focus</span><strong>Web + systems</strong></div>
            <div><span>Build style</span><strong>Design to deployment</strong></div>
          </div>
        </div>
      </section>

      <section className="studio-contact" aria-labelledby="studio-contact-title">
        <div className="studio-shell" data-studio-reveal>
          <div className="studio-contact-meta">
            <p className="studio-kicker">05 / Contact</p>
            <span>For freelance, contract, and full-time opportunities</span>
          </div>
          <h2 id="studio-contact-title">LET&apos;S BUILD<br /><em>SOMETHING USEFUL.</em></h2>
          <div className="studio-contact-row">
            <TrackedLink
              href={`mailto:${site.email}`}
              eventName="contact_email_click"
              eventData={{ source: "studio_home_contact" }}
              className="studio-contact-link"
            >
              <Mail size={17} /> {site.email} <ArrowUpRight size={17} />
            </TrackedLink>
            <TrackedLink
              href={site.github}
              eventName="github_click"
              eventData={{ source: "studio_home_contact" }}
              className="studio-contact-link"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> GitHub <ArrowUpRight size={17} />
            </TrackedLink>
            <TrackedLink href="/packages" eventName="home_packages_click" eventData={{ source: "studio_home_contact" }} className="studio-contact-link">
              Project packages <ArrowUpRight size={17} />
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
