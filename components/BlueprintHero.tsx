"use client";

import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { site } from "@/data/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import "./blueprint-hero.css";
import "./home-scroll-fix.css";
import "./home-hero-breathing-room.css";

const HIGGSFIELD_HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3HqpkL4qwLWJklalLjBpcIwd3mK/hf_20260909_164047_d56032a8-3616-4ad0-8353-4f0b9a422940.mp4";

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
          <div className="cover-hero-layout">
            <div className="cover-copy-column">
              <div className="cover-identity">
                <span className="cover-name">{site.name}</span>
                <span className="cover-identity-divider" aria-hidden="true" />
                <span className="cover-role">{site.title}</span>
              </div>

              <h1>
                <span className="cover-line-a">DEVELOPER</span>
                <em className="cover-line-b">&amp; DESIGNER.</em>
              </h1>

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

                {site.resume ? (
                  <TrackedLink
                    href={site.resume}
                    eventName="home_resume_click"
                    eventData={{ source: "hero" }}
                    className="v2-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </TrackedLink>
                ) : null}

                <TrackedLink
                  href="/contact"
                  eventName="home_contact_click"
                  eventData={{ source: "hero" }}
                  className="v2-button"
                >
                  Contact Me
                </TrackedLink>
              </div>

              <div className="cover-proof" aria-label="Core portfolio disciplines">
                <span>Website Design</span>
                <span>Full-Stack Development</span>
                <span>Creative Development</span>
              </div>
            </div>

            <figure className="cover-reel">
              <div className="cover-reel-topline">
                <span>HIGGSFIELD MOTION / 2026</span>
                <span className="cover-reel-status"><i aria-hidden="true" /> Playing</span>
              </div>

              <div className="cover-reel-media">
                <video
                  className="cover-reel-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Higgsfield cinematic motion reel"
                >
                  <source src={HIGGSFIELD_HERO_VIDEO} type="video/mp4" />
                  Your browser does not support the portfolio motion reel.
                </video>
                <div className="cover-reel-vignette" aria-hidden="true" />
                <div className="cover-reel-label" aria-hidden="true">
                  <Play size={14} fill="currentColor" /> Creative motion study
                </div>
              </div>

              <figcaption>
                A visible Higgsfield-generated motion layer for the portfolio—not a hidden background effect.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="cover-scroll-cue" aria-hidden="true">
          <ArrowDown size={16} /> Scroll to selected work
        </div>
      </div>
    </section>
  );
}
