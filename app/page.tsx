import { Hero } from "@/components/home/Hero";
import { RBIMFeature, AHDISFeature, ERPFeature } from "@/components/home/SystemWork";
import { ArchitectureFeature, RealEstateFeature, BrandFeature } from "@/components/home/WebsiteWork";
import { DesignArchive } from "@/components/home/DesignArchive";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import styles from "@/components/home/home.module.css";
export const metadata = { ...pageMetadata("Full-Stack Developer & UI/UX Designer", site.headline, "/"), title: `${site.name} | Full-Stack Developer & UI/UX Designer` };
export default function Home() {
  return <main id="main-content" tabIndex={-1}><Hero /><section id="work" aria-labelledby="work-title">
    <div className={`shell ${styles.workIntro}`}><h2 id="work-title">Selected work<span className={styles.workCount}> / 07</span></h2><p>Systems that serve a purpose.<br />Websites with a point of view.</p></div>
    <RBIMFeature /><ArchitectureFeature /><AHDISFeature /><RealEstateFeature /><BrandFeature /><ERPFeature /><DesignArchive />
  </section><HomeAbout /><HomeCapabilities /><HomeCTA /></main>;
}
