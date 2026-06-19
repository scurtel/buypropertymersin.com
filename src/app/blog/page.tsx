import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCard } from "@/components/BlogCard";
import { PageSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Guides and insights on Mersin real estate, property investment and buying property in Türkiye for foreign buyers.",
  path: "/blog/",
  keywords: [
    "Mersin real estate blog",
    "buy property in Mersin",
    "property investment in Turkey",
  ],
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <PageSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
        ]}
      />
      <PageHeader
        title="Mersin Property Blog"
        description="Practical guides on Mersin neighborhoods, investment comparisons and buying property in Türkiye as a foreigner."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
