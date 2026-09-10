import { Hero } from "@/components/home/Hero";
import { InteractiveProjectReel } from "@/components/home/InteractiveProjectReel";
import { RBIMFeature } from "@/components/home/SystemWork";
import { ArchitectureFeature } from "@/components/home/WebsiteWork";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { ProjectStarter } from "@/components/home/ProjectStarter";
import { HomeCTA } from "@/components/home/HomeCTA";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata = {
  ...pageMetadata("Full-Stack Developer & UI/UX Designer", site.headline, "/"),
  title: `${site.name} | Full-Stack Developer & UI/UX Designer`,
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <InteractiveProjectReel />
      <RBIMFeature />
      <ArchitectureFeature />
      <HomeAbout />
      <HomeCapabilities />
      <ProjectStarter />
      <HomeCTA />
    </main>
  );
}
