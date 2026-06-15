import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/properties";
import { getPropertyHref, getPropertySummary } from "@/lib/properties";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-beige-dark/60 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-light">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-md bg-navy/90 px-2 py-1 text-xs font-medium text-white">
          {property.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-navy">{property.title}</h3>
        <p className="mt-1 text-sm text-gold">{property.area}, Mersin</p>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-muted">
          <span className="font-semibold text-navy">{property.price}</span>
          <span>{property.size} m²</span>
          <span>{property.rooms} bed</span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
          {getPropertySummary(property)}
        </p>

        <Link
          href={getPropertyHref(property.slug)}
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
