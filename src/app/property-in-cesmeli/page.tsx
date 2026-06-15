import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { AreaPageTemplate } from "@/components/AreaPageTemplate";
import { areaPageConfigs } from "@/lib/area-pages";

const config = areaPageConfigs.cesmeli;

export const metadata: Metadata = buildMetadata({
  title: `Property in ${config.name}, Mersin`,
  description: config.description,
  path: config.path,
});

export default function CesmeliPage() {
  return <AreaPageTemplate config={config} />;
}
