"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { site } from "@/data/site";

const links = [
  ["Home", "#home"],
  ["Projects", "#portfolio"],
  ["About", "#about"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4">
      <nav className="floating-nav mx-auto flex h-14 w-fit items-center rounded-full p-1.5" aria-label="Main navigation">
        <div className="hidden items-center sm:flex">
          {links.map(([label, href], index) => <a key={href} href={href} className={`floating-nav-link ${index === 0 ? "is-home" : ""}`}>{label}</a>)}
        </div>
        <a href={`mailto:${site.email}`} className="floating-contact hidden md:inline-flex">Contact</a>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={resolvedTheme === "dark" ? "Use light mode" : "Use dark mode"}>
          {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button type="button" className="theme-toggle sm:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={18} /> : <Menu size={18} />}</button>
      </nav>
      {open && <div className="floating-mobile-menu mx-auto mt-2 grid max-w-xs gap-1 rounded-2xl p-2 sm:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm">{label}</a>)}<a href={`mailto:${site.email}`} className="rounded-xl px-4 py-3 text-sm">Contact</a></div>}
    </header>
  );
}
