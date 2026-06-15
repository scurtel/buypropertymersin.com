import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { areaGuides } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Land for Sale in Mersin",
  description:
    "Browse land for sale in Mersin and surrounding districts. Plots and development land for foreign buyers.",
  path: "/land-for-sale-in-mersin/",
});

export default function LandPage() {
  return (
    <CategoryPageTemplate
      config={{
        title: "Land",
        h1: "Land for Sale in Mersin",
        description:
          "Explore land plots and development opportunities in Mersin province.",
        path: "/land-for-sale-in-mersin/",
        intro:
          "Land for sale in Mersin attracts buyers planning custom villa builds or long-term land banking. Plots are available in coastal districts such as Erdemli and inland areas with varying zoning classifications.",
        bodyParagraphs: [
          "Zoning status, road access, utility connections and title clarity are critical when purchasing land in Türkiye. Engage a lawyer to verify imar (zoning) documents and building permissions.",
          "Land investment carries distinct risks compared to completed housing. Market liquidity and development costs should be carefully evaluated.",
        ],
        relatedAreas: areaGuides.filter((a) =>
          ["Erdemli", "Tömük", "Ayaş", "Çeşmeli"].includes(a.name)
        ),
      }}
    />
  );
}
