import { Hero } from "@/components/home/Hero";
import { ParticleField } from "@/components/home/ParticleField";
import { ProjectDriftWall } from "@/components/home/ProjectDriftWall";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import styles from "@/components/home/HomeEditorial.module.css";

export const metadata = {
  ...pageMetadata("Software Developer", "Kristy Kate Taylor — software developer building desktop and web applications.", "/"),
  title: site.name + " | Software Developer",
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.motionPage}>
      <ParticleField />
      <Hero />
      <section id="work" data-particle-scene="work" className={styles.work} aria-labelledby="work-title">
        <div className="shell">
          <div className={styles.workHeader}>
            <div><h2 id="work-title">Selected work.</h2></div>
            <p>Real software, information systems, and websites — shown in full.</p>
          </div>
          <ProjectDriftWall />
        </div>
      </section>
      <div data-particle-scene="ambientAbout"><HomeAbout /></div>
      <div data-particle-scene="ambientServices"><HomeCapabilities /></div>
      <HomeCTA />
    </main>
  );
}
