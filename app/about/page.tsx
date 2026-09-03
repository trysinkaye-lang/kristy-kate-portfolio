import Link from "next/link";
import { ArrowUpRight, Database, Figma, Layers3, MonitorSmartphone } from "lucide-react";
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
        <header className="page-hero page-hero-panel page-hero-split about-hero">
          <div className="page-hero-heading">
            <p className="v2-kicker page-kicker">About</p>
            <h1 className="page-title mt-5 text-white">Hello, I’m <span className="page-title-accent">Kristy Kate.</span></h1>
          </div>
          <div className="page-intro space-y-6 text-lg leading-8 text-zinc-400">
            <p>I’m a software developer and UI/UX designer passionate about building clear, reliable digital systems for real people and real workflows.</p>
            <p>My work combines requirements analysis, database design, application development, and interface design. I care about making powerful tools feel organized rather than overwhelming.</p>
            <p>I’m especially interested in information systems, offline-first applications, public-sector workflows, and products where thoughtful design improves the quality of data and decisions.</p>
          </div>
        </header>

        <section className="about-section editorial-section border-b border-white/[.09] py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.30fr_.70fr] lg:gap-16">
            <div>
              <p className="v2-kicker">How I work</p>
              <h2 className="section-title mt-4 max-w-xs text-3xl font-semibold tracking-[-.035em] text-white">From messy requirements to a usable system.</h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-500">My About page is about my thinking and process. The detailed project stories live only on the Projects page.</p>
            </div>
            <div className="about-method-grid">
              {methods.map((item) => (
                <article className="about-method-card editorial-card" key={item.number}>
                  <span className="about-method-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section editorial-section grid gap-10 border-b border-white/[.09] py-16 lg:grid-cols-[.38fr_.62fr] lg:py-24">
          <div><p className="v2-kicker">Education</p></div>
          <div className="about-education-card editorial-card rounded-[2rem] border border-white/[.09] p-7 sm:p-9">
            <h2 className="text-2xl font-semibold text-white">University of Science and Technology of Southern Philippines</h2>
            <p className="mt-3 text-zinc-500">Bachelor of Science in Information Technology</p>
          </div>
        </section>

        <section className="about-section editorial-section py-16 lg:py-24">
          <p className="v2-kicker">What I do</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, label }) => (
              <div className="about-service-card editorial-card rounded-2xl border border-white/[.09] p-6" key={label}>
                <Icon size={22} />
                <p className="mt-12 font-semibold text-white">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section editorial-section border-y border-white/[.09] py-16 lg:py-24">
          <p className="v2-kicker">Stack</p>
          <h2 className="section-title mt-4 text-3xl font-semibold text-white sm:text-4xl">Tools I work with</h2>
          <InteractiveToolGrid />
        </section>

        <section className="about-section editorial-section page-cta py-24 text-center">
          <p className="v2-kicker">Explore the work</p>
          <h2 className="section-title mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Want to see how this approach turns into real systems?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="v2-button v2-button-primary">View projects <ArrowUpRight size={16} /></Link>
            <Link href="/contact" className="v2-button">Contact me</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
