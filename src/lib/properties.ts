export type PropertyType =
  | "Apartment"
  | "Villa"
  | "Investment"
  | "Sea View"
  | "Land"
  | "Commercial";

export interface Property {
  slug: string;
  title: string;
  area: string;
  price: string;
  size: number;
  rooms: number;
  description: string;
  features: string[];
  image: string;
  type: PropertyType;
  /** When true, price is illustrative only — omit from structured data offers */
  priceIsIndicative?: boolean;
}

export const properties: Property[] = [
  {
    slug: "sea-view-apartment-mezitli",
    title: "Sea View Apartment in Mezitli",
    area: "Mezitli",
    price: "€145,000",
    size: 110,
    rooms: 2,
    description:
      "This bright two-bedroom apartment in Mezitli offers partial Mediterranean sea views and a practical layout suited to foreign buyers seeking coastal living in Mersin. Located within walking distance of local shops and a short drive from the beach, the property sits in a well-maintained residential building with elevator access and allocated parking.\n\nThe open-plan living area receives good natural light, while both bedrooms are comfortably sized. Mezitli is one of Mersin's most popular districts for international buyers, combining sea access with urban amenities and healthcare facilities nearby.",
    features: [
      "Partial sea view",
      "2 bedrooms",
      "110 m² living area",
      "Elevator",
      "Allocated parking",
      "Walking distance to amenities",
      "Close to Mezitli coastline",
    ],
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    type: "Apartment",
  },
  {
    slug: "modern-apartment-yenisehir",
    title: "Modern Apartment in Yenişehir",
    area: "Yenişehir",
    price: "€120,000",
    size: 95,
    rooms: 2,
    description:
      "A contemporary two-bedroom apartment in Yenişehir, Mersin's modern urban centre. This property appeals to buyers who prioritise city convenience, with shopping centres, restaurants, parks and public transport within easy reach.\n\nThe flat features a modern kitchen, combined living and dining space, and a balcony overlooking a quiet residential street. Yenişehir continues to attract both local and foreign residents due to its infrastructure, universities and new residential developments.",
    features: [
      "2 bedrooms",
      "95 m² living area",
      "Modern kitchen",
      "Balcony",
      "City centre location",
      "Near shopping and parks",
      "Good transport links",
    ],
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    type: "Apartment",
  },
  {
    slug: "investment-property-erdemli",
    title: "Investment Property in Erdemli",
    area: "Erdemli",
    price: "€98,000",
    size: 85,
    rooms: 1,
    description:
      "A compact one-bedroom unit in Erdemli, a coastal district west of central Mersin known for its beaches and more accessible price points. This property may suit buyers exploring rental or holiday use, subject to local regulations and market conditions.\n\nErdemli has seen steady residential growth, with demand from both local residents and seasonal visitors. As with any investment purchase, independent legal and market research is recommended before proceeding.",
    features: [
      "1 bedroom",
      "85 m² living area",
      "Coastal district location",
      "Suitable for rental consideration",
      "Affordable entry price",
      "Near Erdemli beaches",
      "Growing residential area",
    ],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    type: "Investment",
  },
  {
    slug: "villa-near-coast-cesmeli",
    title: "Villa near the Coast in Çeşmeli",
    area: "Çeşmeli",
    price: "€285,000",
    size: 180,
    rooms: 4,
    description:
      "A spacious four-bedroom villa with private garden in Çeşmeli, a quiet seaside neighbourhood within the Erdemli district. This detached home offers generous living space and a peaceful setting a short drive from the Mediterranean coast.\n\nThe villa includes multiple bathrooms, a large living area and outdoor space suitable for family living or year-round residence. Çeşmeli is favoured by buyers seeking privacy and a slower pace compared to central urban districts.",
    features: [
      "4 bedrooms",
      "180 m² living area",
      "Private garden",
      "Detached villa",
      "Multiple bathrooms",
      "Quiet residential area",
      "Short drive to the coast",
    ],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    type: "Villa",
  },
  {
    slug: "coastal-apartment-tece",
    title: "Coastal Apartment in Tece",
    area: "Tece",
    price: "€112,000",
    size: 100,
    rooms: 2,
    description:
      "A two-bedroom apartment in Tece with straightforward access to the coastline and local beach facilities. Tece offers a relaxed Mediterranean atmosphere popular with buyers interested in sea-view property in Mersin at moderate price levels.\n\nThe property is located in a low-rise residential building with a manageable layout suited to couples or small families. The area provides essential amenities and road connections to wider Erdemli and Mersin.",
    features: [
      "2 bedrooms",
      "100 m² living area",
      "Near the beach",
      "Low-rise building",
      "Coastal neighbourhood",
      "Suitable for lifestyle buyers",
      "Road links to Erdemli",
    ],
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
    type: "Sea View",
  },
  {
    slug: "family-villa-kizkalesi",
    title: "Family Villa in Kızkalesi",
    area: "Kızkalesi",
    price: "€245,000",
    size: 165,
    rooms: 3,
    description:
      "A three-bedroom villa in Kızkalesi, a historic coastal town known for its offshore castle and sandy beaches. This property combines residential comfort with proximity to one of the region's most recognisable tourist destinations.\n\nKızkalesi attracts both holiday-home buyers and those considering seasonal rental use. The villa offers a practical layout with outdoor space and is located within reach of local shops, restaurants and the seafront.",
    features: [
      "3 bedrooms",
      "165 m² living area",
      "Outdoor space",
      "Near Kızkalesi castle",
      "Beach access nearby",
      "Holiday-home potential",
      "Historic coastal town",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    type: "Villa",
  },
];

export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(count = 4): Property[] {
  return properties.slice(0, count);
}

export function getPropertiesByArea(area: string): Property[] {
  return properties.filter((p) => p.area === area);
}

export function getPropertiesByType(type: PropertyType): Property[] {
  return properties.filter((p) => p.type === type);
}

export function getPropertyHref(slug: string): string {
  return `/properties/${slug}/`;
}

export function getPropertySummary(property: Property, maxLength = 140): string {
  const firstParagraph = property.description.split("\n\n")[0];
  if (firstParagraph.length <= maxLength) return firstParagraph;
  return `${firstParagraph.slice(0, maxLength).trimEnd()}…`;
}

export function parsePropertyPrice(price: string): number {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function getUniqueAreas(): string[] {
  return [...new Set(properties.map((p) => p.area))].sort();
}

export function getUniqueTypes(): PropertyType[] {
  return [...new Set(properties.map((p) => p.type))].sort();
}

export function isIndicativePrice(property: Property): boolean {
  return property.priceIsIndicative !== false;
}
