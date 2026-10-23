import Image from "next/image";
import Link from "next/link";
import { stack } from "@/data/site";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/styles/about-editorial.module.css";

export const metadata = pageMetadata(
  "About",
  "Kristy Kate Taylor is a software developer working on information systems, desktop applications and websites.",
  "/about",
);

const currentWork = [
  { name: "RBIM", href: "/projects/rbim", description: "Household records, municipal reporting, offline and online access" },
  { name: "AHDIS", href: "/projects/ahdis", description: "Offline adolescent health records and reporting" },
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className={["shell", styles.about].join(" ")} aria-labelledby="about-heading">
        <div className={styles.head}>
          <p className={styles.eyebrow}>About / Kristy Kate Taylor</p>
          <h1 id="about-heading">A little about me.</h1>
        </div>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.lead}>I work on the interface people see and the system that makes it work.</p>
            <p>I graduated with a BS in Information Technology from the University of Science and Technology of Southern Philippines (USTP).</p>
            <p>My development work spans desktop and web applications: forms, data models, reporting, role-based access, and the details that make software easier to use.</p>
            <p>RBIM and AHDIS are two examples of that work. Both involve handling structured records and making information useful for the people who need it.</p>
            <div className={styles.actions}>
              <Link href="/projects">Projects <span aria-hidden="true">↗</span></Link>
              <Link href="/contact">Contact <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <figure className={styles.portrait}>
            <Image src="/media/kristy-kate-professional-portrait-v2.webp"
              width={960} height={960} priority
              alt="Professional portrait of Kristy Kate Taylor"
              sizes="(max-width: 767px) 60vw, 350px" />
            <figcaption>Kristy Kate Taylor / Philippines</figcaption>
          </figure>
        </div>
      </section>
      <section className={styles.current} aria-labelledby="current-heading">
        <div className="shell">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Selected systems</p>
            <h2 id="current-heading">Work in focus</h2>
          </div>
          <div className={styles.rows}>
            {currentWork.map((item,index) => (
              <Link href={item.href} key={item.name}>
                <span>{String(index+1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={["shell",styles.tools].join(" ")} aria-labelledby="tools-title">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Tools and technology</p>
          <h2 id="tools-title">What I use</h2>
        </div>
        <dl>
          {Object.entries(stack).map(([label, items]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{items.join(" / ")}</dd>
            </div>
          ))}
        </dl>
      </section>
      <HomeCTA />
    </main>
  );
}
