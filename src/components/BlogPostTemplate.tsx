import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { PageSchema } from "@/components/Schema";
import { BlogCard } from "@/components/BlogCard";
import { getBlogHref, getRelatedPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog/types";
import { getWhatsAppUrl } from "@/lib/site";

interface BlogPostTemplateProps {
  post: BlogPost;
}

export function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: getBlogHref(post.slug) },
  ];
  const relatedPosts = getRelatedPosts(post);

  return (
    <>
      <PageSchema breadcrumbs={breadcrumbs} faq={post.faq} />
      <Breadcrumbs items={breadcrumbs} />

      <article className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="border-b border-beige-dark/40 pb-8">
            <time className="text-sm text-gray-muted" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <h1 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">
              {post.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-navy/70">
              {post.excerpt}
            </p>
          </header>

          <div className="prose-navy mt-10 space-y-4">
            {post.sections.map((section, index) => {
              if (section.type === "h2") {
                return (
                  <h2
                    key={index}
                    className="pt-4 text-2xl font-bold text-navy first:pt-0"
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === "h3") {
                return (
                  <h3 key={index} className="pt-2 text-xl font-semibold text-navy">
                    {section.text}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-base leading-relaxed text-navy/80">
                  {section.text}
                </p>
              );
            })}
          </div>

          {post.internalLinks.length > 0 && (
            <aside className="mt-12 rounded-xl border border-beige-dark/60 bg-beige/40 p-6">
              <h2 className="text-lg font-semibold text-navy">Explore further</h2>
              <ul className="mt-4 space-y-2">
                {post.internalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-gold hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <section className="mt-12 rounded-xl border border-gold/30 bg-navy p-6 text-center sm:p-8">
            <h2 className="text-xl font-bold text-white">
              Contact Buy Property Mersin for a free consultation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Tell us what you are looking for in Mersin and we will help you
              explore suitable options with clear, practical guidance.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Contact on WhatsApp
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-navy"
              >
                Send Inquiry
              </Link>
            </div>
          </section>
        </div>
      </article>

      <FAQ items={post.faq} title="Frequently Asked Questions" />

      {relatedPosts.length > 0 && (
        <section className="bg-gray-light py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy">Related articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA showInquiry={false} />
    </>
  );
}
