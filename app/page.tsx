import { Hero } from "@/components/home/Hero";
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
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className="shell">
          <div className={styles.workHeader}>
            <div>
              <p className={styles.marker}>WORK / 01</p>
              <h2 id="work-title">Some selected<br/>work.</h2>
            </div>
            <p>From offline information systems to websites and web applications. A selection of things I've designed and built.</p>
          </div>
          <ProjectDriftWall />
        </div>
      </section>
      <HomeAbout />
      <HomeCapabilities />
      <HomeCTA />
    </main>
  );
}
