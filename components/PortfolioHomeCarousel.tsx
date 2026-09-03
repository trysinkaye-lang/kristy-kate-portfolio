"use client";

import { BlueprintHero } from "@/components/BlueprintHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCTA } from "@/components/home/HomeCTA";
import "@/components/home/home.css";

export function PortfolioHomeCarousel() {
  return (
    <main id="main-content" className="portfolio-v2">
      <BlueprintHero />
      <SelectedWork />
      <HomeCapabilities />
      <HomeAbout />
      <HomeCTA />
    </main>
  );
}
