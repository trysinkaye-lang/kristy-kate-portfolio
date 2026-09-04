import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import "./theme-overrides.css";
import "./readability-fixes.css";
import "./contact-readability.css";
import "./mobile-and-page-polish.css";
import "./enhancements-v3.css";
import "./mobile-refinement-v4.css";
import "./contact-visibility-hotfix.css";
import "./content-architecture-v5.css";
import "./feminine-editorial-v6.css";
import "./feminine-lightmode-v7.css";
import "./unified-editorial-v8.css";
import "./editorial-uniform-v9.css";
import "./contact-classic-v10.css";
import "./responsive-polish-v11.css";
import "./about-portrait-v12.css";
import "./lightmode-readability-v14.css";

import { Providers } from "@/components/layout/Providers";
import { Nav } from "@/components/layout/Nav";
import { RouteEffects } from "@/components/layout/RouteEffects";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.title}`,
  description: `Portfolio of ${site.name}, a ${site.title} building information systems, web applications, and desktop/offline-first software with usable interfaces and reliable data workflows.`,
  keywords: [
    "Kristy Kate Taylor",
    "Software Developer",
    "UI/UX Designer",
    "Information Systems",
    "Web Development",
    "Application Development",
    "Portfolio",
    "Philippines",
  ],
  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: site.headline,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.headline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>

          <Nav />

          <RouteEffects>
            {children}
          </RouteEffects>

          <SiteFooter />
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
