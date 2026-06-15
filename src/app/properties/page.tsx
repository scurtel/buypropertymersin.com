import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PropertyFilters } from "@/components/PropertyFilters";
import { CTA } from "@/components/CTA";
import { PageSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { getAllProperties } from "@/lib/properties";

export const metadata: Metadata = buildMetadata({
  title: "Properties for Sale in Mersin",
  description:
    "Browse property for sale in Mersin including apartments, villas, sea-view homes and investment properties for foreign buyers.",
  path: "/properties/",
  keywords: ["property for sale in Mersin", "Mersin real estate"],
});

export default function PropertiesPage() {
  const properties = getAllProperties();

  return (
    <>
      <PageSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties/" },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties/" },
        ]}
      />
      <PageHeader
        title="Properties for Sale in Mersin"
        description="Explore a selection of apartments, villas and investment properties across Mersin. Contact us for the latest listings and personalised assistance."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-navy/70">
            Whether you want to buy property in Mersin for lifestyle, retirement
            or investment, our team can help you find suitable options. The
            listings below are sample properties — please{" "}
            <Link href="/contact/" className="font-medium text-gold hover:underline">
              contact us
            </Link>{" "}
            for current availability.
          </p>
          <PropertyFilters properties={properties} />
        </div>
      </section>

      <CTA />
    </>
  );
}
