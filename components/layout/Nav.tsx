"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  ["About", "#about"],
  ["Portfolio", "#portfolio"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#080808]/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-7" aria-label="Main navigation">
        <a href="#home" className="text-sm font-semibold tracking-[-.02em] text-white sm:text-base">Kristy Kate Taylor</a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="text-sm text-zinc-500 transition hover:text-white">{label}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <a href={`mailto:${site.email}`} className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white hover:text-black sm:inline-flex">Let&apos;s talk</a>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      {open && <div className="border-t border-white/[.06] bg-[#080808] px-5 py-4 md:hidden"><div className="mx-auto grid max-w-[1240px] gap-1">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm text-zinc-300 hover:bg-white/[.04]">{label}</a>)}</div></div>}
    </header>
  );
}
