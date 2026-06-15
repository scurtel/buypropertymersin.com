import type { ContactLeadPayload, LeadSource, ValidationResult } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MIN_NAME = 2;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 5000;

const ALLOWED_SOURCES = new Set<LeadSource>(["contact-page", "property-detail"]);

const ALLOWED_PROPERTY_TYPES = new Set([
  "Apartment",
  "Villa",
  "Sea View Property",
  "Investment Property",
  "Land",
  "Commercial",
  "Not sure yet",
  "",
]);

function trimString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalField(value: unknown, maxLength: number): string | undefined {
  const trimmed = trimString(value);
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

export function validateContactPayload(
  body: Record<string, unknown>
): ValidationResult {
  const errors: Record<string, string> = {};

  const name = trimString(body.name);
  const email = trimString(body.email).toLowerCase();
  const message = trimString(body.message);
  const phone = optionalField(body.phone, 30);
  const country = optionalField(body.country, 100);
  const budget = optionalField(body.budget, 100);
  const propertyTitle = optionalField(body.propertyTitle, 200);
  const propertyUrl = optionalField(body.propertyUrl, 500);
  const propertyTypeRaw = trimString(body.propertyType);
  const sourceRaw = trimString(body.source) as LeadSource | "";

  if (!name || name.length < MIN_NAME) {
    errors.name = `Name must be at least ${MIN_NAME} characters.`;
  } else if (name.length > MAX_NAME) {
    errors.name = `Name must be at most ${MAX_NAME} characters.`;
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email is too long.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < MIN_MESSAGE) {
    errors.message = `Message must be at least ${MIN_MESSAGE} characters.`;
  } else if (message.length > MAX_MESSAGE) {
    errors.message = `Message must be at most ${MAX_MESSAGE} characters.`;
  }

  if (propertyTypeRaw && !ALLOWED_PROPERTY_TYPES.has(propertyTypeRaw)) {
    errors.propertyType = "Please select a valid property type.";
  }

  if (sourceRaw && !ALLOWED_SOURCES.has(sourceRaw)) {
    errors.source = "Invalid form source.";
  }

  if (propertyUrl) {
    try {
      new URL(propertyUrl);
    } catch {
      errors.propertyUrl = "Property URL is invalid.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const data: ContactLeadPayload = {
    name,
    email,
    message,
    source: sourceRaw && ALLOWED_SOURCES.has(sourceRaw) ? sourceRaw : "contact-page",
  };

  if (phone) data.phone = phone;
  if (country) data.country = country;
  if (budget) data.budget = budget;
  if (propertyTitle) data.propertyTitle = propertyTitle;
  if (propertyUrl) data.propertyUrl = propertyUrl;
  if (propertyTypeRaw) data.propertyType = propertyTypeRaw;

  return { success: true, data };
}

export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  const honeypot = trimString(body._honeypot);
  return honeypot.length > 0;
}
