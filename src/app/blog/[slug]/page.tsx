import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogMetadata } from "@/lib/seo";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return buildBlogMetadata({
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    slug: post.slug,
    keywords: [post.targetKeyword, ...post.secondaryKeywords],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostTemplate post={post} />;
}
