"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SplitTextLite } from "@/components/react-bits/SplitTextLite";
import { MagnetLite } from "@/components/react-bits/MagnetLite";
import { InteractiveDotGridLite } from "@/components/react-bits/InteractiveDotGridLite";
import "./hero-scroll-motion.css";

const capabilities = [
  {
    index: "01",
    title: "Information systems",
    description: "Records, workflows, reporting, and operational data shaped into clear, dependable software.",
  },
  {
    index: "02",
    title: "Web applications",
    description: "Responsive applications designed to stay usable and readable across desktop, tablet, and mobile.",
  },
  {
    index: "03",
    title: "UI/UX design",
    description: "Interfaces that reduce friction, improve hierarchy, and make complex tasks easier to understand.",
  },
];

function Hero3DStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateScrollMotion = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      const centered = progress - 0.5;

      stage.style.setProperty("--scroll-scene", `${centered * 52}px`);
      stage.style.setProperty("--scroll-photo", `${centered * -24}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stage.style.setProperty("--hero-rx", `${-y * 8}deg`);
    stage.style.setProperty("--hero-ry", `${x * 10}deg`);
  };

  const resetPointer = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--hero-rx", "0deg");
    stage.style.setProperty("--hero-ry", "0deg");
  };

  return (
    <div
      ref={stageRef}
      className="hero3d-stage home-portrait-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Interactive portrait"
    >
      <div className="hero3d-scene">
        <div className="hero3d-card hero3d-photo-card reference-portrait-card">
          <div className="hero3d-photo-shell">
            <img
              src="/media/kristy-kate-professional-portrait-v2.webp"
              alt="Kristy Kate Taylor"
              className="hero3d-photo"
              draggable={false}
              width={960}
              height={960}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2">
      <section id="home" className="portfolio-hero portfolio-hero-3d reference-hero relative overflow-hidden pt-[72px]">
        <InteractiveDotGridLite className="absolute inset-0 opacity-20" />
        <div className="hero3d-bg hero3d-bg-one" aria-hidden="true" />
        <div className="hero3d-bg hero3d-bg-two" aria-hidden="true" />

        <div className="portfolio-shell home-hero-shell relative z-10 grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:py-20">
          <div className="hero-copy-panel min-w-0">
            <p className="reference-intro hero-intro-motion">Kristy Kate Taylor · Developer & Designer</p>

            <h1 className="hero-title-motion text-white">
              <SplitTextLite text="I design and build" delay={24} />
              <br />
              <SplitTextLite text="useful digital systems." delay={24} />
            </h1>

            <p className="hero-description-motion mt-7 max-w-xl text-zinc-400">
              I turn complex workflows into clear information systems, responsive web applications, and interfaces people can actually use.
            </p>

            <div className="hero-actions-motion mt-8 flex flex-wrap items-center gap-5">
              <MagnetLite>
                <Link href="/projects" className="v2-button v2-button-primary">
                  View selected work <ArrowRight size={16} />
                </Link>
              </MagnetLite>
              <Link href="/contact" className="home-contact-link">Let’s work together</Link>
            </div>
          </div>

          <Hero3DStage />
        </div>
      </section>

      <section className="portfolio-section home-capabilities border-t border-white/[.06]">
        <div className="portfolio-shell py-20 lg:py-24">
          <div className="home-capabilities-header">
            <div className="home-capabilities-copy">
              <p className="v2-kicker">What I build</p>
              <h2 className="v2-heading mt-4">Three areas. One clear focus.</h2>
              <p className="mt-5 max-w-xl leading-7 text-zinc-500">
                Useful software starts with understanding the work, then designing the simplest system that can support it well.
              </p>
            </div>
          </div>

          <div className="home-capability-grid mt-12">
            {capabilities.map((item) => (
              <article className="home-capability-card" key={item.title}>
                <span className="home-capability-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="home-work-cta">
            <p>Want to see how these come together in real projects?</p>
            <Link href="/projects" className="home-work-link">Explore projects <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
