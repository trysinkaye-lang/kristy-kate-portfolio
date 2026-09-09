import { ArrowUpRight, Github, Mail } from "lucide-react";
import { site } from "@/data/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";

export function HomeCTA() {
  return (
    <section className="home-flow-section home-conversion" aria-labelledby="home-contact-title">
      <div className="portfolio-shell">
        <div className="home-conversion-panel">
          <p className="v2-kicker">Next step</p>
          <div className="home-conversion-grid">
            <div>
              <h2 id="home-contact-title" className="section-title text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl lg:text-6xl">Have an idea? Let&apos;s build it.</h2>
              <p className="home-section-lede mt-5 max-w-2xl">Website project, full-stack system, interface redesign, or creative development experiment—I&apos;m open to work where design and implementation both matter.</p>
            </div>

            <div className="home-conversion-actions">
              <TrackedLink href="/contact" eventName="home_contact_click" eventData={{ source: "home_final_cta" }} className="v2-button v2-button-primary">Get In Touch <ArrowUpRight size={16} /></TrackedLink>
              <TrackedLink href={`mailto:${site.email}`} eventName="contact_email_click" eventData={{ source: "home_final_cta" }} className="v2-button"><Mail size={15} /> Email Me</TrackedLink>
              <TrackedLink href={site.github} eventName="github_click" eventData={{ source: "home_final_cta" }} className="v2-button" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
