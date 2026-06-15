export interface PropertyCategory {
  title: string;
  description: string;
  href: string;
  image: string;
}

export type { Property, PropertyType } from "./properties";
export {
  properties,
  getAllProperties,
  getPropertyBySlug,
  getFeaturedProperties,
  getPropertiesByArea,
  getPropertiesByType,
  getPropertyHref,
  getPropertySummary,
} from "./properties";

export interface AreaGuide {
  name: string;
  description: string;
  href: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const propertyCategories: PropertyCategory[] = [
  {
    title: "Apartments for Sale in Mersin",
    description:
      "Browse modern and affordable apartments across Mersin, from city-centre flats to coastal residences ideal for foreign buyers seeking Mersin real estate.",
    href: "/apartments-for-sale-in-mersin/",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    title: "Villas for Sale in Mersin",
    description:
      "Explore detached villas and family homes near the Mediterranean coast, offering space, privacy and the Mersin coastal lifestyle.",
    href: "/villas-for-sale-in-mersin/",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    title: "Sea View Properties",
    description:
      "Discover sea view property in Mersin with panoramic Mediterranean outlooks, popular among buyers seeking coastal living and lifestyle homes.",
    href: "/sea-view-properties-in-mersin/",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    title: "Investment Properties",
    description:
      "Find investment property in Mersin with rental potential and growing demand. Suitable for buyers exploring real estate in Mersin for foreigners.",
    href: "/investment-properties-in-mersin/",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  },
  {
    title: "Land for Sale",
    description:
      "View land plots and development opportunities across Mersin and surrounding districts for custom builds or long-term investment.",
    href: "/land-for-sale-in-mersin/",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  },
  {
    title: "Commercial Properties",
    description:
      "Commercial real estate options in Mersin including retail, office and mixed-use spaces for business-oriented buyers.",
    href: "/commercial-property-in-mersin/",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
];

export const areaGuides: AreaGuide[] = [
  {
    name: "Mezitli",
    description:
      "A popular coastal district with beaches, promenades and a mix of apartments and villas for foreign buyers.",
    href: "/property-in-mezitli/",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    name: "Yenişehir",
    description:
      "Modern urban area with new residential projects, shopping and good connections across Mersin.",
    href: "/property-in-yenisehir-mersin/",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
  },
  {
    name: "Erdemli",
    description:
      "Coastal town west of Mersin, known for beaches, nature and more affordable property options.",
    href: "/property-in-erdemli/",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    name: "Çeşmeli",
    description:
      "Quiet seaside neighbourhood favoured by buyers seeking villas and coastal lifestyle homes.",
    href: "/property-in-cesmeli/",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
  },
  {
    name: "Tece",
    description:
      "Residential coastal area with beach access and a relaxed Mediterranean atmosphere.",
    href: "/property-in-tece/",
    image:
      "https://images.unsplash.com/photo-1519046904214-496b3fb49efb?w=800&q=80",
  },
  {
    name: "Tömük",
    description:
      "Growing district near Erdemli with new developments and proximity to the coastline.",
    href: "/property-in-tomuk/",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
  },
  {
    name: "Ayaş",
    description:
      "Seaside area with holiday homes and villas, popular for seasonal and year-round living.",
    href: "/property-in-ayas/",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
  },
  {
    name: "Kızkalesi",
    description:
      "Historic coastal town with a famous castle, beaches and a mix of apartments and holiday properties.",
    href: "/property-in-kizkalesi/",
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
  },
];

export const homeFaq: FaqItem[] = [
  {
    question: "Can foreigners buy property in Mersin?",
    answer:
      "In most cases, foreign nationals can purchase property in Mersin and across Türkiye, subject to current laws, title deed checks and any restrictions on specific locations or property types. Rules may change, so professional legal advice is recommended before proceeding.",
  },
  {
    question: "Is Mersin a good place for real estate investment?",
    answer:
      "Mersin offers a Mediterranean coastal location, relatively accessible pricing compared to some Turkish cities, and growing residential areas. Investment outcomes depend on location, property condition, rental demand and market conditions. Past performance does not guarantee future results.",
  },
  {
    question: "Which areas of Mersin are popular for foreign buyers?",
    answer:
      "Mezitli, Yenişehir, Erdemli, Çeşmeli, Tece, Tömük, Ayaş and Kızkalesi are among the areas often considered by international buyers. Preferences vary based on lifestyle, budget and property type.",
  },
  {
    question: "What are the costs when buying property in Türkiye?",
    answer:
      "Typical costs may include the purchase price, title deed transfer fees, notary charges, translation of documents, and potential agent or legal fees. Taxes and ongoing costs also apply. Exact amounts depend on the property and current regulations.",
  },
  {
    question: "Do I need a lawyer when buying property in Türkiye?",
    answer:
      "While not always legally required in every scenario, many foreign buyers choose to work with a qualified lawyer to review contracts, conduct due diligence and oversee the title deed (Tapu) process. This can help reduce risk.",
  },
  {
    question: "Can buying property in Türkiye give me residence permit rights?",
    answer:
      "In some circumstances, property ownership may support certain residence permit applications, but eligibility rules, thresholds and procedures can change. Buying property does not automatically guarantee a residence permit. Obtain up-to-date advice from a licensed immigration or legal professional.",
  },
];

export const whyMersinPoints = [
  {
    title: "Mediterranean coastal city",
    text: "Mersin sits on Türkiye's southern coast with beaches, marinas and a warm climate that appeals to lifestyle-focused buyers.",
  },
  {
    title: "More affordable than Antalya and Istanbul",
    text: "Property for sale in Mersin is often priced below major resort and metropolitan markets, which may suit budget-conscious international buyers.",
  },
  {
    title: "Growing real estate market",
    text: "New residential developments and infrastructure continue across the province, attracting both local and foreign interest in Mersin real estate.",
  },
  {
    title: "Suitable for lifestyle and investment",
    text: "Buyers explore Mersin for retirement, holiday homes and rental potential. Outcomes vary and should be assessed individually.",
  },
  {
    title: "Modern residential areas",
    text: "Districts such as Yenişehir and Mezitli offer contemporary apartments, amenities and urban convenience alongside coastal access.",
  },
  {
    title: "Easy access to beaches, marinas and city life",
    text: "From seafront promenades to city centres and nearby towns, Mersin combines coastal living with practical daily infrastructure.",
  },
];

export const foreignBuyerTopics = [
  {
    title: "Can foreigners buy property in Türkiye?",
    content:
      "Foreign nationals from many countries can purchase real estate in Türkiye, including in Mersin, provided they meet legal requirements. Restrictions may apply to certain border areas, military zones or property types. Always verify your eligibility with an authorised professional before signing any agreement.",
  },
  {
    title: "Property purchase process",
    content:
      "The process typically involves property selection, negotiation, a preliminary agreement, due diligence, opening a bank account if required, and completion at the Land Registry (Tapu) office. Timelines and steps may vary depending on the property and financing method.",
  },
  {
    title: "Title deed / Tapu process",
    content:
      "The Tapu is the official title deed registered with the Turkish Land Registry. Transfer requires verified identity documents, payment of applicable fees, and confirmation that the property has no outstanding debts or encumbrances. A lawyer or licensed agent can assist with checks.",
  },
  {
    title: "Required documents",
    content:
      "Buyers generally need a valid passport, Turkish tax number, translated documents where applicable, and bank documentation for fund transfers. Additional paperwork may be required depending on nationality and property type.",
  },
  {
    title: "Taxes and expenses",
    content:
      "Purchase-related costs may include title deed transfer tax, notary fees, appraisal fees, and annual property tax. If you plan to rent the property, additional tax obligations may apply. Consult a tax adviser for current rates.",
  },
  {
    title: "Legal support and due diligence",
    content:
      "Due diligence includes verifying title ownership, checking for liens or debts, reviewing building permits and confirming zoning compliance. Engaging independent legal counsel is advisable for foreign buyers unfamiliar with local procedures.",
  },
  {
    title: "Residence permit note",
    content:
      "Buying property may support certain residence permit processes, but rules may change and buyers should obtain professional legal advice. Property ownership alone does not guarantee residency status or citizenship.",
  },
];
