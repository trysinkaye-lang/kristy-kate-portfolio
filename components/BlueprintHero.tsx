"use client";

import Link from "next/link";
import { ArrowRight, Database, Github, LayoutDashboard, Mail, PenTool } from "lucide-react";
import { site } from "@/data/site";
import "./blueprint-hero.css";

export function BlueprintHero() {
  return (
    <section id="home" className="blueprint-hero" aria-label="Portfolio introduction">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="portfolio-shell hero-layout">
        <div className="hero-copy">
          <div className="hero-status">
            <span className="hero-status-dot" />
            Available for opportunities
          </div>

          <p className="hero-kicker">Kristy Kate Taylor · Software Developer</p>
          <h1>
            I build software that makes complex work <span>simpler.</span>
          </h1>
          <p className="hero-description">
            I develop practical information systems, responsive web applications, and clear interfaces—from requirements and database structure to the final user experience.
          </p>

          <div className="hero-actions">
            <Link href="/projects" className="hero-primary">
              View my projects <ArrowRight size={17} />
            </Link>
            <Link href="/contact" className="hero-secondary">
              <Mail size={16} /> Contact me
            </Link>
          </div>

          <div className="hero-links">
            <a href={site.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            <a href={`mailto:${site.email}`}><Mail size={15} /> {site.email}</a>
          </div>
        </div>

        <div className="hero-showcase" aria-label="Kristy Kate portfolio overview">
          <div className="hero-showcase-glow" aria-hidden="true" />

          <div className="hero-profile-card">
            <div className="hero-profile-topbar">
              <span>PORTFOLIO / PROFILE</span>
              <strong>ONLINE</strong>
            </div>

            <div className="hero-profile-body">
              <div className="hero-photo-wrap">
                <img
                  src="/media/kristy-kate-professional-portrait-v2.webp"
                  alt="Kristy Kate Taylor"
                  width={720}
                  height={860}
                  loading="eager"
                  fetchPriority="high"
                  draggable={false}
                />
              </div>

              <div className="hero-profile-copy">
                <span className="hero-profile-label">What I do</span>
                <h2>Systems, web apps, and UI/UX.</h2>
                <p>Building reliable digital tools for real workflows and real users.</p>
                <div className="hero-stack">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>PostgreSQL</span>
                  <span>UI/UX</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-floating-card hero-card-one">
            <Database size={18} />
            <div><strong>Information Systems</strong><small>Data · Workflows · Reports</small></div>
          </div>

          <div className="hero-floating-card hero-card-two">
            <LayoutDashboard size={18} />
            <div><strong>Web Applications</strong><small>Responsive · Practical · Clear</small></div>
          </div>

          <div className="hero-floating-card hero-card-three">
            <PenTool size={18} />
            <div><strong>UI/UX Design</strong><small>Readable · Consistent · Usable</small></div>
          </div>
        </div>
      </div>
    </section>
  );
}
