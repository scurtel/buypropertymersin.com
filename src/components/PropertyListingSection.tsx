import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/lib/properties";
import { getWhatsAppUrl } from "@/lib/site";

interface PropertyListingSectionProps {
  title: string;
  properties: Property[];
  emptyMessage?: string;
}

export function PropertyListingSection({
  title,
  properties,
  emptyMessage = "No active listings yet in this area.",
}: PropertyListingSectionProps) {
  return (
    <section className="bg-gray-light py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-navy sm:text-2xl">{title}</h2>

        {properties.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-beige-dark/60 bg-white p-8 text-center sm:p-10">
            <p className="text-base font-medium text-navy">{emptyMessage}</p>
            <p className="mt-2 text-sm text-navy/70">
              Tell us what you are looking for and we will help you find suitable
              options in Mersin.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Contact on WhatsApp
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-lg border border-navy px-5 py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
