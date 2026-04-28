import type { MetadataRoute } from "next";
import { locations, services } from "@/data/business";
import { articles } from "@/data/articles";

const BASE_URL = "https://ddpropainting.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Business pages
  const businessPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Resource articles
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/resources/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Location pages
  const locationPages: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${BASE_URL}/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Location × Service pages.
  // interior-painting and exterior-painting are our top ranking targets and
  // get bumped priority. Sub-services (ceiling/cabinet/popcorn/kitchen) get
  // medium priority. Other services stay at the default.
  const topPriorityServices = new Set(["interior-painting", "exterior-painting"]);
  const mediumPriorityServices = new Set([
    "ceiling-painting",
    "cabinet-painting",
    "popcorn-ceiling-removal",
    "kitchen-painting",
  ]);

  const locationServicePages: MetadataRoute.Sitemap = [];
  for (const loc of locations) {
    for (const svc of services) {
      let priority = 0.6;
      if (topPriorityServices.has(svc.slug)) priority = 0.9;
      else if (mediumPriorityServices.has(svc.slug)) priority = 0.75;

      locationServicePages.push({
        url: `${BASE_URL}/${loc.slug}/${svc.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority,
      });
    }
  }

  return [
    ...businessPages,
    ...articlePages,
    ...locationPages,
    ...locationServicePages,
  ];
}
