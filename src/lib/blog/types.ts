import type { FaqItem } from "@/lib/data";

export interface BlogSection {
  type: "h2" | "h3" | "p";
  text: string;
}

export interface BlogInternalLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  sections: BlogSection[];
  faq: FaqItem[];
  internalLinks: BlogInternalLink[];
  relatedSlugs: string[];
}
