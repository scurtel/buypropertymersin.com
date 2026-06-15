import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { PropertyCard } from "@/components/PropertyCard";
import { AreaCard } from "@/components/AreaCard";
import { SeoTextBlock } from "@/components/SeoTextBlock";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { ContactForm } from "@/components/ContactForm";
import { PageSchema } from "@/components/Schema";
import {
  propertyCategories,
  areaGuides,
  homeFaq,
  whyMersinPoints,
  foreignBuyerTopics,
} from "@/lib/data";
import { getFeaturedProperties } from "@/lib/properties";

export default function HomePage() {
  const featuredProperties = getFeaturedProperties();
  return (
    <>
      <PageSchema faq={homeFaq} />

      <Hero />

      {/* Property Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Property Categories
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-navy/70">
              Explore property for sale in Mersin by type — from coastal
              apartments to villas and investment opportunities.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {propertyCategories.map((cat) => (
              <CategoryCard key={cat.href} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-gray-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Featured Properties
              </h2>
              <p className="mt-3 max-w-xl text-base text-navy/70">
                Sample listings to illustrate the types of Mersin real estate
                available. Contact us for current options.
              </p>
            </div>
            <Link
              href="/properties/"
              className="text-sm font-semibold text-gold hover:underline"
            >
              View all properties &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Property in Mersin */}
      <SeoTextBlock title="Why Buy Property in Mersin?">
        <p>
          Mersin is a Mediterranean coastal city on Türkiye&apos;s southern
          shore, offering a blend of seafront living, modern districts and
          relatively accessible property prices compared to cities such as
          Antalya and Istanbul. For foreign buyers exploring real estate in
          Mersin for foreigners, the province presents options for lifestyle
          homes, retirement and potential rental use — subject to individual
          circumstances and local regulations.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {whyMersinPoints.map((point) => (
            <div key={point.title}>
              <h3 className="text-base font-semibold text-navy">{point.title}</h3>
              <p className="mt-2 text-sm">{point.text}</p>
            </div>
          ))}
        </div>
      </SeoTextBlock>

      {/* Area Guides */}
      <section className="bg-beige py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Area Guides
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-navy/70">
              Learn about popular districts where foreigners buy property in
              Mersin.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areaGuides.map((area) => (
              <AreaCard key={area.href} area={area} />
            ))}
          </div>
        </div>
      </section>

      {/* Foreign Buyer Guide */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            Buying Property in Türkiye as a Foreigner
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy/70">
            Understanding the basics of buying property in Türkiye can help you
            plan your purchase in Mersin. The following overview is for general
            information only and does not constitute legal advice.
          </p>
          <div className="mt-8 space-y-6">
            {foreignBuyerTopics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-xl border border-beige-dark/60 bg-white p-6"
              >
                <h3 className="text-base font-semibold text-navy">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {topic.content}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/buying-property-in-turkey/"
              className="inline-flex items-center text-sm font-semibold text-gold hover:underline"
            >
              Read the full buying guide &rarr;
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={homeFaq} />

      {/* Contact CTA + Form */}
      <CTA />
      <section className="bg-gray-light py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-navy sm:text-2xl">
            Send Us Your Requirements
          </h2>
          <p className="mt-3 text-center text-sm text-navy/70">
            Complete the form below and we will respond with suitable property
            options in Mersin.
          </p>
          <div className="mt-8 rounded-xl border border-beige-dark/60 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
