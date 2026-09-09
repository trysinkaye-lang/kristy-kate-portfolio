"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import "./blueprint-hero.css";
import "./home-scroll-fix.css";
import "./home-hero-breathing-room.css";

export function BlueprintHero() {
  return (
    <section id="home" className="home-cover home-cover-clean" aria-label="Portfolio home">
      <div className="cover-sticky">
        <div className="cover-noise" aria-hidden="true" />
        <div className="cover-grid" aria-hidden="true" />
        <div className="cover-light" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-a" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-b" aria-hidden="true" />

        <div className="portfolio-shell cover-shell">
          <div className="cover-professional-layout">
            <div className="cover-identity">
              <span className="cover-name">{site.name}</span>
              <span className="cover-identity-divider" aria-hidden="true" />
              <span className="cover-role">{site.title}</span>
            </div>

            <div className="cover-headline-block">
              <h1>
                <span className="cover-line-a">DEVELOPER</span>
                <em className="cover-line-b">&amp; DESIGNER.</em>
              </h1>

              <div className="cover-intro-column">
                <p className="cover-signature">{site.headline}</p>

                <div className="cover-actions">
                  <TrackedLink
                    href="/projects"
                    eventName="home_view_projects"
                    eventData={{ source: "hero" }}
                    className="v2-button v2-button-primary"
                  >
                    View My Work <ArrowUpRight size={16} />
                  </TrackedLink>

                  <TrackedLink
                    href="/contact"
                    eventName="home_contact_click"
                    eventData={{ source: "hero" }}
                    className="v2-button"
                  >
                    Contact Me
                  </TrackedLink>
                </div>
              </div>
            </div>

            <div className="cover-proof" aria-label="Core portfolio disciplines">
              <span>Website Design</span>
              <span>Full-Stack Development</span>
              <span>Information Systems</span>
              <span>Responsive Interfaces</span>
            </div>
          </div>
        </div>

        <div className="cover-scroll-cue" aria-hidden="true">
          <ArrowDown size={16} /> Selected work
        </div>
      </div>
    </section>
  );
}
