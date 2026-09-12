import type { Metadata } from "next";
import { site } from "@/data/site";
type SocialImage = { url: string; width: number; height: number; alt: string };
export function pageMetadata(title: string, description: string, path: string, image?: SocialImage): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, type: "website", images: [image ?? { url: "/opengraph-image", width: 1200, height: 630, alt: site.name }] },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [image?.url ?? "/opengraph-image"] },
  };
}
