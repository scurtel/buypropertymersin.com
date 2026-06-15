import Image from "next/image";
import Link from "next/link";
import type { AreaGuide } from "@/lib/data";

interface AreaCardProps {
  area: AreaGuide;
}

export function AreaCard({ area }: AreaCardProps) {
  return (
    <Link
      href={area.href}
      className="group overflow-hidden rounded-xl border border-beige-dark/60 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-light">
        <Image
          src={area.image}
          alt={`Property in ${area.name}, Mersin`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-navy group-hover:text-gold">
          Property in {area.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">
          {area.description}
        </p>
        <span className="mt-3 inline-block text-sm font-medium text-gold">
          Read area guide &rarr;
        </span>
      </div>
    </Link>
  );
}
