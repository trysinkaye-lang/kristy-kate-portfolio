"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const links = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["About", "/about"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("theme-transitioning");
    void root.offsetWidth;
    root.classList.add("theme-transitioning");

    const applyTheme = () => setTheme(nextTheme);
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && doc.startViewTransition) {
      const transition = doc.startViewTransition(applyTheme);
      transition.finished.finally(() => root.classList.remove("theme-transitioning"));
      return;
    }

    applyTheme();
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 620);
  };

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4">
      <nav className="floating-nav mx-auto flex h-14 w-fit items-center rounded-full p-1.5" aria-label="Main navigation">
        <div className="hidden items-center sm:flex">
          {links.map(([label, href]) => <a key={href} href={href} className={`floating-nav-link ${pathname === href || (href !== "/" && pathname.startsWith(href)) ? "is-home" : ""}`}>{label}</a>)}
        </div>
        <a href="/contact" className="floating-contact hidden md:inline-flex">Contact</a>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={resolvedTheme === "dark" ? "Use light mode" : "Use dark mode"}>
          {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button type="button" className="theme-toggle sm:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={18} /> : <Menu size={18} />}</button>
      </nav>
      {open && <div className="floating-mobile-menu mx-auto mt-2 grid max-w-xs gap-1 rounded-2xl p-2 sm:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm">{label}</a>)}<a href="/contact" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm">Contact</a></div>}
    </header>
  );
}
