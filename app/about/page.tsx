import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Database, Figma, GraduationCap, Layers3, MonitorSmartphone } from "lucide-react";
import { InteractiveToolGrid } from "@/components/InteractiveToolGrid";
import styles from "./about.module.css";

const methods = [
  {
    number: "01",
    title: "Understand the real workflow",
    detail: "I start with how people actually work: the data they handle, the decisions they make, the permissions they need, and where friction happens.",
  },
  {
    number: "02",
    title: "Structure the system clearly",
    detail: "I organize requirements, records, relationships, business rules, access boundaries, and data flows before turning them into screens and features.",
  },
  {
    number: "03",
    title: "Design for usability and integrity",
    detail: "I focus on readable hierarchy, predictable interactions, responsive layouts, validation, and interfaces that reduce cognitive load and data-entry errors.",
  },
  {
    number: "04",
    title: "Build, test, deploy, refine",
    detail: "I develop iteratively, verify behavior across devices and environments, harden releases, and improve details based on how the system behaves in practice.",
  },
];

const services = [
  { icon: MonitorSmartphone, label: "Full-Stack Development" },
  { icon: Layers3, label: "Information Systems" },
  { icon: Figma, label: "UI/UX Design" },
  { icon: Database, label: "Database & Data Workflows" },
];

export default function AboutPage() {
  return (
    <main id="main-content" className={`${styles.page} min-h-screen`}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.portraitColumn}>
            <div className={styles.portraitFrame}>
              <Image
                src="/media/kristy-kate-professional-portrait-v2.webp"
                alt="Kristy Kate Taylor"
                fill
                priority
                className={styles.portrait}
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 36vw, 360px"
              />
              <div className={styles.portraitLabel} aria-hidden="true">
                <strong>Kristy Kate Taylor</strong>
                <span>Full-Stack Developer + Designer</span>
              </div>
            </div>
          </div>

          <div className={styles.intro}>
            <p className={styles.eyebrow}>Full-Stack Software Developer · UI/UX Designer</p>
            <h1 className={styles.title}>
              Hello, I&apos;m <span className={styles.titleAccent}>Kristy Kate.</span>
            </h1>

            <div className={styles.copy}>
              <p>I&apos;m a full-stack software developer and UI/UX designer focused on building clear, reliable systems for real people and real operational workflows.</p>
              <p>My work spans React and Next.js interfaces, Node.js and REST APIs, PostgreSQL and SQLite databases, Tauri/Rust desktop applications, responsive websites, testing, deployment, and production hardening.</p>
              <p>Recent work includes RBIM Hybrid, where I&apos;ve been developing an offline-to-online information platform with desktop and web surfaces, role-based access, validation, reporting, synchronization workflows, Barangay Supervisor review controls, and production deployment configuration.</p>
              <p>I care about software that is not only visually polished, but also maintainable, secure, understandable, and practical to operate.</p>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionLabel} data-index="01">How I work</p>
              <h2 className={styles.sectionTitle}>From messy requirements to a production-ready workflow.</h2>
            </div>
            <p className={styles.sectionLead}>
              Clear requirements, structured data, usable interaction, careful implementation, verification, and deployment discipline.
            </p>
          </div>

          <div className={styles.methodGrid}>
            {methods.map((item) => (
              <article className={styles.methodCard} key={item.number}>
                <span className={styles.methodNumber}>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.educationCard}>
            <div className={styles.educationIcon}>
              <GraduationCap size={26} aria-hidden="true" />
            </div>
            <div className={styles.educationMeta}>
              <p className={styles.sectionLabel} data-index="02">Education</p>
              <h2>University of Science and Technology of Southern Philippines</h2>
              <p>Bachelor of Science in Information Technology</p>
            </div>
            <span className={styles.educationTag}>BS Information Technology</span>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionLabel} data-index="03">Capabilities</p>
              <h2 className={styles.sectionTitle}>What I bring to a product.</h2>
            </div>
            <p className={styles.sectionLead}>Frontend, backend, data, desktop, deployment, and design treated as parts of one delivery workflow.</p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map(({ icon: Icon, label }) => (
              <div className={styles.serviceCard} key={label}>
                <div className={styles.serviceIcon}>
                  <Icon size={21} aria-hidden="true" />
                </div>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.toolboxPanel}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionLabel} data-index="04">Toolbox</p>
                <h2 className={styles.sectionTitle}>Tools I work with</h2>
              </div>
              <p className={styles.sectionLead}>Select a tool to see how it fits into my development and design workflow.</p>
            </div>
            <InteractiveToolGrid />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Want to see how this approach turns into real systems?</h2>
            <div className={styles.ctaActions}>
              <Link href="/projects" className="v2-button v2-button-primary">View projects <ArrowUpRight size={16} /></Link>
              <Link href="/contact" className="v2-button">Contact me</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
