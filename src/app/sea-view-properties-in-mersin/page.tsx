import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { areaGuides } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Sea View Properties in Mersin",
  description:
    "Find sea view property in Mersin along the Mediterranean coast. Apartments and villas with coastal outlooks for foreign buyers.",
  path: "/sea-view-properties-in-mersin/",
  keywords: ["sea view property in Mersin"],
});

export default function SeaViewPage() {
  return (
    <CategoryPageTemplate
      config={{
        title: "Sea View Properties",
        h1: "Sea View Properties in Mersin",
        description:
          "Explore sea view property in Mersin — coastal apartments and villas with Mediterranean outlooks.",
        path: "/sea-view-properties-in-mersin/",
        propertyType: "Sea View",
        listingsTitle: "Sea View Properties",
        intro:
          "Sea view property in Mersin is sought after by buyers who value coastal living and natural light. Mezitli, Tece and Kızkalesi are among the areas where sea-facing homes are commonly listed.",
        bodyParagraphs: [
          "Views, orientation and distance from the shoreline all affect value and lifestyle. Some properties offer direct sea views while others provide partial or distant coastal outlooks.",
          "Confirm view rights and any future development plans in the area during your due diligence process.",
        ],
        relatedAreas: areaGuides.filter((a) =>
          ["Mezitli", "Tece", "Kızkalesi", "Çeşmeli"].includes(a.name)
        ),
      }}
    />
  );
}
