import type { MetadataRoute } from "next";
import { publicProjects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/about", "/packages", "/contact"];
  const visibleProjects = publicProjects;

  return [...staticRoutes, ...visibleProjects.map(project => `/projects/${project.slug}`)].map(path => ({
    url: `${site.url}${path}`,
  }));
}
