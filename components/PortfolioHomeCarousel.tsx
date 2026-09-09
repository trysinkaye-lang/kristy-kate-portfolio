"use client";

import { BlueprintHero } from "@/components/BlueprintHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { WebsiteDesignWork } from "@/components/home/WebsiteDesignWork";
import { WebsitePackages } from "@/components/home/WebsitePackages";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCTA } from "@/components/home/HomeCTA";
import "@/components/home/home.css";
import "@/components/home/creative-2026.css";
import "@/components/home/professional-home.css";
import "@/components/home/website-packages.css";

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2">
      <BlueprintHero />
      <SelectedWork />
      <WebsiteDesignWork />
      <WebsitePackages />
      <HomeCapabilities />
      <HomeAbout />
      <HomeCTA />
    </main>
  );
}
