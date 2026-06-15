import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PropertyListingSection } from "@/components/PropertyListingSection";
import { AreaCard } from "@/components/AreaCard";
import { CTA } from "@/components/CTA";
import { PageSchema } from "@/components/Schema";
import type { AreaGuide } from "@/lib/data";
import type { PropertyType } from "@/lib/properties";
import { getPropertiesByType } from "@/lib/properties";

export interface CategoryPageConfig {
  title: string;
  h1: string;
  description: string;
  path: string;
  intro: string;
  bodyParagraphs: string[];
  propertyType?: PropertyType;
  relatedAreas?: AreaGuide[];
  listingsTitle?: string;
}

interface CategoryPageTemplateProps {
  config: CategoryPageConfig;
}

export function CategoryPageTemplate({ config }: CategoryPageTemplateProps) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: config.title, path: config.path },
  ];
  const categoryProperties = config.propertyType
    ? getPropertiesByType(config.propertyType)
    : [];

  return (
    <>
      <PageSchema breadcrumbs={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader title={config.h1} description={config.description} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-navy/80">{config.intro}</p>
          {config.bodyParagraphs.map((para, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-navy/70">
              {para}
            </p>
          ))}
        </div>
      </section>

      {config.propertyType && (
        <PropertyListingSection
          title={config.listingsTitle ?? `${config.propertyType} Listings`}
          properties={categoryProperties}
          emptyMessage={`No active ${config.propertyType.toLowerCase()} listings at the moment.`}
        />
      )}

      {config.relatedAreas && config.relatedAreas.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">
              Popular Areas
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.relatedAreas.map((area) => (
                <AreaCard key={area.href} area={area} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-beige-dark/40 bg-beige py-8">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-navy/70">
            Looking for personalised assistance?{" "}
            <Link href="/contact/" className="font-medium text-gold hover:underline">
              Contact us
            </Link>{" "}
            or read our{" "}
            <Link href="/buying-property-in-turkey/" className="font-medium text-gold hover:underline">
              foreign buyer guide
            </Link>
            .
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
