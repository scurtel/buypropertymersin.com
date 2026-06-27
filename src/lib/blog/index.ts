import type { BlogPost } from "./types";
import { autoPosts } from "./auto-posts";
import { manualPosts } from "./manual-posts";

const allPosts: BlogPost[] = [...manualPosts, ...autoPosts];

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
