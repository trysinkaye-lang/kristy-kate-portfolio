import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { SkillsExperience } from "@/components/sections/SkillsExperience";
import { DesignSection } from "@/components/sections/DesignSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { ResumeContact } from "@/components/sections/ResumeContact";
import { BackToTop } from "@/components/layout/BackToTop";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ProjectsSection />
      <About />
      <TechStack />
      <SkillsExperience />
      <DesignSection />
      <GitHubSection />
      <ResumeContact />
      <footer className="border-t border-white/8 px-6 py-8 text-center text-sm text-slate-500">
        Kristy Kate Taylor · Software Developer & UI/UX Designer
      </footer>
      <BackToTop />
    </main>
  );
}
