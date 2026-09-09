import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Database, Figma, GraduationCap, Layers3, MonitorSmartphone } from "lucide-react";
import { InteractiveToolGrid } from "@/components/InteractiveToolGrid";
import styles from "./about.module.css";

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
  { icon: MonitorSmartphone, label: "Website & Software Development" },
  { icon: Layers3, label: "Information Systems" },
  { icon: Figma, label: "UI/UX & Interaction Design" },
  { icon: Database, label: "Database & Application Structure" },
];

export default function AboutPage() {
  return (
    <main id="main-content" className={`portfolio-v2 ${styles.page}`}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.portrait}>
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              alt="Kristy Kate Taylor"
              fill
              priority
              sizes="(max-width: 700px) 260px, 300px"
            />
          </div>

          <div>
            <p className={styles.identity}>Website Designer & Developer · Full-Stack Developer</p>
            <h1 className={styles.title}>Hello, I&apos;m <span className="page-title-accent">Kristy Kate.</span></h1>
            <div className={styles.intro}>
              <p>I design and develop websites, information systems, desktop applications, and digital interfaces around real-world needs.</p>
              <p>My work combines requirements analysis, database structure, application development, responsive design, and UI/UX. I care about making complex tools feel clear, reliable, and practical.</p>
              <p>I work across both technical systems and client-facing websites, adapting the visual direction and development approach to the project instead of forcing every project into the same style.</p>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className="v2-kicker">How I work</p>
              <h2 className={styles.sectionTitle}>From requirements to a clear, usable product.</h2>
            </div>
            <p className={styles.sectionText}>A simple process: understand the real need, organize the information, design the experience, then build and refine it carefully.</p>
          </div>

          <div className={styles.processGrid}>
            {methods.map((item) => (
              <article className={styles.processCard} key={item.number}>
                <span className={styles.processNumber}>{item.number}</span>
                <div className={styles.processContent}>
                  <h3 className={styles.processTitle}>{item.title}</h3>
                  <p className={styles.processText}>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.education}>
            <div className={styles.educationIcon}><GraduationCap size={25} /></div>
            <div>
              <p className="v2-kicker">Education</p>
              <h2 className={styles.educationTitle}>University of Science and Technology of Southern Philippines</h2>
              <p className={styles.educationText}>Bachelor of Science in Information Technology</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className="v2-kicker">Capabilities</p>
              <h2 className={styles.sectionTitle}>Development and design in one workflow.</h2>
            </div>
            <p className={styles.sectionText}>I handle both the technical structure and the user-facing experience so the final product feels coherent instead of assembled from disconnected parts.</p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map(({ icon: Icon, label }) => (
              <div className={styles.serviceCard} key={label}>
                <div className={styles.serviceIcon}><Icon size={20} /></div>
                <p className={styles.serviceLabel}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.toolboxHeader}>
            <div>
              <p className="v2-kicker">Toolbox</p>
              <h2 className={styles.sectionTitle}>Tools I work with.</h2>
            </div>
            <p className={styles.sectionText}>The tools change depending on the project. I choose them based on what the product actually needs.</p>
          </div>
          <InteractiveToolGrid />
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Want to see how this approach turns into real work?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="v2-button v2-button-primary">View projects <ArrowUpRight size={16} /></Link>
            <Link href="/contact" className="v2-button">Contact me</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
