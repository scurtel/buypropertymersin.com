import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { PageSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Buy Property Mersin — helping foreign buyers find apartments, villas and investment property in Mersin, Türkiye.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ]}
      />
      <PageHeader
        title="About Buy Property Mersin"
        description="Trusted guidance for foreign buyers exploring Mersin real estate."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-base leading-relaxed text-navy/80">
            <p>{BUSINESS.description}</p>
            <p>
              Based in Mersin, we work with international clients who are
              interested in apartments, villas, sea-view homes and investment
              properties across the province. Our approach is straightforward:
              understand your requirements, present suitable options and support
              you through the viewing and enquiry process.
            </p>
            <p>
              We serve buyers from diverse backgrounds including English,
              Russian and Arabic-speaking clients. While our website is currently
              in English, we aim to expand language support as the platform
              grows.
            </p>
            <h2 className="pt-4 text-xl font-semibold text-navy">
              How We Can Help
            </h2>
            <ul className="list-inside list-disc space-y-2 text-navy/70">
              <li>Property search and shortlisting in Mersin</li>
              <li>Area guidance for Mezitli, Yenişehir, Erdemli and coastal districts</li>
              <li>Coordination of viewings and enquiries</li>
              <li>Introduction to legal and notary professionals when needed</li>
            </ul>
            <p className="text-sm text-navy/60">
              We do not provide legal, tax or immigration advice. For title deed,
              residence permit and tax matters, please consult licensed
              professionals.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/properties/"
              className="inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light"
            >
              View Properties
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
