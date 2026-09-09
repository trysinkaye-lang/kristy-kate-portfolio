import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Database, Figma, GraduationCap, Layers3, MonitorSmartphone } from "lucide-react";
import { InteractiveToolGrid } from "@/components/InteractiveToolGrid";

const methods = [
  {
    number: "01",
    title: "Understand the real workflow",
    detail: "I start with how people actually work: the data they handle, the decisions they make, and where friction happens.",
  },
  {
    number: "02",
    title: "Structure information clearly",
    detail: "I organize requirements, records, relationships, and business rules before turning them into screens and features.",
  },
  {
    number: "03",
    title: "Design for usability",
    detail: "I focus on readable hierarchy, predictable interactions, responsive layouts, and interfaces that reduce cognitive load.",
  },
  {
    number: "04",
    title: "Build, test, refine",
    detail: "I develop iteratively, validate the experience across devices, and improve details based on how the system behaves in practice.",
  },
];

const services = [
  { icon: MonitorSmartphone, label: "Software Development" },
  { icon: Layers3, label: "Information Systems" },
  { icon: Figma, label: "UI/UX Design" },
  { icon: Database, label: "Database Design" },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="portfolio-v2 about-page editorial-page min-h-screen pb-20 pt-36">
      <div className="portfolio-shell">
        <header className="page-hero-panel about-hero about-hero-with-portrait">
          <div className="about-portrait-wrap">
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              alt="Kristy Kate Taylor"
              fill
              priority
              className="about-portrait object-cover"
              sizes="(max-width: 760px) 320px, (max-width: 1100px) 240px, 285px"
            />
          </div>

          <div className="about-refined-intro min-w-0">
            <p className="about-identity-line">Software Developer · UI/UX Designer</p>
            <h1 className="section-title about-refined-title mt-4 text-[clamp(3.35rem,5.6vw,5.8rem)] font-semibold leading-[.9] tracking-[-.06em]">
              Hello, I&apos;m <span className="page-title-accent">Kristy Kate.</span>
            </h1>

            <div className="page-intro about-refined-copy mt-6 space-y-5">
              <p>I&apos;m a software developer and UI/UX designer passionate about building clear, reliable digital systems for real people and real workflows.</p>
              <p>My work combines requirements analysis, database design, application development, and interface design. I care about making powerful tools feel organized rather than overwhelming.</p>
              <p>I&apos;m especially interested in information systems, offline-first applications, public-sector workflows, and products where thoughtful design improves the quality of data and decisions.</p>
            </div>
          </div>
        </header>

        <section className="about-section editorial-section border-b border-white/[.09] py-16 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-[.58fr_.42fr] lg:items-end lg:gap-10">
            <div>
              <p className="v2-kicker">How I work</p>
              <h2 className="section-title mt-4 max-w-2xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
                From messy requirements to a usable system.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-zinc-400 lg:justify-self-end">
              A clear workflow, structured information, usable interaction, then careful implementation and refinement.
            </p>
          </div>

          <div className="relative mt-8">
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent xl:block" aria-hidden="true" />
            <div className="about-method-grid grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {methods.map((item) => (
                <article className="about-method-card editorial-card group relative min-h-[220px] p-5 sm:p-6" key={item.number}>
                  <span className="about-method-number relative z-10 inline-grid h-12 w-12 place-items-center rounded-full border border-white/[.1] bg-white/[.025] text-xs font-bold tracking-[.12em]">
                    {item.number}
                  </span>
                  <h3 className="mt-9 text-[1.15rem] font-semibold leading-6 text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.detail}</p>
                  <span className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#c99db8]/60 to-transparent transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section editorial-section border-b border-white/[.09] py-14 lg:py-20">
          <div className="about-education-card editorial-card grid gap-5 rounded-[1.55rem] border border-white/[.09] p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:p-8">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/[.09] bg-white/[.025] text-[#c6a0ba]">
              <GraduationCap size={26} />
            </div>
            <div>
              <p className="v2-kicker">Education</p>
              <h2 className="section-title mt-2 text-xl font-semibold leading-7 sm:text-2xl">University of Science and Technology of Southern Philippines</h2>
              <p className="mt-2 text-sm text-zinc-400">Bachelor of Science in Information Technology</p>
            </div>
          </div>
        </section>

        <section className="about-section editorial-section py-14 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="v2-kicker">Capabilities</p>
              <h2 className="section-title mt-3 max-w-xl text-3xl font-semibold tracking-[-.04em] sm:text-4xl">What I bring to a product.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-zinc-400">Development and design treated as parts of the same workflow, not separate deliverables.</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, label }) => (
              <div className="about-service-card editorial-card group min-h-[168px] rounded-[1.4rem] border border-white/[.09] p-5 sm:p-6" key={label}>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/[.09] bg-white/[.025] text-[#c6a0ba] transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none">
                  <Icon size={21} />
                </div>
                <p className="mt-9 font-semibold leading-6 text-white">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section editorial-section border-y border-white/[.09] py-14 lg:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="v2-kicker">Toolbox</p>
              <h2 className="section-title mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Tools I work with</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-zinc-400">Select a tool to see how it fits into my development and design workflow.</p>
          </div>
          <InteractiveToolGrid />
        </section>

        <section className="about-section editorial-section page-cta py-20 text-center sm:py-24">
          <h2 className="section-title mx-auto max-w-3xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Want to see how this approach turns into real systems?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="v2-button v2-button-primary">View projects <ArrowUpRight size={16} /></Link>
            <Link href="/contact" className="v2-button">Contact me</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
