import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kristy-kate-dev-portfolio.vercel.app";
  const pages = ["", "/projects", "/about", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date() })),
  ];
}
