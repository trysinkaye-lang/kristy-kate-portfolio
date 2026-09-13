import { Hero } from "@/components/home/Hero";
import { ProjectDriftWall } from "@/components/home/ProjectDriftWall";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeCTA } from "@/components/home/HomeCTA";
import { PortfolioMotion } from "@/components/effects/PortfolioMotion";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import styles from "@/components/home/home.module.css";

export const metadata = {
  ...pageMetadata("Full-Stack Developer & UI/UX Designer", site.headline, "/"),
  title: `${site.name} | Full-Stack Developer & UI/UX Designer`,
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PortfolioMotion />
      <Hero />
      <section id="work" aria-labelledby="work-title">
        <div className={`shell ${styles.workIntro}`}>
          <div className={styles.workHeading}>
            <h2 id="work-title">
              Selected work<span className={styles.workCount}> / 04</span>
            </h2>
            <p>Four projects. One visual index. Open any tile for the full case study.</p>
          </div>
        </div>
        <ProjectDriftWall />
      </section>
      <HomeAbout />
      <HomeCapabilities />
      <HomeCTA />
    </main>
  );
}
