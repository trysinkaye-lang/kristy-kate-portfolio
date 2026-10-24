import Link from "next/link";
import { site } from "@/data/site";
import { ParticleField } from "./ParticleField";
import styles from "./HeroRefresh.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.journey} aria-labelledby="identity">
      <ParticleField />
      <div className={styles.chapterOne}>
        <div className={["shell", styles.chapterShell].join(" ")}>
          <div className={styles.eyebrowRow}>
            <span>KRISTY KATE TAYLOR®</span>
            <span>SOFTWARE / WEB DEVELOPMENT</span>
          </div>

          <div className={styles.heroBody}>
            <div className={styles.copy}>
              <p className={styles.kicker}><span className={styles.liveDot} /> HELLO, I'M KRISTY KATE</p>
              <h1 id="identity" className={styles.heading}>Creative thinking.<br/><em>Practical code.</em></h1>
              <p className={styles.role}>Software & web developer</p>
              <p className={styles.lead}>I develop websites, web applications, and offline desktop software — thoughtfully built from the interface to the logic and data behind it.</p>
              <div className={styles.actions}>
                <Link href="#work" className={styles.action}>Explore my work <span aria-hidden="true">↗</span></Link>
                <Link href="/contact" className={styles.action}>Get in touch <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
            <div className={styles.portraitNote} aria-hidden="true">
              <span>01 / 03</span>
              <span>AN INTRODUCTION<br/>IN MOTION</span>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <span>PHILIPPINES — AVAILABLE FOR REMOTE WORK</span>
            <span className={styles.scrollHint}>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
          </div>
        </div>
      </div>

      <div className={styles.chapterTwo} id="approach" data-motion-section>
        <div className={["shell", styles.storyShell].join(" ")}>
          <div className={styles.storyNumber}>02 / 03 <span>BEYOND THE SURFACE</span></div>
          <div className={styles.storyText}>
            <p className={styles.storyEyebrow}>WHAT I DO</p>
            <h2>More than<br/><em>what you see.</em></h2>
            <p>A polished interface is just the beginning. I build the functionality, database workflows, reporting tools, and real-world systems that make it useful.</p>
            <div className={styles.storyLinks}>
              <span>WEB APPLICATIONS</span><span>DESKTOP SOFTWARE</span><span>INFORMATION SYSTEMS</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chapterThree}>
        <div className={["shell", styles.endShell].join(" ")}>
          <span>03 / 03 — SELECTED PROJECTS</span>
          <Link href="#work">Explore the work <span aria-hidden="true">↘</span></Link>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"Person",name:site.name,url:site.url,
        jobTitle:["Software Developer","Web Developer","Full-Stack Developer"],sameAs:[site.github],
        knowsAbout:["Websites","Web applications","Offline desktop software","Information systems","Data reporting"]
      }).replace(/</g, "\\u003c") }} />
    </section>
  );
}
