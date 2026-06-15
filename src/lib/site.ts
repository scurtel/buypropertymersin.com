const PRODUCTION_BASE_URL = "https://buypropertymersin.com";

function normalizeBaseUrl(raw: string | undefined): string {
  if (!raw?.trim()) {
    return PRODUCTION_BASE_URL;
  }

  let url = raw.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  return url.replace(/\/$/, "");
}

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@buypropertymersin.com";

export const site = {
  siteName: "Buy Property Mersin",
  domain: "buypropertymersin.com",
  baseUrl: normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL),
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "905XXXXXXXXX",
  email: contactEmail,
  defaultOgImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  address: "Mersin",
  city: "Mersin",
  region: "Mersin",
  country: "TR",
  telephone: "+90 XXX XXX XX XX",
  description:
    "Buy Property Mersin helps foreign buyers explore real estate opportunities in Mersin, Türkiye, including apartments, villas, sea-view homes and investment properties.",
} as const;

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage = "Hello, I am interested in property in Mersin.";
  const text = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export function getPropertyWhatsAppUrl(
  propertyTitle: string,
  propertyUrl: string
): string {
  const message = `Hello, I am interested in this property: ${propertyTitle} - ${propertyUrl}`;
  return getWhatsAppUrl(message);
}

export function absoluteSiteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.baseUrl}${normalized}`;
}

// Backward-compatible named exports
export const SITE_NAME = site.siteName;
export const SITE_URL = site.baseUrl;
export const WHATSAPP_NUMBER = site.whatsappNumber;
export const WHATSAPP_URL = getWhatsAppUrl();
export const CONTACT_EMAIL = site.email;

export const BUSINESS = {
  name: site.siteName,
  description: site.description,
  address: {
    locality: site.city,
    region: site.region,
    country: site.country,
  },
  telephone: site.telephone,
};
