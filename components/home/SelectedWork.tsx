import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProjectScreenshot } from "@/components/projects/ProjectScreenshot";

const systemProjects = projects.filter((project) => ["rbim", "ahdis"].includes(project.slug));
const websiteProjects = projects.filter((project) => ["lacomus-revamp", "co-designs"].includes(project.slug));

export function SelectedWork() {
  return (
    <section className="home-flow-section home-selected-work" aria-labelledby="selected-work-title">
      <div className="portfolio-shell">
        <div className="home-section-heading home-section-heading-primary">
          <div>
            <p className="v2-kicker">Selected work · 2026</p>
            <h2 id="selected-work-title" className="v2-heading mt-4">Digital experiences built for real use.</h2>
          </div>
          <p className="home-section-lede">
            My work spans operational information systems and website design. The common thread is the same: understand the real need, shape the experience, then build it carefully.
          </p>
        </div>

        <div className="home-work-chapter mt-16">
          <div className="home-work-chapter-heading">
            <div>
              <span className="home-work-index">01 / SYSTEMS</span>
              <h3>Real systems, built around real workflows.</h3>
            </div>
            <p>Information systems that demonstrate structured data workflows, validation, reporting, desktop development, and full-stack problem solving.</p>
          </div>

          <div className="projects-list mt-10">
            {systemProjects.map((project, index) => (
              <article key={project.slug} className={`project-editorial-row project-accent-${index % 3} editorial-section grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:gap-14`}>
                <TrackedLink href={`/projects/${project.slug}`} eventName="project_case_study_click" eventData={{ project: project.slug, source: "home_visual" }} aria-label={`View ${project.shortTitle} case study`} className={`group block min-w-0 ${index % 2 ? "lg:order-2" : ""}`}>
                  <ProjectScreenshot project={project} priority={index === 0} sizes="(max-width: 1024px) calc(100vw - 48px), 58vw" className="transition-colors duration-200 group-hover:border-white/[.16] group-focus-visible:border-white/[.22] group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-violet-400/60" />
                </TrackedLink>

                <div className={`project-copy ${index % 2 ? "lg:order-1" : ""}`}>
                  <div className="project-meta flex flex-wrap items-center gap-3 text-xs uppercase tracking-[.16em] text-zinc-600">
                    <span className="project-status"><i aria-hidden="true" />{project.status}</span>
                    {project.flagship ? <span className="rounded-full border border-white/[.14] px-2.5 py-1 text-[.6rem] font-bold tracking-[.14em] text-zinc-300">Flagship case study</span> : null}
                  </div>

                  <h3 className="section-title project-title mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">{project.shortTitle}</h3>
                  <p className="project-full-title mt-4 text-sm font-medium text-zinc-400">{project.title}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{project.highlights.map((item) => <span className="v2-chip" key={item}>{item}</span>)}</div>

                  <div className="home-project-facts mt-7">
                    <div><span>Problem</span><p>{project.problem}</p></div>
                    <div><span>Solution</span><p>{project.solution}</p></div>
                    <div><span>Impact</span><p>{project.impact[0]}</p></div>
                    <div><span>Role</span><p>{project.role}</p></div>
                  </div>

                  <div className="project-tech mt-6 flex flex-wrap gap-2">{project.technologies.slice(0, 7).map((item) => <span className="v2-chip" key={item}>{item}</span>)}</div>
                  <TrackedLink href={`/projects/${project.slug}`} eventName="project_case_study_click" eventData={{ project: project.slug, source: "home_cta" }} className="project-case-link mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3">
                    Explore Case Study <ArrowRight size={16} />
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="home-work-chapter home-websites-chapter">
          <div className="home-work-chapter-heading">
            <div>
              <span className="home-work-index">02 / WEBSITES</span>
              <h3>Brands, businesses, and ideas brought to the web.</h3>
            </div>
            <p>Current website work where I handle both visual direction and implementation. In-development work is labelled clearly rather than presented as finished client delivery.</p>
          </div>

          <div className="home-website-grid">
            {websiteProjects.map((project, index) => (
              <article key={project.slug} className={`home-website-card home-website-card-${index + 1}`}>
                <TrackedLink href={`/projects/${project.slug}`} eventName="project_case_study_click" eventData={{ project: project.slug, source: "home_website_visual" }} className="home-website-visual group" aria-label={`Explore ${project.shortTitle}`}>
                  <ProjectScreenshot project={project} sizes="(max-width: 1024px) calc(100vw - 48px), 50vw" constrainToSourceWidth={false} className="transition duration-500 group-hover:-translate-y-1 group-hover:border-white/[.18]" />
                </TrackedLink>

                <div className="home-website-copy">
                  <div className="home-website-eyebrow"><span>0{index + 3}</span><span>{project.status}</span></div>
                  <h4>{project.shortTitle}</h4>
                  <p className="home-website-title">{project.title}</p>
                  <p className="home-website-overview">{project.overview}</p>
                  <div className="home-website-role"><span>Role</span><strong>{project.role}</strong></div>
                  <div className="mt-5 flex flex-wrap gap-2">{project.technologies.slice(0, 6).map((item) => <span className="v2-chip" key={item}>{item}</span>)}</div>
                  <div className="home-website-actions">
                    <TrackedLink href={`/projects/${project.slug}`} eventName="project_case_study_click" eventData={{ project: project.slug, source: "home_website_cta" }} className="project-case-link inline-flex items-center gap-2 text-sm font-semibold">
                      Case Study <ArrowRight size={15} />
                    </TrackedLink>
                    {project.live ? (
                      <TrackedLink href={project.live} eventName="project_live_click" eventData={{ project: project.slug, source: "home_website_cta" }} target="_blank" rel="noreferrer" className="home-live-link inline-flex items-center gap-2 text-sm font-medium">
                        Live Development <ExternalLink size={14} />
                      </TrackedLink>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="home-view-all">
          <TrackedLink href="/projects" eventName="home_view_projects" eventData={{ source: "selected_work" }} className="v2-button">View All Projects <ArrowUpRight size={16} /></TrackedLink>
        </div>
      </div>
    </section>
  );
}
