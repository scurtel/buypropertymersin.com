import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PropertyListingSection } from "@/components/PropertyListingSection";
import { CTA } from "@/components/CTA";
import { PageSchema } from "@/components/Schema";
import { getPropertiesByArea } from "@/lib/properties";

export interface AreaPageConfig {
  name: string;
  path: string;
  description: string;
  intro: string;
  highlights: { title: string; text: string }[];
  bodyParagraphs: string[];
}

interface AreaPageTemplateProps {
  config: AreaPageConfig;
}

export function AreaPageTemplate({ config }: AreaPageTemplateProps) {
  const h1 = `Property in ${config.name}, Mersin`;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: config.name, path: config.path },
  ];
  const areaProperties = getPropertiesByArea(config.name);

  return (
    <>
      <PageSchema breadcrumbs={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader title={h1} description={config.description} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-navy/80">{config.intro}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {config.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-beige-dark/60 bg-white p-5"
              >
                <h2 className="text-base font-semibold text-navy">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          {config.bodyParagraphs.map((para, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-navy/70">
              {para}
            </p>
          ))}
        </div>
      </section>

      <PropertyListingSection
        title={`Properties in ${config.name}`}
        properties={areaProperties}
        emptyMessage={`No active listings yet in ${config.name}.`}
      />

      <section className="border-t border-beige-dark/40 bg-beige py-8">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-navy/70">
            Explore more{" "}
            <Link href="/properties/" className="font-medium text-gold hover:underline">
              properties in Mersin
            </Link>{" "}
            or view our{" "}
            <Link href="/buying-property-in-turkey/" className="font-medium text-gold hover:underline">
              buying guide for foreigners
            </Link>
            .
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
