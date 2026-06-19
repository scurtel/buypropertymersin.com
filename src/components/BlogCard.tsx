import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import { getBlogHref } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-beige-dark/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <time className="text-xs text-gray-muted" dateTime={post.publishedAt}>
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
      <h2 className="mt-3 text-lg font-semibold text-navy">
        <Link href={getBlogHref(post.slug)} className="hover:text-gold">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
        {post.excerpt}
      </p>
      <Link
        href={getBlogHref(post.slug)}
        className="mt-4 text-sm font-semibold text-gold hover:underline"
      >
        Read article &rarr;
      </Link>
    </article>
  );
}
