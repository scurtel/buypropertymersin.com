import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import type { FaqItem } from "@/lib/data";
import type { Property } from "@/lib/properties";
import {
  getPropertyHref,
  getPropertySummary,
  isIndicativePrice,
} from "@/lib/properties";

interface SchemaProps {
  breadcrumbs?: { name: string; path: string }[];
  faq?: FaqItem[];
}

export function SiteSchema() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.siteName,
    url: site.baseUrl,
    description: site.description,
    inLanguage: "en",
  };

  const realEstateAgent = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.siteName,
    url: site.baseUrl,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: {
      "@type": "City",
      name: site.city,
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.siteName,
    url: site.baseUrl,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgent) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}

export function PageSchema({ breadcrumbs, faq }: SchemaProps) {
  const schemas: object[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  if (faq && faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function PropertyListingSchema({ property }: { property: Property }) {
  const summary = getPropertySummary(property, 300);
  const indicative = isIndicativePrice(property);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: indicative
      ? `${summary} Example listing for illustration — contact ${site.siteName} for current availability and verified pricing.`
      : summary,
    image: property.image,
    url: absoluteUrl(getPropertyHref(property.slug)),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.area,
      addressRegion: site.city,
      addressCountry: site.country,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.size,
      unitCode: "MTK",
      unitText: "m²",
    },
    numberOfRooms: property.rooms,
  };

  // Only include Offer when price is verified — all sample listings are indicative
  if (!indicative) {
    const currencyMatch = property.price.match(/[€$£]|TRY|USD|EUR|GBP/i);
    const priceValue = property.price.replace(/[^\d.]/g, "");
    let priceCurrency = "EUR";
    if (currencyMatch) {
      const c = currencyMatch[0].toUpperCase();
      if (c === "€") priceCurrency = "EUR";
      else if (c === "$") priceCurrency = "USD";
      else if (c === "£") priceCurrency = "GBP";
      else priceCurrency = c;
    }
    schema.offers = {
      "@type": "Offer",
      price: priceValue,
      priceCurrency,
      availability: "https://schema.org/InStock",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
