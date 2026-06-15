"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property, PropertyType } from "@/lib/properties";
import {
  getUniqueAreas,
  getUniqueTypes,
  parsePropertyPrice,
} from "@/lib/properties";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "size-asc"
  | "size-desc";

interface PropertyFiltersProps {
  properties: Property[];
}

export function PropertyFilters({ properties }: PropertyFiltersProps) {
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const areas = getUniqueAreas();
  const types = getUniqueTypes();

  const filtered = useMemo(() => {
    let result = [...properties];

    if (area) {
      result = result.filter((p) => p.area === area);
    }
    if (type) {
      result = result.filter((p) => p.type === type);
    }

    switch (sort) {
      case "price-asc":
        result.sort(
          (a, b) => parsePropertyPrice(a.price) - parsePropertyPrice(b.price)
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) => parsePropertyPrice(b.price) - parsePropertyPrice(a.price)
        );
        break;
      case "size-asc":
        result.sort((a, b) => a.size - b.size);
        break;
      case "size-desc":
        result.sort((a, b) => b.size - a.size);
        break;
    }

    return result;
  }, [properties, area, type, sort]);

  const selectClass =
    "w-full rounded-lg border border-beige-dark/60 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

  return (
    <>
      <div className="mb-8 grid gap-4 rounded-xl border border-beige-dark/60 bg-beige/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="filter-area" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-muted">
            Area
          </label>
          <select
            id="filter-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={selectClass}
          >
            <option value="">All areas</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-type" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-muted">
            Type
          </label>
          <select
            id="filter-type"
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | "")}
            className={selectClass}
          >
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="filter-sort" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-muted">
            Sort by
          </label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className={selectClass}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="size-asc">Size: Small to Large</option>
            <option value="size-desc">Size: Large to Small</option>
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm text-gray-muted">
        Showing {filtered.length} of {properties.length} properties
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-beige-dark/60 bg-white p-10 text-center">
          <p className="text-base font-medium text-navy">
            No properties match your filters.
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Try adjusting the area, type or sort options.
          </p>
        </div>
      )}
    </>
  );
}
