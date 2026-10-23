import { Hero } from "@/components/home/Hero";
import { ProjectDriftWall } from "@/components/home/ProjectDriftWall";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import styles from "@/components/home/home.module.css";

export const metadata = {
  ...pageMetadata("Full-Stack Developer & UI/UX Designer", site.headline, "/"),
  title: site.name + " | Full-Stack Developer & UI/UX Designer",
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <section id="work" aria-labelledby="work-title">
        <div className={["shell", styles.workIntro].join(" ")}>
          <div className={styles.workHeading}>
            <div>
              <p className="eyebrow">01 / Portfolio</p>
              <h2 id="work-title">Projects</h2>
            </div>
            <p>Software systems and websites built with a focus on usability, reliability, and clear design.</p>
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
