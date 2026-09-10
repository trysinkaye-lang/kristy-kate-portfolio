import { PackagePricingPage } from "@/components/packages/PackagePricingPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website Packages",
  "Website design and development starting points from Kristy Kate Taylor, with detailed scope and optional reference currency conversion.",
  "/packages",
);

export default function PackagesPage() {
  return <PackagePricingPage />;
}
