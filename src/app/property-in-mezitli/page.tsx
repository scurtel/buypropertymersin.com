import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AreaPageTemplate } from "@/components/AreaPageTemplate";
import { areaPageConfigs } from "@/lib/area-pages";

const config = areaPageConfigs.mezitli;

export const metadata: Metadata = buildMetadata({
  title: `Property in ${config.name}, Mersin`,
  description: config.description,
  path: config.path,
  keywords: ["property in Mezitli Mersin", "apartments for sale in Mersin"],
});

export default function MezitliPage() {
  return <AreaPageTemplate config={config} />;
}
