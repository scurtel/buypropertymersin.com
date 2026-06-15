import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { ContactForm } from "@/components/ContactForm";
import { PageSchema, PropertyListingSchema } from "@/components/Schema";
import { buildPropertyMetadata, absoluteUrl } from "@/lib/seo";
import {
  getAllProperties,
  getPropertyBySlug,
  getPropertyHref,
  isIndicativePrice,
} from "@/lib/properties";
import { getPropertyWhatsAppUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProperties().map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property Not Found" };
  }

  return buildPropertyMetadata(property);
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const propertyPath = getPropertyHref(property.slug);
  const propertyUrl = absoluteUrl(propertyPath);
  const whatsappUrl = getPropertyWhatsAppUrl(property.title, propertyUrl);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties/" },
    { name: property.title, path: propertyPath },
  ];

  const paragraphs = property.description.split("\n\n");
  const indicative = isIndicativePrice(property);

  return (
    <>
      <PageSchema breadcrumbs={breadcrumbs} />
      <PropertyListingSchema property={property} />
      <Breadcrumbs items={breadcrumbs} />

      <article className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-light lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <span className="inline-block rounded-md bg-navy px-3 py-1 text-xs font-medium text-white">
                {property.type}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">
                {property.title}
              </h1>
              <p className="mt-2 text-lg text-gold">{property.area}, Mersin</p>

              <p className="mt-6 text-3xl font-bold text-navy">{property.price}</p>
              {indicative && (
                <p className="mt-1 text-xs text-gray-muted">
                  Indicative example price — contact us for current availability
                  and verified pricing.
                </p>
              )}

              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-beige-dark/60 bg-beige/50 p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-muted">
                    Size
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-navy">
                    {property.size} m²
                  </dd>
                </div>
                <div className="rounded-lg border border-beige-dark/60 bg-beige/50 p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-muted">
                    Bedrooms
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-navy">
                    {property.rooms}
                  </dd>
                </div>
                <div className="rounded-lg border border-beige-dark/60 bg-beige/50 p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-muted">
                    Area
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-navy">
                    {property.area}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href="#property-inquiry-form"
                  className="inline-flex items-center justify-center rounded-lg border border-navy px-6 py-3 text-sm font-semibold text-navy hover:bg-navy hover:text-white"
                >
                  Send Inquiry
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-navy">Description</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-navy/80">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-navy">Features</h2>
              <ul className="mt-4 space-y-2">
                {property.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-navy/80"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-navy/60">
            <Link href="/properties/" className="font-medium text-gold hover:underline">
              &larr; Back to all properties
            </Link>
          </p>
        </div>
      </article>

      <section id="property-inquiry-form" className="bg-gray-light py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-navy sm:text-2xl">
            Send an Inquiry
          </h2>
          <p className="mt-3 text-center text-sm text-navy/70">
            Ask about {property.title} and our team will respond with details and
            viewing options.
          </p>
          <div className="mt-8 rounded-xl border border-beige-dark/60 bg-white p-6 sm:p-8">
            <ContactForm
              id="property-inquiry-form-fields"
              propertyTitle={property.title}
              propertyUrl={propertyUrl}
              source="property-detail"
            />
          </div>
        </div>
      </section>

      <CTA
        title={`Interested in ${property.title}?`}
        description="Contact us for more details, viewing arrangements and guidance on buying property in Mersin."
      />
    </>
  );
}
