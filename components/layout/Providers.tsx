"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchLike = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || touchLike || window.innerWidth < 900) return;

    const lenis = new Lenis({ duration: 0.85, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
