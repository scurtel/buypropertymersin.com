import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { areaGuides } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Investment Properties in Mersin",
  description:
    "Explore investment property in Mersin for foreign buyers. Rental potential and growing districts — subject to market conditions and regulations.",
  path: "/investment-properties-in-mersin/",
  keywords: ["investment property in Mersin"],
});

export default function InvestmentPage() {
  return (
    <CategoryPageTemplate
      config={{
        title: "Investment Properties",
        h1: "Investment Properties in Mersin",
        description:
          "Consider investment property in Mersin — rental and long-term options for international buyers. Outcomes depend on location and market conditions.",
        path: "/investment-properties-in-mersin/",
        propertyType: "Investment",
        listingsTitle: "Investment Properties",
        intro:
          "Mersin's growing population, coastal appeal and relatively accessible entry prices attract buyers exploring investment property in Mersin. Erdemli, Yenişehir and central districts may offer rental demand from local residents, students and seasonal visitors.",
        bodyParagraphs: [
          "Investment returns are not guaranteed. Rental income, occupancy rates and property values depend on economic conditions, property management and local regulations. Consult a tax adviser regarding obligations for foreign property owners.",
          "We recommend thorough due diligence, realistic budgeting for maintenance and awareness of short-term rental rules where applicable.",
        ],
        relatedAreas: areaGuides.filter((a) =>
          ["Erdemli", "Yenişehir", "Mezitli", "Tömük"].includes(a.name)
        ),
      }}
    />
  );
}
