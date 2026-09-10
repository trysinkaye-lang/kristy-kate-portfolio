"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./digital-core-visual.css";

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMotion;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float ring(vec2 p, float radius, float width) {
    float d = abs(length(p) - radius);
    return width / max(d, 0.0008);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / max(uResolution.y, 1.0);

    vec2 mouse = (uMouse - 0.5) * vec2(0.22, 0.14);
    p -= mouse;

    float t = uTime * 0.22 * uMotion;
    float angle = atan(p.y, p.x);
    float radius = length(p);

    float breathe = sin(t * 1.7) * 0.012;
    float core = 0.026 / max(radius * radius + 0.018, 0.006);

    float r1 = ring(p, 0.205 + breathe, 0.0019);
    float r2 = ring(p, 0.322 - breathe * 0.7, 0.00115);
    float r3 = ring(p, 0.445 + breathe * 0.45, 0.00072);

    float arcMaskA = smoothstep(-0.32, 0.72, sin(angle * 2.0 + t * 1.45));
    float arcMaskB = smoothstep(-0.62, 0.74, sin(angle * 3.0 - t * 1.08 + 1.4));
    float arcMaskC = smoothstep(-0.72, 0.82, sin(angle * 4.0 + t * 0.66 - 0.8));

    r1 *= 0.34 + arcMaskA * 0.72;
    r2 *= 0.22 + arcMaskB * 0.54;
    r3 *= 0.12 + arcMaskC * 0.34;

    float spokes = pow(max(0.0, cos(angle * 8.0 + t * 0.7)), 22.0);
    spokes *= smoothstep(0.52, 0.14, radius) * 0.34;

    float dustCell = hash21(floor((uv + t * 0.004) * vec2(96.0, 54.0)));
    float dust = step(0.982, dustCell) * smoothstep(0.72, 0.1, radius) * 0.17;

    vec3 rose = vec3(0.88, 0.49, 0.69);
    vec3 lavender = vec3(0.57, 0.42, 0.78);
    vec3 pearl = vec3(1.0, 0.88, 0.94);

    vec3 color = vec3(0.0);
    color += rose * (core * 0.10 + r1 * 0.17);
    color += lavender * (r2 * 0.13 + r3 * 0.11);
    color += pearl * (spokes * 0.42 + dust);

    float halo = exp(-radius * 5.6) * 0.18;
    color += mix(lavender, rose, 0.52) * halo;

    float vignette = smoothstep(0.94, 0.18, length((uv - 0.5) * vec2(1.0, 1.15)));
    color *= vignette;

    float alpha = clamp(max(max(color.r, color.g), color.b) * 0.84, 0.0, 0.72);
    gl_FragColor = vec4(color, alpha);
  }
`;

export function DigitalCoreVisual() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let frame = 0;
    let observer: ResizeObserver | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let failed = false;

    const useFallback = () => {
      if (failed) return;
      failed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      host.dataset.renderMode = "fallback";
      canvas?.remove();
    };

    try {
      const renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 1.75),
      });

      const gl = renderer.gl;
      canvas = gl.canvas as HTMLCanvasElement;
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);
      host.dataset.renderMode = "webgl";

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [1, 1] },
          uMouse: { value: [0.5, 0.5] },
          uMotion: { value: 1 },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let motionEnabled = !reduceMotion.matches;
      let start = performance.now();
      const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

      const draw = () => {
        if (failed) return false;
        try {
          renderer.render({ scene: mesh });
          return true;
        } catch {
          useFallback();
          return false;
        }
      };

      const resize = () => {
        if (failed) return;
        try {
          const rect = host.getBoundingClientRect();
          const width = Math.max(1, rect.width);
          const height = Math.max(1, rect.height);
          renderer.setSize(width, height);
          program.uniforms.uResolution.value = [width, height];
          draw();
        } catch {
          useFallback();
        }
      };

      const render = (now: number) => {
        if (failed) return;
        mouse.x += (mouse.tx - mouse.x) * 0.055;
        mouse.y += (mouse.ty - mouse.y) * 0.055;
        program.uniforms.uMouse.value = [mouse.x, mouse.y];
        program.uniforms.uMotion.value = motionEnabled ? 1 : 0;
        program.uniforms.uTime.value = (now - start) / 1000;
        if (!draw()) return;
        if (motionEnabled) frame = requestAnimationFrame(render);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (failed) return;
        const rect = host.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        mouse.tx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        mouse.ty = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
      };

      const onPointerLeave = () => {
        mouse.tx = 0.5;
        mouse.ty = 0.5;
      };

      const onMotionChange = () => {
        if (failed) return;
        motionEnabled = !reduceMotion.matches;
        cancelAnimationFrame(frame);
        start = performance.now() - Number(program.uniforms.uTime.value || 0) * 1000;
        if (motionEnabled) frame = requestAnimationFrame(render);
        else render(performance.now());
      };

      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(resize);
        observer.observe(host);
      } else {
        window.addEventListener("resize", resize);
      }

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("blur", onPointerLeave);
      reduceMotion.addEventListener("change", onMotionChange);

      resize();
      if (!failed) {
        if (motionEnabled) frame = requestAnimationFrame(render);
        else render(performance.now());
      }

      return () => {
        failed = true;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("blur", onPointerLeave);
        reduceMotion.removeEventListener("change", onMotionChange);
        canvas?.remove();
      };
    } catch {
      useFallback();
      return;
    }
  }, []);

  return <div ref={hostRef} className="digital-core-shell" aria-hidden="true" />;
}
