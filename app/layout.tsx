import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import "./theme-overrides.css";
import "./readability-fixes.css";
import "./contact-readability.css";
import "./mobile-and-page-polish.css";
import "./enhancements-v3.css";

import { Providers } from "@/components/layout/Providers";
import { Nav } from "@/components/layout/Nav";
import { RouteEffects } from "@/components/layout/RouteEffects";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} | ${site.title}`,

  description: `Portfolio of ${site.name}, a software developer and designer specializing in software systems, web development, UI/UX design, and digital experiences.`,

  keywords: [
    "Software Developer",
    "UI/UX Designer",
    "Web Developer",
    "Information Systems",
    "Portfolio",
    "Philippines",
  ],

  openGraph: {
    title: `${site.name} | ${site.title}`,
    description: site.headline,
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
      </body>
    </html>
  );
}
