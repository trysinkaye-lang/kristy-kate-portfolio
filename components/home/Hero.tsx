import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./home.module.css";

export function Hero() {
  return (
    <section id="home" className={`shell ${styles.hero}`} aria-labelledby="identity">
      <div className={styles.heroTop}>
        <p className="eyebrow">Developer & designer</p>
        <p className="caption"><span className={styles.portfolioLabel}>Independent portfolio <span aria-hidden="true">/</span></span> Philippines</p>
      </div>
      <div className={styles.heroComposition}>
        <h1 id="identity" className={styles.identity}>
          <span className={styles.identityLine}><span>Kristy Kate</span></span>
          <span className={`${styles.identityLine} ${styles.surname}`}><span>Taylor<span className={styles.period}>.</span></span></span>
        </h1>
        <div className={styles.heroDetails}>
          <div className={styles.roles}>
            <p>Full-Stack Developer</p>
            <p>UI/UX Designer</p>
            <p>Creative Developer</p>
          </div>
          <p className={styles.heroNote}>I build information systems and websites—from the structure of the data to the details people use.</p>
        </div>
        <figure className={styles.portrait}>
          <div className={styles.portraitFrame}>
            <Image src="/media/kristy-kate-professional-portrait-v2.webp" alt="Kristy Kate Taylor" width={960} height={960} preload sizes="(max-width: 767px) 40vw, (max-width: 1100px) 30vw, 310px" />
          </div>
          <figcaption><span>Design with purpose.</span><span>Build with care.</span></figcaption>
        </figure>
      </div>
      <div className={styles.heroBottom}>
        <Link href="#work" className={styles.workButton}>View selected work <span aria-hidden="true">↓</span></Link>
        <p className={styles.availability}>Open to freelance, contract<br /> & full-time opportunities</p>
        <Link href="/contact" className="text-link">Let’s talk <span aria-hidden="true">↗</span></Link>
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
