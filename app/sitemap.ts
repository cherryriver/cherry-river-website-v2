import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/content/products-catalog";

const SITE_URL = "https://cherryriver.ca";

function withAlternates(path: string) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    languages: {
      fr: url,
      en: `${SITE_URL}/en${path === "/" ? "" : path}`,
      "x-default": url,
    },
  };
}

type StaticEntry = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

const STATIC_PAGES: StaticEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/distilleries", changeFrequency: "monthly", priority: 0.9 },
  { path: "/experiences", changeFrequency: "weekly", priority: 0.9 },
  { path: "/produits", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cocktail-culture", changeFrequency: "weekly", priority: 0.8 },
  { path: "/boutique", changeFrequency: "weekly", priority: 0.8 },
  { path: "/la-maison", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: withAlternates(path),
    })
  );

  const productEntries: MetadataRoute.Sitemap = getAllSlugs().map((slug) => {
    const path = `/produits/${slug}`;
    return {
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: withAlternates(path),
    };
  });

  return [...staticEntries, ...productEntries];
}
