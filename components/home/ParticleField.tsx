"use client";

import { useEffect, useRef } from "react";

/** Lightweight interactive particle sculpture with a static reduced-motion fallback. */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let last = 0;
    let t = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let points: { x: number; y: number; z: number; seed: number }[] = [];

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 700 ? 190 : 440;
      points = Array.from({ length: count }, (_, i) => {
        const y = 1 - 2 * (i + .5) / count;
        const a = i * 2.399963229728653;
        const r = Math.sqrt(1 - y * y);
        return { x: Math.cos(a) * r, y, z: Math.sin(a) * r, seed: i / count };
      });
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * (width < 700 ? .72 : .76) + mouseX * 16;
      const cy = height * (width < 700 ? .42 : .46) + mouseY * 18;
      const size = Math.min(width * (width < 700 ? .48 : .30), height * .43, 350);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.55);
      glow.addColorStop(0, "rgba(180,205,195,.085)");
      glow.addColorStop(.55, "rgba(155,200,190,.028)");
      glow.addColorStop(1, "rgba(155,200,190,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - size * 1.55, cy - size * 1.55, size * 3.1, size * 3.1);

      const spin = t * .00013;
      for (const p of points) {
        const angle = spin + Math.sin(p.y * 4.5 + spin * 2) * .32;
        const co = Math.cos(angle), si = Math.sin(angle);
        const rx = p.x * co - p.z * si;
        const rz = p.x * si + p.z * co;
        const ripple = 1 + .10 * Math.sin(p.y * 8 + spin * 3);
        const perspective = 2.75 / (2.75 - rz * .50);
        const px = cx + (rx + mouseX * p.z * .085) * size * perspective * ripple;
        const py = cy + (p.y + .12 * Math.sin(rx * 5 + spin * 2)) * size * perspective;
        const depth = (rz + 1) / 2;
        const radius = (width < 700 ? .7 : .83) + depth * 1.15;
        const alpha = .14 + depth * .68;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(222,242,233," + alpha.toFixed(3) + ")";
        ctx.fill();
      }

      // Faint orbital trajectories give the sculpture form without a heavy 3D dependency.
      ctx.strokeStyle = "rgba(203,229,220,.10)";
      ctx.lineWidth = .65;
      for (let ring = 0; ring < 3; ring++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, size * (.84 + ring * .08), size * (.23 + ring * .10),
          -.35 + Math.sin(spin + ring) * .38, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const tick = (stamp: number) => {
      if (!last) last = stamp;
      t += Math.min(stamp - last, 48);
      last = stamp;
      mouseX += (targetX - mouseX) * .035;
      mouseY += (targetY - mouseY) * .035;
      draw();
      frame = window.requestAnimationFrame(tick);
    };
    const onPointer = (event: PointerEvent) => {
      targetX = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2;
      targetY = (event.clientY / Math.max(window.innerHeight, 1) - .5) * 2;
    };
    const onVisibility = () => {
      window.cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) {
        last = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    if (!reduceMotion) frame = window.requestAnimationFrame(tick);
    if (!reduceMotion && pointerFine) window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} data-particle-field aria-hidden="true" style={{
    position: "absolute", inset: 0, display: "block", pointerEvents: "none", width: "100%", height: "100%"
  }} />;
}
