"use client";

import type { CSSProperties, PointerEvent } from "react";

export function InteractiveDotGridLite({ className = "" }: { className?: string }) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--dot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--dot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      aria-hidden="true"
      className={`rb-dot-grid ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--dot-x", "50%");
        event.currentTarget.style.setProperty("--dot-y", "42%");
      }}
      style={{ "--dot-x": "50%", "--dot-y": "42%" } as CSSProperties}
    />
  );
}
