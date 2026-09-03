"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const links = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const subscribeMounted = () => () => {};

export function Nav() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
    <>
      <header className="fixed inset-x-0 top-5 z-50 px-4">
        <nav className="floating-nav mx-auto hidden h-14 w-fit items-center rounded-full p-1.5 sm:flex" aria-label="Main navigation">
          <div className="flex items-center">
            {links.slice(0, 3).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`floating-nav-link ${pathname === href || (href !== "/" && pathname.startsWith(href)) ? "is-home" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <Link href="/contact" className={`floating-contact inline-flex ${pathname.startsWith('/contact') ? 'is-home' : ''}`}>Contact</Link>
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={resolvedTheme === "dark" ? "Use light mode" : "Use dark mode"}>
            {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <div className="mobile-nav-trigger mx-auto flex w-full max-w-[calc(100vw-2rem)] items-center justify-between sm:hidden">
          <Link href="/" className="mobile-brand" aria-label="Go to home">KT</Link>
          <button type="button" className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open navigation sidebar"><Menu size={21} /></button>
        </div>
      </header>

      <div className={`mobile-sidebar-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden={!open} />
      <aside className={`mobile-sidebar ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-sidebar-head">
          <div>
            <p className="mobile-sidebar-eyebrow">Portfolio</p>
            <strong>Kristy Kate</strong>
          </div>
          <button type="button" className="mobile-sidebar-close" onClick={() => setOpen(false)} aria-label="Close navigation sidebar"><X size={20} /></button>
        </div>

        <nav className="mobile-sidebar-links" aria-label="Mobile navigation">
          {links.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className={active ? "is-active" : ""} onClick={() => setOpen(false)}>
                <span>{label}</span><span aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-sidebar-footer">
          <button type="button" className="mobile-theme-row" onClick={toggleTheme}>
            <span>{resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</span>
            {mounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </aside>
    </>
  );
}
