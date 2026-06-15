import { randomUUID } from "crypto";
import { sendLeadEmail } from "./email";
import { saveLeadToJson } from "./storage";
import type { ContactLeadPayload, LeadRecord } from "./types";

export interface ProcessLeadResult {
  lead: LeadRecord;
}

export async function processLead(
  payload: ContactLeadPayload
): Promise<ProcessLeadResult> {
  const emailResult = await sendLeadEmail(payload);

  const lead: LeadRecord = {
    ...payload,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    source: payload.source ?? "contact-page",
    emailSent: emailResult.sent,
    emailError: emailResult.error,
  };

  await saveLeadToJson(lead);

  if (!emailResult.sent) {
    console.info("[Lead]", {
      id: lead.id,
      source: lead.source,
      email: lead.email,
      propertyTitle: lead.propertyTitle,
      emailSent: false,
      emailError: emailResult.error,
    });
  }

  return { lead };
}
