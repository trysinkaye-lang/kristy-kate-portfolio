import { Hero } from "@/components/home/Hero";
import { RBIMFeature, AHDISFeature } from "@/components/home/SystemWork";
import { ArchitectureFeature, RealEstateFeature } from "@/components/home/WebsiteWork";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeCTA } from "@/components/home/HomeCTA";
import { PortfolioMotion } from "@/components/effects/PortfolioMotion";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { getProject } from "@/data/projects";
import styles from "@/components/home/home.module.css";

export const metadata = {
  ...pageMetadata("Full-Stack Developer & UI/UX Designer", site.headline, "/"),
  title: `${site.name} | Full-Stack Developer & UI/UX Designer`,
};

const featuredProjects = ["rbim", "co-designs", "ahdis", "marci-metzger"] as const;

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PortfolioMotion />
      <Hero />
      <section id="work" aria-labelledby="work-title" data-motion-section>
        <div className={`shell ${styles.workIntro}`}>
          <div className={styles.workHeading}>
            <h2 id="work-title">
              Selected work<span className={styles.workCount}> / 04</span>
            </h2>
            <p>Four projects worth a closer look.</p>
          </div>
          <nav className={styles.workIndex} aria-label="Selected projects">
            {featuredProjects.map((slug, index) => {
              const project = getProject(slug);
              return (
                <a key={slug} href={`#work-${slug}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.shortTitle}
                </a>
              );
            })}
          </nav>
        </div>
        <RBIMFeature />
        <ArchitectureFeature />
        <AHDISFeature />
        <RealEstateFeature />
      </section>
      <HomeAbout />
      <HomeCapabilities />
      <HomeCTA />
    </main>
  );
}
