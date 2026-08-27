"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef } from "react";

type SpotlightCardLiteProps = {
  children: ReactNode;
  className?: string;
};

type SpotlightStyle = CSSProperties & {
  "--spot-x"?: string;
  "--spot-y"?: string;
};

export function SpotlightCardLite({ children, className = "" }: SpotlightCardLiteProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const updateSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`.trim()}
      onPointerMove={updateSpotlight}
      style={{ "--spot-x": "50%", "--spot-y": "50%" } as SpotlightStyle}
    >
      {children}
    </div>
  );
}
