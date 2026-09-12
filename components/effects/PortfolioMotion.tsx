"use client";

import { useEffect } from "react";

export function PortfolioMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    root.dataset.motionReady = "true";

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-project], #about, #services, [data-motion-section]")
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => {
        element.dataset.motionVisible = "true";
      });
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.motionVisible = "true";
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      revealTargets.forEach((element) => observer.observe(element));

      return () => {
        observer.disconnect();
        delete root.dataset.motionReady;
      };
    }

    return () => {
      delete root.dataset.motionReady;
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const cleanups: Array<() => void> = [];

    const spotlightTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-project] figure, [data-spotlight]")
    );

    spotlightTargets.forEach((element) => {
      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
        element.dataset.spotlightActive = "true";
      };

      const onLeave = () => {
        element.dataset.spotlightActive = "false";
      };

      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
      });
    });

    const magneticTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '#home a[href="#work"], .text-link, [data-magnetic="true"]',
      ),
    );

    magneticTargets.forEach((element) => {
      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        element.style.setProperty("--magnet-x", `${x * 0.14}px`);
        element.style.setProperty("--magnet-y", `${y * 0.18}px`);
        element.dataset.magneticActive = "true";
      };

      const onLeave = () => {
        element.style.setProperty("--magnet-x", "0px");
        element.style.setProperty("--magnet-y", "0px");
        element.dataset.magneticActive = "false";
      };

      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
