"use client";

import { useState, FormEvent } from "react";

const propertyTypes = [
  "Apartment",
  "Villa",
  "Sea View Property",
  "Investment Property",
  "Land",
  "Commercial",
  "Not sure yet",
];

type FormStatus = "idle" | "loading" | "success" | "error";

import type { LeadSource } from "@/lib/leads/types";

interface ContactFormProps {
  propertyTitle?: string;
  propertyUrl?: string;
  source?: LeadSource;
  id?: string;
}

export function ContactForm({
  propertyTitle,
  propertyUrl,
  source = "contact-page",
  id = "contact-form",
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFeedback(
          result.message || "Thank you. We will be in touch shortly."
        );
        form.reset();
      } else {
        setStatus("error");
        setFeedback(result.error || "Something went wrong. Please try again.");
        if (result.errors && typeof result.errors === "object") {
          setFieldErrors(result.errors as Record<string, string>);
        }
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Unable to send your inquiry. Please contact us via WhatsApp."
      );
    }
  }

  const inputClass = (field: string) =>
    `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-navy placeholder:text-gray-muted focus:outline-none focus:ring-1 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
        : "border-beige-dark/60 focus:border-gold focus:ring-gold"
    }`;

  return (
    <form id={id} onSubmit={handleSubmit} className="relative space-y-5" noValidate>
      {propertyTitle && (
        <div className="rounded-lg border border-gold/30 bg-beige/60 px-4 py-3 text-sm text-navy">
          <span className="font-medium">Inquiring about:</span> {propertyTitle}
        </div>
      )}

      {propertyTitle && (
        <input type="hidden" name="propertyTitle" value={propertyTitle} />
      )}
      {propertyUrl && (
        <input type="hidden" name="propertyUrl" value={propertyUrl} />
      )}
      <input type="hidden" name="source" value={source} />

      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_honeypot">Leave blank</label>
        <input id="_honeypot" name="_honeypot" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium text-navy">
            Name *
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            disabled={status === "loading"}
            className={inputClass("name")}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? `${id}-name-error` : undefined}
          />
          {fieldErrors.name && (
            <p id={`${id}-name-error`} className="mt-1 text-xs text-red-600">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium text-navy">
            Email *
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            disabled={status === "loading"}
            className={inputClass("email")}
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="mb-1.5 block text-sm font-medium text-navy">
            Phone / WhatsApp
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            disabled={status === "loading"}
            className={inputClass("phone")}
          />
        </div>
        <div>
          <label htmlFor={`${id}-country`} className="mb-1.5 block text-sm font-medium text-navy">
            Country
          </label>
          <input
            id={`${id}-country`}
            name="country"
            type="text"
            disabled={status === "loading"}
            className={inputClass("country")}
          />
        </div>
        <div>
          <label htmlFor={`${id}-propertyType`} className="mb-1.5 block text-sm font-medium text-navy">
            Property Type
          </label>
          <select
            id={`${id}-propertyType`}
            name="propertyType"
            disabled={status === "loading"}
            className={inputClass("propertyType")}
          >
            <option value="">Select...</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-budget`} className="mb-1.5 block text-sm font-medium text-navy">
            Budget
          </label>
          <input
            id={`${id}-budget`}
            name="budget"
            type="text"
            placeholder="e.g. €100,000 – €200,000"
            disabled={status === "loading"}
            className={inputClass("budget")}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium text-navy">
          Message *
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          disabled={status === "loading"}
          className={inputClass("message")}
          placeholder={
            propertyTitle
              ? `I am interested in ${propertyTitle}. Please share more details...`
              : "Tell us what you are looking for in Mersin..."
          }
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
        )}
      </div>

      {status === "loading" && (
        <p className="text-sm text-navy/70" role="status" aria-live="polite">
          Sending your inquiry...
        </p>
      )}

      {status === "success" && feedback && (
        <div
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          role="status"
          aria-live="polite"
        >
          {feedback}
        </div>
      )}

      {status === "error" && feedback && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {feedback}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
