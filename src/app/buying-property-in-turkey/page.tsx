import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { PageSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { foreignBuyerTopics, homeFaq } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Buying Property in Türkiye as a Foreigner",
  description:
    "A practical guide to buying property in Türkiye for foreign nationals. Tapu process, documents, taxes and legal considerations for Mersin buyers.",
  path: "/buying-property-in-turkey/",
  keywords: ["buying property in Türkiye", "real estate in Mersin for foreigners"],
});

const buyingFaq = homeFaq.filter((item) =>
  [
    "Can foreigners buy property in Mersin?",
    "What are the costs when buying property in Türkiye?",
    "Do I need a lawyer when buying property in Türkiye?",
    "Can buying property in Türkiye give me residence permit rights?",
  ].includes(item.question)
);

export default function BuyingGuidePage() {
  return (
    <>
      <PageSchema breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Buying Guide", path: "/buying-property-in-turkey/" },
      ]} faq={buyingFaq} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Buying Guide", path: "/buying-property-in-turkey/" },
        ]}
      />
      <PageHeader
        title="Buying Property in Türkiye as a Foreigner"
        description="An overview of the property purchase process, legal requirements and practical considerations for international buyers in Mersin."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-navy/80">
            Foreign nationals from many countries can purchase real estate in
            Türkiye, including in Mersin. This guide provides general
            information to help you understand the process. It is not legal
            advice — always consult qualified professionals before committing to
            a purchase.
          </p>

          <div className="mt-10 space-y-8">
            {foreignBuyerTopics.map((topic) => (
              <article key={topic.title}>
                <h2 className="text-xl font-semibold text-navy">{topic.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-navy/70">
                  {topic.content}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-gold/30 bg-beige p-6">
            <p className="text-sm leading-relaxed text-navy/80">
              <strong>Important:</strong> Buying property may support certain
              residence permit processes, but rules may change and buyers should
              obtain professional legal advice. Property ownership does not
              automatically guarantee residency or citizenship.
            </p>
          </div>

          <p className="mt-8 text-sm text-navy/70">
            Ready to explore options? Browse{" "}
            <Link href="/properties/" className="font-medium text-gold hover:underline">
              properties in Mersin
            </Link>{" "}
            or{" "}
            <Link href="/contact/" className="font-medium text-gold hover:underline">
              contact our team
            </Link>
            .
          </p>
        </div>
      </section>

      <FAQ items={buyingFaq} title="Common Questions About Buying in Türkiye" />
      <CTA />
    </>
  );
}
