import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { providerReviews } from "@/data/providerReviews";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  const providerReviewPages = providerReviews.map((provider) => ({
    url: `${siteConfig.url}/reviews/${provider.slug}`,
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/esim-checker`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/data-calculator`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/diagnosis`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/compare`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/sakura-mobile-review`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/airport`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/sim-card`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/pocket-wifi`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/esim`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/best-esim-japan`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sim-card-vs-esim`,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/how-we-review-providers`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/affiliate-disclosure`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...providerReviewPages,
  ];
}
