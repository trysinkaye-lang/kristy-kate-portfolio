import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroLanding.module.css";

const capabilities = ["Information systems", "Creative development", "UI/UX", "Full-stack"];

const featuredProjects = [
  { index: "01", name: "RBIM", href: "#work-rbim" },
  { index: "02", name: "C.O. Designs", href: "#work-co-designs" },
  { index: "03", name: "AHDIS", href: "#work-ahdis" },
  { index: "04", name: "Marci Metzger", href: "#work-marci-metzger" },
] as const;

export function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="identity">
      <div className={`shell ${styles.heroTop}`}>
        <p className={styles.eyebrow}>Portfolio / 2026</p>
        <p className={styles.availabilityStatus}><span aria-hidden="true" /> Available for selected work</p>
      </div>

      <div className={`shell ${styles.heroStage}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>Full-stack development · UI/UX · Information systems</p>
          <h1 id="identity" className={styles.identity}>
            <span>Useful systems.</span>
            <em>Sharp interfaces.</em>
          </h1>

          <div className={styles.heroLead}>
            <p>I design and build digital products that make complex work clearer—from information systems and desktop applications to custom websites.</p>
            <div className={styles.heroActions}>
              <Link href="#work" className={styles.primaryAction} data-magnetic="true">Explore work <span aria-hidden="true">↓</span></Link>
              <Link href="/contact" className={styles.textAction}>Start a project <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>

        <nav className={styles.projectDeck} aria-label="Featured projects">
          <div className={styles.deckHeader}>
            <span>Selected work</span>
            <strong>04</strong>
          </div>
          {featuredProjects.map((project) => (
            <Link key={project.href} href={project.href} className={styles.projectLink}>
              <span className={styles.projectNumber}>{project.index}</span>
              <span className={styles.projectName}>{project.name}</span>
              <span className={styles.projectArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
          <p className={styles.deckNote}>Jump straight into a project, or scroll for the full visual gallery.</p>
        </nav>
      </div>

      <div className={styles.capabilityRail} aria-label="Core capabilities">
        <div className={styles.capabilityViewport}>
          <div className={styles.capabilityTrack}>
            <div className={styles.capabilityGroup}>
              {capabilities.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className={styles.capabilityGroup} aria-hidden="true">
              {capabilities.map((item) => <span key={`duplicate-${item}`}>{item}</span>)}
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url,
        jobTitle: ["Full-Stack Developer", "UI/UX Designer", "Creative Developer"],
        sameAs: [site.github], knowsAbout: ["Information systems", "UI/UX", "Web development", "Databases", "Desktop applications"],
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Science and Technology of Southern Philippines" },
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
