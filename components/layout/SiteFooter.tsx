import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/[.08]" aria-label="Site footer">
      <div className="portfolio-shell py-8 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-[-.01em] text-white">
              Kristy Kate Taylor
            </p>
            <p className="mt-1 text-sm text-zinc-500">Software Developer</p>
          </div>

          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Kristy Kate Taylor on GitHub (opens in a new tab)"
            className="w-fit rounded-sm text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            GitHub
          </a>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/[.08] pt-5 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Kristy Kate Taylor</span>
          <span>Designed and built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
