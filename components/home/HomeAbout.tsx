import Link from "next/link";
import styles from "./home.module.css";

export function HomeAbout() {
  return (
    <section id="about" className={`shell ${styles.about}`} aria-labelledby="about-title">
      <p className="eyebrow">About</p>
      <div className={styles.aboutGrid}>
        <h2 id="about-title">Design makes it clear.<br /><span>Engineering makes it work.</span></h2>
        <div className={styles.aboutCopy}>
          <p>I’m Kristy, a developer and designer in the Philippines building information systems, desktop applications, and custom websites.</p>
          <Link href="/about" className="text-link">More about me <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
