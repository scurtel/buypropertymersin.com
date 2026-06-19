import type { Metadata } from "next";
import { site } from "./site";
import type { Property } from "./properties";
import { getPropertyHref } from "./properties";

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${normalized}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage,
}: SeoConfig): Metadata {
  const fullTitle =
    title === site.siteName ? title : `${title} | ${site.siteName}`;
  const url = absoluteUrl(path);
  const image = ogImage ?? site.defaultOgImage;

  return {
    title: fullTitle,
    description,
    keywords: [
      "buy property in Mersin",
      "property for sale in Mersin",
      "Mersin real estate",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.siteName,
      locale: "en_US",
      type: "website",
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildBlogMetadata(post: {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords?: string[];
}): Metadata {
  const path = `/blog/${post.slug}/`;
  const url = absoluteUrl(path);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      siteName: site.siteName,
      locale: "en_US",
      type: "article",
      images: [{ url: site.defaultOgImage, alt: post.metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [site.defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildPropertyMetadata(property: Property): Metadata {
  const title = `${property.title} | Property for Sale in Mersin`;
  const description = `Explore ${property.title} in ${property.area}, Mersin. View price, size, rooms, features and contact ${site.siteName} for foreign buyer guidance.`;
  const path = getPropertyHref(property.slug);
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [
      `property in ${property.area} Mersin`,
      `${property.type.toLowerCase()} for sale in Mersin`,
      "property for sale in Mersin",
      "Mersin real estate",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.siteName,
      locale: "en_US",
      type: "website",
      images: [{ url: property.image, alt: property.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
