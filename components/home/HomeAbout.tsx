import Link from "next/link";
import styles from "./home.module.css";

export function HomeAbout() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={`shell ${styles.aboutInner}`}>
        <p className="eyebrow">About / 05</p>
        <div className={styles.aboutGrid}>
          <h2 id="about-title">Useful first.<br /><span>Distinctive by design.</span></h2>
          <div className={styles.aboutCopy}>
            <p>I work where interface, data, and real day-to-day workflows meet.</p>
            <Link href="/about" className="text-link">More about me <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
