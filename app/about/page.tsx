import Image from "next/image";
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
    <main id="main-content" className="portfolio-v2 about-page cinematic-about min-h-screen pb-20 pt-36">
      <div className="about-depth-orbit" aria-hidden="true"><span /><span /><span /></div>

      <div className="portfolio-shell relative z-10">
        <header className="about-editorial-hero">
          <div className="about-editorial-copy">
            <p className="v2-kicker">About me</p>
            <h1>Hello, I’m <em>Kristy Kate.</em></h1>
            <div className="about-intro-text">
              <p>I’m a software developer and UI/UX designer passionate about building clear, reliable digital systems for real people and real workflows.</p>
              <p>My work combines requirements analysis, database design, application development, and interface design. I care about making powerful tools feel organized rather than overwhelming.</p>
              <p>I’m especially interested in information systems, offline-first applications, public-sector workflows, and products where thoughtful design improves the quality of data and decisions.</p>
            </div>
          </div>

          <div className="about-portrait-column">
            <div className="about-portrait-frame">
              <Image
                src="/media/kristy-kate-professional-portrait-v2.webp"
                alt="Kristy Kate Taylor"
                fill
                priority
                className="about-portrait-image object-cover"
                sizes="(max-width: 900px) 88vw, 34vw"
              />
              <div className="about-portrait-glow" aria-hidden="true" />
            </div>
            <div className="about-portrait-caption">
              <span>Software Developer</span>
              <span>UI/UX Designer</span>
              <span>Philippines</span>
            </div>
          </div>
        </header>

        <section className="about-section about-method-section">
          <div className="about-method-intro">
            <p className="v2-kicker">How I work</p>
            <h2>From messy requirements to a usable system.</h2>
            <p>The project details live on the Projects page. Here, the focus is the thinking that shapes how I design and build.</p>
          </div>

          <div className="about-method-grid">
            {methods.map((item) => (
              <article className="about-method-card" key={item.number}>
                <span className="about-method-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section about-education-section">
          <div className="about-education-label">
            <p className="v2-kicker">Education</p>
          </div>

          <div className="about-education-card-v2">
            <div className="about-university-logo-wrap">
              <img
                src="https://www.ustp.edu.ph/wp-content/uploads/2023/11/USTP-Logo-against-Light-Background-273x300.png"
                alt="University of Science and Technology of Southern Philippines logo"
                className="about-university-logo"
                loading="lazy"
              />
            </div>
            <div>
              <p className="about-education-overline">Bachelor of Science in Information Technology</p>
              <h2>University of Science and Technology of Southern Philippines</h2>
              <p className="about-education-note">Formal IT foundation supporting my work across software development, databases, systems analysis, and interface design.</p>
            </div>
          </div>
        </section>

        <section className="about-section about-services-section">
          <div className="about-services-heading">
            <p className="v2-kicker">What I do</p>
            <h2>Development and design, treated as one product problem.</h2>
          </div>
          <div className="about-services-grid">
            {services.map(({ icon: Icon, label }, index) => (
              <article className="about-service-card-v2" key={label}>
                <span>0{index + 1}</span>
                <Icon size={21} aria-hidden="true" />
                <h3>{label}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section about-stack-section">
          <p className="v2-kicker">Stack</p>
          <h2>Tools I work with</h2>
          <p className="about-stack-copy">Technology is chosen around the workflow, data, deployment needs, and maintainability of the system—not just what looks impressive in a stack list.</p>
          <InteractiveToolGrid />
        </section>

        <section className="about-section about-final-cta">
          <p className="v2-kicker">Explore the work</p>
          <h2>See how the process turns into real systems.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="v2-button v2-button-primary">View projects <ArrowUpRight size={16} /></Link>
            <Link href="/contact" className="v2-button">Contact me</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
