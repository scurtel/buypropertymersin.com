export type LeadSource = "contact-page" | "property-detail";

export interface ContactLeadPayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
  country?: string;
  propertyType?: string;
  budget?: string;
  propertyTitle?: string;
  propertyUrl?: string;
  source?: LeadSource;
}

export interface LeadRecord extends ContactLeadPayload {
  id: string;
  createdAt: string;
  source: LeadSource;
  emailSent: boolean;
  emailError?: string;
}

export interface ValidationResult {
  success: boolean;
  data?: ContactLeadPayload;
  errors?: Record<string, string>;
}
