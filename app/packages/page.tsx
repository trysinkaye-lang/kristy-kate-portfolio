import type { Metadata } from "next";
import { PackagePricingPage } from "@/components/packages/PackagePricingPage";

export const metadata: Metadata = {
  title: "Website Packages | Kristy Kate Taylor",
  description:
    "Website design and development packages with responsive pricing cards, detailed inclusions, and optional currency conversion.",
};

export default function PackagesPage() {
  return <PackagePricingPage />;
}
