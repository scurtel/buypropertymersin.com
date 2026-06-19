import type { BlogPost } from "./types";
import { post as bestAreas } from "./posts/best-areas-to-buy-property-in-mersin";
import { post as mersinVsAntalya } from "./posts/mersin-vs-antalya-property-investment";
import { post as foreignersGuide } from "./posts/can-foreigners-buy-property-in-turkey";

const allPosts: BlogPost[] = [bestAreas, mersinVsAntalya, foreignersGuide];

export function getAllBlogPosts(): BlogPost[] {
  return [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getBlogHref(slug: string): string {
  return `/blog/${slug}/`;
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p));
}
