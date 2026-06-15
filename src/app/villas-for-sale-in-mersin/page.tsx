import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { areaGuides } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Villas for Sale in Mersin",
  description:
    "Explore villas for sale in Mersin near the Mediterranean coast. Detached homes and family villas for foreign buyers in Çeşmeli, Erdemli and more.",
  path: "/villas-for-sale-in-mersin/",
  keywords: ["villas for sale in Mersin"],
});

export default function VillasPage() {
  return (
    <CategoryPageTemplate
      config={{
        title: "Villas",
        h1: "Villas for Sale in Mersin",
        description:
          "Discover villas for sale in Mersin — spacious coastal homes with gardens for lifestyle and family living.",
        path: "/villas-for-sale-in-mersin/",
        propertyType: "Villa",
        listingsTitle: "Villas for Sale",
        intro:
          "Villas for sale in Mersin appeal to buyers seeking privacy, outdoor space and proximity to the Mediterranean. Areas such as Çeşmeli, Ayaş and parts of Erdemli are known for detached homes near the coast.",
        bodyParagraphs: [
          "Villa options range from compact two-bedroom homes to larger properties with pools and sea views. Maintenance, security and access to services should be considered alongside purchase price.",
          "As with any property purchase in Türkiye, verify building permits, title deed status and any shared costs before completing a transaction.",
        ],
        relatedAreas: areaGuides.filter((a) =>
          ["Çeşmeli", "Ayaş", "Erdemli", "Tömük"].includes(a.name)
        ),
      }}
    />
  );
}
