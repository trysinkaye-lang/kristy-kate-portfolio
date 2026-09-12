import { Hero } from "@/components/home/Hero";
import { RBIMFeature, AHDISFeature, ERPFeature } from "@/components/home/SystemWork";
import { ArchitectureFeature, RealEstateFeature, BrandFeature } from "@/components/home/WebsiteWork";
import { DesignArchive } from "@/components/home/DesignArchive";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import styles from "@/components/home/home.module.css";
export const metadata = { ...pageMetadata("Full-Stack Developer & UI/UX Designer", site.headline, "/"), title: `${site.name} | Full-Stack Developer & UI/UX Designer` };
export default function Home() {
  return <main id="main-content" tabIndex={-1}><Hero /><section id="work" aria-labelledby="work-title">
    <div className={`shell ${styles.workIntro}`}>
      <div className={styles.workHeading}><h2 id="work-title">Selected work<span className={styles.workCount}> / {String(projects.length).padStart(2, "0")}</span></h2><p>Community records to creative websites.<br /> A closer look at what I build.</p></div>
      <nav className={styles.workIndex} aria-label="Selected projects">{projects.map((project, index) => <a key={project.slug} href={`#work-${project.slug}`}><span>{String(index + 1).padStart(2, "0")}</span>{project.slug === "design-systems" ? "Design archive" : project.shortTitle}</a>)}</nav>
    </div>
    <RBIMFeature /><ArchitectureFeature /><AHDISFeature /><RealEstateFeature /><BrandFeature /><ERPFeature /><DesignArchive />
  </section><HomeAbout /><HomeCapabilities /><HomeCTA /></main>;
}
