import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { propertyCategories, areaGuides } from "@/lib/data";
import { getAllProperties, getPropertyHref } from "@/lib/properties";

const staticPages = [
  "/",
  "/properties/",
  "/buying-property-in-turkey/",
  "/about/",
  "/contact/",
  "/privacy-policy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticPages.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const categoryEntries = propertyCategories.map((cat) => ({
    url: `${SITE_URL}${cat.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const areaEntries = areaGuides.map((area) => ({
    url: `${SITE_URL}${area.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const propertyEntries = getAllProperties().map((property) => ({
    url: `${SITE_URL}${getPropertyHref(property.slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...categoryEntries, ...areaEntries, ...propertyEntries];
}
