import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

export function HomeAbout() {
  return (
    <section id="about" className={`shell ${styles.about}`} aria-labelledby="about-title">
      <p className="eyebrow">Between systems and experience</p>
      <div className={styles.aboutGrid}>
        <h2 id="about-title">
          I work on two kinds of problems:<br />
          <span>products that need clarity<br />and brands that need presence.</span>
        </h2>
        <div className={styles.aboutCopy}>
          <Image src="/media/kristy-kate-professional-portrait-v2.webp" width={960} height={960} alt="Kristy Kate Taylor, developer and designer" sizes="160px" />
          <p>I’m a BS Information Technology graduate working across full-stack development, information systems, UI/UX, websites, databases, and desktop applications.</p>
          <p>For software, I care about workflows, validation, maintainability, and trustworthy data. For websites, I care about hierarchy, identity, interaction, and whether the experience gives people a reason to stay.</p>
          <Link href="/about" className="text-link">How I approach a project <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
