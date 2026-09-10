import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import styles from "./home.module.css";
export function Hero() {
  return <section id="home" className={`shell ${styles.hero}`} aria-labelledby="identity">
    <div className={styles.heroTop}><p className="eyebrow">Independent portfolio</p><p className="caption">Design & engineering · Philippines</p></div>
    <div className={styles.heroComposition}>
      <h1 id="identity" className={styles.identity}>Kristy Kate<br /><span>Taylor</span><span className={styles.period}>.</span></h1>
      <figure className={styles.portrait}><Image src="/media/kristy-kate-professional-portrait-v2.webp" alt="Kristy Kate Taylor" width={960} height={960} priority sizes="(max-width: 767px) 42vw, (max-width: 1100px) 30vw, 370px" /><figcaption>Thoughtful by design.<br />Practical by nature.</figcaption></figure>
      <p className={styles.heroNote}>From the structure of a database<br className={styles.desktopBreak} /> to the detail of an interface.</p>
      <div className={styles.roles}><p>Full-Stack Developer</p><p>UI/UX Designer</p><p>Creative Developer</p></div>
    </div>
    <div className={styles.heroBottom}><Link href="#work" className="text-link">View selected work <span aria-hidden="true">↓</span></Link><p className={styles.availability}>Available for freelance, contract<br />{" "}& full-time opportunities</p><Link href="/contact" className="text-link">Contact <span aria-hidden="true">↗</span></Link></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: site.name, url: site.url, jobTitle: ["Full-Stack Developer", "UI/UX Designer", "Creative Developer"], sameAs: [site.github], knowsAbout: ["Information systems", "UI/UX", "Web development", "Databases", "Desktop applications"] }).replace(/</g, "\\u003c") }} />
  </section>;
}
