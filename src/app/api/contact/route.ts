import { NextResponse } from "next/server";
import { processLead } from "@/lib/leads/process-lead";
import {
  isHoneypotTriggered,
  validateContactPayload,
} from "@/lib/leads/validation";

const SUCCESS_MESSAGE =
  "Thank you for your inquiry. We will review your requirements and get back to you shortly.";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (isHoneypotTriggered(body)) {
      return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
    }

    const validation = validateContactPayload(body);

    if (!validation.success || !validation.data) {
      const firstError =
        validation.errors &&
        Object.values(validation.errors).find(Boolean);

      return NextResponse.json(
        {
          error: firstError || "Please check the form and try again.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { lead } = await processLead(validation.data);

    return NextResponse.json({
      success: true,
      message: SUCCESS_MESSAGE,
      leadId: lead.id,
      emailSent: lead.emailSent,
    });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json(
      { error: "Unable to submit your inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
