"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#home"
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-slate-950/85 text-slate-200 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:text-white"
    >
      <ArrowUp size={17} />
    </a>
  );
}
