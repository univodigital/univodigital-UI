import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getAllPortfolioSlugs } from "@/data/portfolio-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const portfolioProjects = getAllPortfolioSlugs().map((slug) => ({
    url: `${SITE.url}${ROUTES.portfolio.detail(slug)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}${ROUTES.about}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}${ROUTES.services.root}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}${ROUTES.portfolio.root}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...portfolioProjects,
    {
      url: `${SITE.url}${ROUTES.contact}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
