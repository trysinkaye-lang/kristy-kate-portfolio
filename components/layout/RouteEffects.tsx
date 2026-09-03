"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteEffects({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(1, window.scrollY / height) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div key={pathname}>{children}</div>
    </>
  );
}
