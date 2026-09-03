import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";

import "./globals.css";
import "./theme-overrides.css";
import "./readability-fixes.css";
import "./contact-readability.css";
import "./mobile-and-page-polish.css";
import "./enhancements-v3.css";
import "./mobile-refinement-v4.css";
import "./contact-visibility-hotfix.css";
import "./content-architecture-v5.css";
import "./hero-type-refinement.css";
import "./creative-system-v6.css";
import "./home-simplification-v7.css";
import "./wix-reactbits-mix-v8.css";
import "./cinematic-home-v9.css";
import "./cinematic-projects-v10.css";
import "./cinematic-about-v11.css";
import "./cinematic-details-contact-v12.css";
import "./warm-light-refinement-v12.css";

import { Providers } from "@/components/layout/Providers";
import { Nav } from "@/components/layout/Nav";
import { RouteEffects } from "@/components/layout/RouteEffects";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
        <Providers>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>

          <Nav />

          <RouteEffects>{children}</RouteEffects>

          <SiteFooter />
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
