import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { areaGuides } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Apartments for Sale in Mersin",
  description:
    "Find apartments for sale in Mersin for foreign buyers. Modern flats, coastal residences and city apartments in Mezitli, Yenişehir and more.",
  path: "/apartments-for-sale-in-mersin/",
  keywords: ["apartments for sale in Mersin"],
});

export default function ApartmentsPage() {
  return (
    <CategoryPageTemplate
      config={{
        title: "Apartments",
        h1: "Apartments for Sale in Mersin",
        description:
          "Browse apartments for sale in Mersin — from modern city flats to coastal residences for foreign buyers.",
        path: "/apartments-for-sale-in-mersin/",
        propertyType: "Apartment",
        listingsTitle: "Apartments for Sale",
        intro:
          "Apartments are among the most popular property types for foreigners looking to buy property in Mersin. Districts such as Mezitli and Yenişehir offer new-build complexes with amenities, while coastal areas provide sea-view options at varying price points.",
        bodyParagraphs: [
          "When searching for apartments for sale in Mersin, consider proximity to beaches, public transport, shopping and healthcare. Many developments cater to international buyers with English-speaking agents and clear title documentation.",
          "Prices and availability change regularly. We recommend viewing properties in person or via video tour and conducting independent legal checks before purchase.",
        ],
        relatedAreas: areaGuides.slice(0, 4),
      }}
    />
  );
}
