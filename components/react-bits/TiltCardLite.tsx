"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

export function TiltCardLite({ children, className = "" }: { children: ReactNode; className?: string }) {
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 7;
    const rotateX = (0.5 - y) * 7;
    event.currentTarget.style.setProperty("--tilt-x", `${rotateX}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${rotateY}deg`);
    event.currentTarget.style.setProperty("--glare-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--glare-y", `${y * 100}%`);
  };

  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      className={`rb-tilt-card ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ "--tilt-x": "0deg", "--tilt-y": "0deg", "--glare-x": "50%", "--glare-y": "50%" } as CSSProperties}
    >
      {children}
    </div>
  );
}
