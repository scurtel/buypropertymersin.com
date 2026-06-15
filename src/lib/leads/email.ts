/**
 * Production note (Resend):
 * CONTACT_FROM_EMAIL must use a domain verified in Resend (e.g. buypropertymersin.com).
 * Until DNS/domain is verified, sending from noreply@buypropertymersin.com may fail.
 * Use Resend's onboarding domain for testing, or verify buypropertymersin.com first.
 */
import type { ContactLeadPayload } from "./types";

export interface EmailSendResult {
  sent: boolean;
  error?: string;
}

function getContactToEmail(): string {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "info@buypropertymersin.com"
  );
}

function getContactFromEmail(): string {
  return (
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Buy Property Mersin <noreply@buypropertymersin.com>"
  );
}

function buildEmailHtml(lead: ContactLeadPayload): string {
  const rows = [
    ["Source", lead.source || "contact-page"],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone / WhatsApp", lead.phone || "—"],
    ["Country", lead.country || "—"],
    ["Property Type", lead.propertyType || "—"],
    ["Budget", lead.budget || "—"],
    ["Property Title", lead.propertyTitle || "—"],
    ["Property URL", lead.propertyUrl || "—"],
    ["Message", lead.message],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e8dfd3;font-weight:600;vertical-align:top;">${label}</td><td style="padding:8px 12px;border:1px solid #e8dfd3;white-space:pre-wrap;">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#0f1f3d;max-width:600px;">
      <h2 style="color:#0f1f3d;margin-bottom:16px;">New property inquiry</h2>
      <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
    </div>
  `;
}

function buildEmailText(lead: ContactLeadPayload): string {
  return [
    "New property inquiry",
    "",
    `Source: ${lead.source || "contact-page"}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone / WhatsApp: ${lead.phone || "—"}`,
    `Country: ${lead.country || "—"}`,
    `Property Type: ${lead.propertyType || "—"}`,
    `Budget: ${lead.budget || "—"}`,
    `Property Title: ${lead.propertyTitle || "—"}`,
    `Property URL: ${lead.propertyUrl || "—"}`,
    "",
    "Message:",
    lead.message,
  ].join("\n");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadEmail(
  lead: ContactLeadPayload
): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false, error: "RESEND_API_KEY is not configured." };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const subject = lead.propertyTitle
      ? `Property inquiry: ${lead.propertyTitle}`
      : `New inquiry from ${lead.name}`;

    const { error } = await resend.emails.send({
      from: getContactFromEmail(),
      to: [getContactToEmail()],
      replyTo: lead.email,
      subject,
      html: buildEmailHtml(lead),
      text: buildEmailText(lead),
    });

    if (error) {
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send email notification.";
    return { sent: false, error: message };
  }
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
