import Image from "next/image";
import Link from "next/link";
import { stack } from "@/data/site";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/pages.module.css";

export const metadata = pageMetadata(
  "About",
  "Learn about Kristy Kate Taylor, a software developer focused on information systems, desktop applications, full-stack development, and thoughtful interfaces.",
  "/about",
);

const process = [
  ["Understand", "I start by understanding the people, the workflow, and what the software actually needs to do."],
  ["Design", "I organize data and screens into simple, predictable experiences that help people complete their work."],
  ["Build", "I develop the interface, application logic, and database together, with reliability in mind."],
  ["Improve", "I test the full workflow, collect feedback, and refine what can work better."],
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className={["shell", styles.page, styles.aboutPage].join(" ")}>
        <div className={styles.aboutOpening}>
          <div className={styles.aboutIntro}>
            <p className="eyebrow">About / Kristy Kate Taylor</p>
            <h1>About me.</h1>
            <p className={styles.aboutLead}>
              I&apos;m a software developer who enjoys making complex systems easier to use.
            </p>
            <p>
              From information systems and desktop applications to websites, I work on both
              how software functions and how it feels to the people using it.
            </p>
            <div className={styles.aboutLinks}>
              <Link href="/projects" className="text-link">View projects <span aria-hidden="true">↗</span></Link>
              <Link href="/contact" className="text-link">Contact me <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <figure>
            <Image
              src="/media/kristy-kate-professional-portrait-v2.webp"
              width={960}
              height={960}
              alt="Professional portrait of Kristy Kate Taylor"
              priority
              sizes="(max-width: 767px) 78vw, (max-width: 1100px) 34vw, 370px"
            />
            <figcaption>Kristy Kate Taylor · Philippines</figcaption>
          </figure>
        </div>

        <div className={styles.biography}>
          <div>
            <p className="eyebrow">Background</p>
            <h2>Technology with purpose.</h2>
          </div>
          <div>
            <p>I graduated with a BS in Information Technology from the University of Science and Technology of Southern Philippines (USTP).</p>
            <p>My development work includes RBIM, a registry for household and population records, and AHDIS, a desktop information system for adolescent health and development data.</p>
            <p>I&apos;m interested in full-stack development, reliable data workflows, and interfaces that feel simple even when the systems behind them are complex.</p>
          </div>
        </div>
      </section>

      <section className={styles.method} aria-labelledby="approach-title">
        <div className="shell">
          <p className="eyebrow">Process</p>
          <h2 id="approach-title" className={styles.sectionHeading}>How I work</h2>
          <div className={styles.methodRows}>
            {process.map(([title, copy], index) => (
              <div key={title}>
                <span className={styles.methodNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={["shell", styles.toolbox].join(" ")} aria-labelledby="tools-title">
        <div>
          <p className="eyebrow">Technology</p>
          <h2 id="tools-title">Tools &amp; skills</h2>
        </div>
        <dl>
          {Object.entries(stack).map(([label, items]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <HomeCTA />
    </main>
  );
}
