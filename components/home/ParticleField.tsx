"use client";
import { useEffect, useRef } from "react";
/** Rendering loads after hydration; semantic content never waits for WebGL. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const controller = new AbortController();
    import("@/lib/particle-scene").then(async ({ mountParticleScene }) => {
      if (!ref.current || disposed) return;
      const release = await mountParticleScene(ref.current, controller.signal);
      if (disposed) release(); else cleanup = release;
    }).catch(() => {
      if (ref.current && !disposed) ref.current.dataset.renderer = "unavailable";
    });
    return () => { disposed = true; controller.abort(); cleanup?.(); };
  }, []);
  return <canvas data-particle-field ref={ref} aria-hidden="true" style={{
    position: "sticky", top: 0, zIndex: 0, width: "100%", height: "100svh", display: "block",
    marginBottom: "-100svh", pointerEvents: "none",
  }} />;
}
