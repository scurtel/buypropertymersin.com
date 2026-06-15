import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CategoryPageTemplate } from "@/components/CategoryPageTemplate";
import { areaGuides } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Property in Mersin",
  description:
    "Commercial real estate in Mersin — retail, office and mixed-use properties for business-oriented foreign investors.",
  path: "/commercial-property-in-mersin/",
});

export default function CommercialPage() {
  return (
    <CategoryPageTemplate
      config={{
        title: "Commercial",
        h1: "Commercial Property in Mersin",
        description:
          "Explore commercial property options in Mersin for business and investment purposes.",
        path: "/commercial-property-in-mersin/",
        intro:
          "Commercial property in Mersin includes retail units, office space and mixed-use buildings, primarily in central districts and along major commercial corridors. Foreign ownership of commercial real estate is subject to specific regulations.",
        bodyParagraphs: [
          "Due diligence for commercial purchases should cover tenant leases, zoning compliance, fire safety certificates and VAT implications. Professional legal and tax advice is strongly recommended.",
          "Yenişehir and the city centre are common areas for commercial activity. Evaluate foot traffic, parking and local competition for retail investments.",
        ],
        relatedAreas: areaGuides.filter((a) =>
          ["Yenişehir", "Mezitli", "Erdemli"].includes(a.name)
        ),
      }}
    />
  );
}
