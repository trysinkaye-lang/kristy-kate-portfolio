import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Nav } from "@/components/layout/Nav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/data/site";

const manrope = localFont({ src: "../public/fonts/manrope-latin.woff2", variable: "--font-manrope", display: "swap", weight: "200 800" });
const cormorant = localFont({ src: "../public/fonts/cormorant-garamond-latin.woff2", variable: "--font-cormorant", display: "swap", weight: "300 700", preload: false });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Full-Stack Developer & UI/UX Designer`, template: `%s | ${site.name}` },
  description: site.headline,
  openGraph: { title: site.name, description: site.headline, url: site.url, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image", title: site.name, description: site.headline },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${cormorant.variable}`} suppressHydrationWarning><body>
    <Providers><a className="skip-link" tabIndex={0} href="#main-content">Skip to content</a><Nav />{children}<SiteFooter /></Providers>
    {process.env.VERCEL ? <><Analytics /><SpeedInsights /></> : null}
  </body></html>;
}
