"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { projects } from "@/data/projects";
import { site, stack } from "@/data/site";
import { SplitTextLite } from "@/components/react-bits/SplitTextLite";
import { SpotlightCardLite } from "@/components/react-bits/SpotlightCardLite";
import { MagnetLite } from "@/components/react-bits/MagnetLite";
import { InteractiveDotGridLite } from "@/components/react-bits/InteractiveDotGridLite";
import { RotatingRoleLite } from "@/components/react-bits/RotatingRoleLite";
import { ScrollVelocityLite } from "@/components/react-bits/ScrollVelocityLite";
import { TiltCardLite } from "@/components/react-bits/TiltCardLite";

const strengths = ["Software Development", "Information Systems", "UI/UX Design", "Database Design"];
const marqueeItems = ["React", "TypeScript", "PostgreSQL", "SQLite", "Tauri", "Rust", "PHP", "UI/UX", "GitHub", "System Design"];

export function PortfolioHome() {
  const softwareProjects = useMemo(() => projects.filter((project) => project.slug !== "design-systems"), []);
  const [activeProject, setActiveProject] = useState(0);
  const [portfolioTab, setPortfolioTab] = useState<"projects" | "stack">("projects");
  const touchStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    const count = softwareProjects.length;
    setActiveProject(((index % count) + count) % count);
  };

  const project = softwareProjects[activeProject];

  return (
    <main id="main-content" className="portfolio-v2">
      <section id="home" className="portfolio-hero relative overflow-hidden">
        <InteractiveDotGridLite className="absolute inset-0" />
        <div className="rb-hero-glow" aria-hidden="true" />

        <div className="portfolio-shell relative z-10 grid min-h-[780px] items-center gap-14 py-32 lg:grid-cols-[1.12fr_.88fr] lg:py-28">
          <div className="min-w-0">
            <div className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[.22em] text-zinc-500">
              <span className="hero-status-dot h-2 w-2 rounded-full bg-emerald-400" />
              Available for opportunities
            </div>

            <p className="mb-5 text-sm uppercase tracking-[.28em] text-zinc-500">Kristy Kate Taylor</p>
            <h1 className="max-w-4xl text-[clamp(3.7rem,8vw,7.6rem)] font-semibold leading-[.86] tracking-[-.065em] text-white">
              <SplitTextLite text="Software" delay={38} />
              <br />
              <SplitTextLite text="Developer" delay={38} />
            </h1>

            <div className="mt-7 flex min-h-10 flex-wrap items-center gap-2 text-lg text-zinc-400 sm:text-xl">
              <span>I also work as a</span>
              <RotatingRoleLite roles={["System Developer", "UI/UX Designer", "Web Developer", "Product Builder"]} />
            </div>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-500">
              I build practical digital systems and clear interfaces for real-world workflows.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagnetLite><a href="#portfolio" className="v2-button v2-button-primary">View projects <ArrowUpRight size={16} /></a></MagnetLite>
              <MagnetLite strength={0.12}><a href="#contact" className="v2-button">Contact me</a></MagnetLite>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500">
              <a className="transition hover:text-white" href={site.github} target="_blank" rel="noreferrer"><Github className="mr-2 inline" size={15} />GitHub</a>
              <a className="transition hover:text-white" href={`mailto:${site.email}`}><Mail className="mr-2 inline" size={15} />{site.email}</a>
            </div>
          </div>

          <TiltCardLite className="mx-auto w-full max-w-[460px]">
            <SpotlightCardLite className="relative rounded-[2rem]">
              <div className="absolute -left-5 -top-7 h-24 w-24 border-l border-t border-white/15" />
              <div className="absolute -bottom-7 -right-5 h-24 w-24 border-b border-r border-white/15" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] p-5">
                <div className="grid h-full place-items-center rounded-[1.3rem] border border-dashed border-white/10 bg-[#0b0b0b] text-center">
                  <div>
                    <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-white/[.03] text-4xl font-semibold text-white">KT</div>
                    <p className="mt-5 text-sm text-zinc-600">Professional portrait can be added here</p>
                  </div>
                </div>
              </div>
            </SpotlightCardLite>
          </TiltCardLite>
        </div>

        <div className="relative z-10 border-y border-white/[.06] bg-black/20 py-3 backdrop-blur-sm">
          <ScrollVelocityLite items={marqueeItems} />
        </div>
      </section>

      <section id="about" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell grid gap-12 py-24 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
          <div>
            <p className="v2-kicker">About</p>
            <h2 className="v2-heading mt-4">I turn requirements into usable systems.</h2>
          </div>
          <div>
            <p className="max-w-3xl text-xl leading-9 text-zinc-300">
              I work across software development, information systems, databases, and interface design. My goal is to make complex workflows feel organized, understandable, and reliable for the people using them.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[.07] bg-white/[.07] sm:grid-cols-2">
              {strengths.map((item, index) => (
                <SpotlightCardLite key={item} className="bg-[#0b0b0b] px-6 py-6">
                  <span className="text-xs text-zinc-600">0{index + 1}</span>
                  <p className="mt-2 font-medium text-zinc-200">{item}</p>
                </SpotlightCardLite>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell py-24 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="v2-kicker">Selected work</p>
              <h2 className="v2-heading mt-4">Portfolio Showcase</h2>
              <p className="mt-5 max-w-2xl leading-7 text-zinc-500">A focused view of the systems I have designed and developed.</p>
            </div>
            <div className="inline-flex w-fit rounded-full border border-white/[.08] bg-white/[.025] p-1">
              <button type="button" onClick={() => setPortfolioTab("projects")} className={`v2-tab ${portfolioTab === "projects" ? "is-active" : ""}`}>Projects</button>
              <button type="button" onClick={() => setPortfolioTab("stack")} className={`v2-tab ${portfolioTab === "stack" ? "is-active" : ""}`}>Tech Stack</button>
            </div>
          </div>

          {portfolioTab === "projects" ? (
            <div className="mt-12">
              <div className="rb-electric-frame rounded-[2rem]">
                <SpotlightCardLite className="rounded-[2rem]">
                  <div
                    className="relative overflow-hidden rounded-[2rem] border border-white/[.08] bg-[#0a0a0a]"
                    onPointerDown={(event) => { touchStart.current = event.clientX; }}
                    onPointerUp={(event) => {
                      if (touchStart.current === null) return;
                      const delta = event.clientX - touchStart.current;
                      touchStart.current = null;
                      if (Math.abs(delta) < 50) return;
                      goTo(activeProject + (delta < 0 ? 1 : -1));
                    }}
                  >
                    <div key={project.slug} className="project-swap grid lg:grid-cols-[1.12fr_.88fr]">
                      <TiltCardLite className="rb-project-visual flex min-h-[330px] items-center justify-center border-b border-white/[.07] bg-[#0e0e0e] p-5 sm:min-h-[470px] sm:p-8 lg:min-h-[600px] lg:border-b-0 lg:border-r">
                        <img src={project.image} alt={`${project.shortTitle} interface`} className="max-h-[540px] w-full rounded-xl object-contain" draggable={false} />
                      </TiltCardLite>
                      <div className="flex min-w-0 flex-col p-7 sm:p-10 lg:p-12">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs uppercase tracking-[.2em] text-zinc-600">{project.status}</span>
                          <span className="text-sm tabular-nums text-zinc-600">0{activeProject + 1} / 0{softwareProjects.length}</span>
                        </div>
                        <h3 className="mt-6 text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">{project.shortTitle}</h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-500">{project.title}</p>
                        <p className="mt-7 leading-7 text-zinc-300">{project.overview}</p>
                        <div className="mt-8 border-t border-white/[.07] pt-7">
                          <p className="text-xs uppercase tracking-[.18em] text-zinc-600">Role</p>
                          <p className="mt-2 text-sm text-zinc-300">{project.role}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((technology) => <span key={technology} className="v2-chip">{technology}</span>)}
                        </div>
                        <div className="mt-8">
                          <MagnetLite strength={0.12}><Link href={`/projects/${project.slug}`} className="v2-button v2-button-primary">View case study <ArrowUpRight size={16} /></Link></MagnetLite>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-10">
                          <div className="flex gap-2">
                            {softwareProjects.map((item, index) => (
                              <button key={item.slug} type="button" onClick={() => goTo(index)} aria-label={`Show ${item.shortTitle}`} className={`h-1.5 rounded-full transition-all ${activeProject === index ? "w-8 bg-white" : "w-3 bg-white/15 hover:bg-white/30"}`} />
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => goTo(activeProject - 1)} aria-label="Previous project" className="v2-arrow"><ArrowLeft size={18} /></button>
                            <button type="button" onClick={() => goTo(activeProject + 1)} aria-label="Next project" className="v2-arrow"><ArrowRight size={18} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SpotlightCardLite>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {softwareProjects.map((item, index) => (
                  <SpotlightCardLite key={item.slug} className={`rounded-2xl border ${activeProject === index ? "border-white/20 bg-white/[.055]" : "border-white/[.06] bg-transparent"}`}>
                    <button type="button" onClick={() => goTo(index)} className="w-full p-5 text-left">
                      <span className="text-xs text-zinc-600">0{index + 1}</span>
                      <span className="mt-2 block font-medium text-zinc-200">{item.shortTitle}</span>
                      <span className="mt-1 block text-xs text-zinc-600">{item.category.slice(0, 2).join(" · ")}</span>
                    </button>
                  </SpotlightCardLite>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/[.07] bg-white/[.07] sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(stack).map(([category, items]) => (
                <SpotlightCardLite key={category} className="bg-[#0a0a0a] p-7 sm:p-8">
                  <p className="text-xs uppercase tracking-[.18em] text-zinc-600">{category}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.filter((item) => !item.includes("replace with")).map((item) => <span className="v2-chip" key={item}>{item}</span>)}
                  </div>
                </SpotlightCardLite>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="experience" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell grid gap-12 py-24 lg:grid-cols-[.65fr_1.35fr] lg:py-28">
          <div>
            <p className="v2-kicker">Experience</p>
            <h2 className="v2-heading mt-4">Building systems with purpose.</h2>
          </div>
          <div className="divide-y divide-white/[.07] border-y border-white/[.07]">
            <div className="grid gap-3 py-7 sm:grid-cols-[160px_1fr]"><span className="text-xs uppercase tracking-[.18em] text-zinc-600">Education</span><div><h3 className="font-medium text-white">BS Information Technology</h3><p className="mt-2 text-sm text-zinc-500">University of Science and Technology of Southern Philippines</p></div></div>
            <div className="grid gap-3 py-7 sm:grid-cols-[160px_1fr]"><span className="text-xs uppercase tracking-[.18em] text-zinc-600">Systems</span><div><h3 className="font-medium text-white">RBIM · AHDIS · ERP</h3><p className="mt-2 text-sm leading-6 text-zinc-500">Software development, system workflows, database design, interface design, validation, and deployment-focused improvements.</p></div></div>
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-section border-t border-white/[.06]">
        <div className="portfolio-shell py-24 lg:py-28">
          <SpotlightCardLite className="rounded-[2rem] border border-white/[.08] bg-[#0a0a0a] p-8 sm:p-12 lg:p-16">
            <p className="v2-kicker">Contact</p>
            <div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl lg:text-6xl">Have a project or opportunity in mind?</h2>
                <p className="mt-5 max-w-2xl leading-7 text-zinc-500">I’m open to conversations about software development, systems, and interface design.</p>
              </div>
              <div className="lg:text-right">
                <MagnetLite className="lg:justify-end" strength={0.12}><a className="v2-button v2-button-primary" href={`mailto:${site.email}`}>Email me <Mail size={16} /></a></MagnetLite>
                <p className="mt-4 text-sm text-zinc-600">{site.email}</p>
              </div>
            </div>
          </SpotlightCardLite>
        </div>
      </section>

      <footer className="border-t border-white/[.06] px-5 py-8 text-center text-sm text-zinc-700">Kristy Kate Taylor · Software Developer & UI/UX Designer</footer>
    </main>
  );
}
