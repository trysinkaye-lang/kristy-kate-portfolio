import Link from "next/link";
import { site } from "@/data/site";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <div id="home" className={styles.journey}>
      <section data-particle-scene="portrait" className={styles.opening} aria-labelledby="identity">
        <div className={styles.heroLabels}>
          <h1 id="identity">Kristy Kate Taylor</h1>
          <p>Software & Web Developer</p>
        </div>
        <div className={styles.openingBottom}>
          <span>PORTFOLIO © 2026</span>
          <a href="#introduction">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>

      <section id="introduction" data-particle-scene="portraitRight" className={styles.introduction} aria-label="An introduction">
        <div className={styles.introductionCopy}>
          <p>I build websites, web applications, and offline desktop software — from the experience people see to the functionality and data behind it.</p>
          <Link href="#work" className={styles.quietLink}>Explore my work ↗</Link>
        </div>
      </section>

      <section data-particle-scene="sphere" className={styles.spherePanel} aria-label="Working remotely">
        <svg className={styles.sphereType} viewBox="0 0 900 900" aria-hidden="true">
          <defs>
            <path id="orbit-above" d="M 150,420 A 306,306 0 0,1 750,420"/>
            <path id="orbit-below" d="M 150,490 A 306,306 0 0,0 750,490"/>
          </defs>
          <text><textPath href="#orbit-above" startOffset="28%">Available remotely</textPath></text>
          <text><textPath href="#orbit-below" startOffset="29%">Working worldwide</textPath></text>
        </svg>
        <p className={styles.sphereCaption}>DESIGN & DEVELOPMENT WITHOUT BORDERS</p>
      </section>

      <section data-particle-scene="philippines" className={styles.locationPanel} aria-labelledby="location-title">
        <p id="location-title">Based in the Philippines<span className={styles.lightDot} /></p>
      </section>

      <section data-particle-scene="ribbon" className={styles.ribbonPanel} aria-label="How I work">
        <p>I don&apos;t just make interfaces look good. I build the systems, data structures, and functionality that make them work.</p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"Person",name:site.name,url:site.url,
        jobTitle:["Software Developer","Web Developer","Full-Stack Developer"],
        sameAs:[site.github],knowsAbout:["Websites","Web applications","Desktop software","Information systems"]
      }).replace(/</g,"\\u003c") }}/>
    </div>
  );
}
