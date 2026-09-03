import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Database,
  Figma,
  GraduationCap,
  Layers3,
  MapPin,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import { InteractiveToolGrid } from "@/components/InteractiveToolGrid";
import { AboutFocusPanel } from "@/components/about/AboutFocusPanel";

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
  { icon: MonitorSmartphone, label: "Software Development", note: "Systems, applications, and operational tools" },
  { icon: Layers3, label: "Information Systems", note: "Structured data and real-world workflows" },
  { icon: Figma, label: "UI/UX Design", note: "Clear interfaces and interaction patterns" },
  { icon: Database, label: "Database Design", note: "Reliable relationships and data integrity" },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="portfolio-v2 about-page editorial-page about-v13 min-h-screen pb-20 pt-36">
      <div className="portfolio-shell">
        <header className="about-v13-hero">
          <div className="about-v13-portrait-column">
            <div className="about-v13-portrait-frame">
              <span className="about-v13-portrait-glow" aria-hidden="true" />
              <Image
                src="/media/kristy-kate-professional-portrait-v2.webp"
                alt="Kristy Kate Taylor"
                fill
                priority
                className="about-v13-portrait object-cover"
                sizes="(max-width: 900px) 100vw, 420px"
              />
              <div className="about-v13-portrait-label">
                <span><MapPin size={13} /> Philippines</span>
                <span>Software + Design</span>
              </div>
            </div>
          </div>

          <div className="about-v13-intro">
            <div className="about-v13-eyebrow"><Sparkles size={14} /> Behind the systems</div>
            <h1 className="page-title text-white">Hello, I&apos;m <span className="page-title-accent">Kristy Kate.</span></h1>
            <p className="about-v13-lead">
              I&apos;m a software developer and UI/UX designer who likes solving the part between a messy real-world workflow and a system that finally feels clear.
            </p>
            <p className="about-v13-copy">
              My work combines requirements analysis, database design, application development, and interface design. I&apos;m especially interested in information systems, offline-first applications, public-sector workflows, and products where thoughtful design improves the quality of data and decisions.
            </p>

            <div className="about-v13-quick-facts">
              <div><BriefcaseBusiness size={17} /><span><strong>Focus</strong>Information systems</span></div>
              <div><GraduationCap size={17} /><span><strong>Degree</strong>BS Information Technology</span></div>
              <div><Layers3 size={17} /><span><strong>Approach</strong>Full workflow thinking</span></div>
            </div>
          </div>
        </header>

        <section className="about-v13-focus-section">
          <AboutFocusPanel />
        </section>

        <section className="about-v13-process">
          <div className="about-v13-section-heading">
            <div>
              <p className="v2-kicker">How I work</p>
              <h2>From messy requirements to a usable system.</h2>
            </div>
            <p>I prefer process that makes the final interface easier to understand—not process for its own sake.</p>
          </div>

          <div className="about-v13-process-grid">
            {methods.map((item) => (
              <article className="about-v13-process-card" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="about-v13-education">
          <div className="about-v13-education-mark"><GraduationCap size={28} /></div>
          <div>
            <p className="v2-kicker">Education</p>
            <h2>University of Science and Technology of Southern Philippines</h2>
            <p>Bachelor of Science in Information Technology</p>
          </div>
          <span className="about-v13-education-code">BSIT</span>
        </section>

        <section className="about-v13-services">
          <div className="about-v13-section-heading">
            <div>
              <p className="v2-kicker">What I bring</p>
              <h2>Development and design, treated as one product problem.</h2>
            </div>
          </div>

          <div className="about-v13-service-grid">
            {services.map(({ icon: Icon, label, note }, index) => (
              <article className="about-v13-service-card" key={label}>
                <div className="about-v13-service-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={22} />
                </div>
                <h3>{label}</h3>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-v13-tools">
          <div className="about-v13-section-heading">
            <div>
              <p className="v2-kicker">Toolbox</p>
              <h2>Tools I use to move from idea to working product.</h2>
            </div>
            <p>Click a tool to see where it fits in my workflow.</p>
          </div>
          <InteractiveToolGrid />
        </section>

        <section className="about-v13-cta">
          <div>
            <p className="v2-kicker">See the work</p>
            <h2>Want to see how this thinking turns into real systems?</h2>
          </div>
          <div className="about-v13-cta-actions">
            <Link href="/projects" className="v2-button v2-button-primary">View projects <ArrowUpRight size={16} /></Link>
            <Link href="/contact" className="v2-button">Contact me</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
