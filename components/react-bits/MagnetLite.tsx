"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

type MagnetLiteProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function MagnetLite({ children, className = "", strength = 0.16 }: MagnetLiteProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      ref={ref}
      className={`magnet-lite ${className}`.trim()}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}
