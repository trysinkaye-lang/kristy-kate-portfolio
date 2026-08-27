"use client";

import { useEffect, useState } from "react";

export function RotatingRoleLite({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % roles.length), 2200);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  return (
    <span className="rb-role-window" aria-live="polite">
      <span key={roles[index]} className="rb-role-item">{roles[index]}</span>
    </span>
  );
}
