import Image from "next/image";
import Link from "next/link";
import type { PropertyCategory } from "@/lib/data";

interface CategoryCardProps {
  category: PropertyCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group overflow-hidden rounded-xl border border-beige-dark/60 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-light">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-navy group-hover:text-gold sm:text-lg">
          {category.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
