import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/about", "/packages", "/contact"];
  return [...staticRoutes, ...projects.map((project) => `/projects/${project.slug}`)].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
