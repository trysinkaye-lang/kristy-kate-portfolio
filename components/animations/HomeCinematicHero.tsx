"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagnetLite } from "@/components/react-bits/MagnetLite";

const PortfolioScene = dynamic(() => import("@/components/three/PortfolioScene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

const scatterWords = ["I", "design", "and", "build", "useful", "digital", "systems."];

export function HomeCinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [sceneReady, setSceneReady] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactScene, setCompactScene] = useState(true);
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === "light" ? "light" : "dark";
  const words = useMemo(() => scatterWords, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWebgl(supportsWebGL());
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setCompactScene(window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const copy = copyRef.current;
    if (!section || !title || !copy) return;

    progressRef.current = 0;
    if (reducedMotion || compactScene) return;

    gsap.registerPlugin(ScrollTrigger);

    const wordEls = Array.from(title.querySelectorAll<HTMLElement>("[data-scatter-word]"));
    const secondaryEls = Array.from(copy.querySelectorAll<HTMLElement>("[data-hero-secondary]"));

    const ctx = gsap.context(() => {
      const scatter = [
        { x: -50, y: -10 },
        { x: -30, y: 22 },
        { x: -10, y: -18 },
        { x: 18, y: 24 },
        { x: 34, y: -12 },
        { x: 54, y: 18 },
        { x: 78, y: -6 },
      ];

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      wordEls.forEach((word, index) => {
        const target = scatter[index] ?? { x: index * 10, y: 0 };
        timeline.to(
          word,
          {
            x: target.x,
            y: target.y,
            opacity: index < 2 ? 0.55 : 0.28,
            ease: "none",
            duration: 1,
          },
          0,
        );
      });

      timeline.to(
        secondaryEls,
        { y: -22, opacity: 0.22, ease: "none", duration: 0.8 },
        0.08,
      );

      timeline.to(
        section,
        { "--hero-glow-progress": 1, ease: "none", duration: 1 } as gsap.TweenVars,
        0,
      );
    }, section);

    return () => ctx.revert();
  }, [compactScene, reducedMotion]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || compactScene) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const resetPointer = () => {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  };

  return (
    <section
      ref={sectionRef}
      className="cinematic-home-hero"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      aria-label="Interactive portfolio introduction"
    >
      <div className="cinematic-hero-bg" aria-hidden="true" />

      <div className="cinematic-scene-wrap" aria-hidden="true">
        {webgl === true ? (
          <PortfolioScene
            progressRef={progressRef}
            pointerRef={pointerRef}
            theme={theme}
            reducedMotion={reducedMotion}
            compact={compactScene}
            onReady={() => setSceneReady(true)}
          />
        ) : (
          <div className="cinematic-static-core">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      {webgl === true && !sceneReady ? (
        <div className="cinematic-loader" role="status" aria-live="polite">
          <span className="cinematic-loader-line" />
          <span>Loading experience</span>
        </div>
      ) : null}

      <div className="portfolio-shell cinematic-hero-grid">
        <div ref={copyRef} className="cinematic-hero-copy">
          <p className="cinematic-eyebrow" data-hero-secondary>
            Kristy Kate Taylor · Software Developer & Designer
          </p>

          <h1 ref={titleRef} className="cinematic-title">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} data-scatter-word className="cinematic-title-word">
                {word}{index < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p className="cinematic-description" data-hero-secondary>
            I turn complex workflows into clear information systems, responsive web applications,
            and interfaces that are practical for real people to use.
          </p>

          <div className="cinematic-actions" data-hero-secondary>
            <MagnetLite>
              <Link href="/projects" className="v2-button v2-button-primary">
                View Projects <ArrowRight size={16} />
              </Link>
            </MagnetLite>
            <Link href="/about" className="cinematic-text-link">About Me</Link>
            <Link href="/contact" className="cinematic-text-link">Contact Me</Link>
          </div>
        </div>

        <div className="cinematic-stage-spacer" aria-hidden="true" />
      </div>

      <div className="cinematic-scroll-note" aria-hidden="true">
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  );
}
