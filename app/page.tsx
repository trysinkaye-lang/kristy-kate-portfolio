import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ScrollFeature } from "@/components/sections/ScrollFeature";
import { DesignSection } from "@/components/sections/DesignSection";
import { UIUXShowcase } from "@/components/sections/UIUXShowcase";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { SkillsExperience } from "@/components/sections/SkillsExperience";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { ResumeContact } from "@/components/sections/ResumeContact";
import { BackToTop } from "@/components/layout/BackToTop";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Services />
      <ProjectsSection />
      <ScrollFeature />
      <DesignSection />
      <UIUXShowcase />
      <TechStack />
      <Process />
      <SkillsExperience />
      <GitHubSection />
      <ResumeContact />
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        Designed and developed as a software + design portfolio.
      </footer>
      <BackToTop />
    </main>
  );
}
