import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { PageSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Buy Property Mersin for apartments, villas and investment property enquiries. WhatsApp and inquiry form available for foreign buyers.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ]}
      />
      <PageHeader
        title="Contact Us"
        description="Tell us what you are looking for and we will help you find suitable property options in Mersin."
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-navy">Get in Touch</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                We respond to enquiries in English and can assist foreign buyers
                exploring Mersin real estate. For a faster response, message us
                on WhatsApp.
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-beige-dark/60 bg-white p-4 text-sm font-medium text-navy transition-colors hover:border-gold"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                    WA
                  </span>
                  Contact on WhatsApp
                </a>
                <div className="rounded-lg border border-beige-dark/60 bg-white p-4 text-sm text-navy/70">
                  <p className="font-medium text-navy">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 text-gold hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-beige-dark/60 bg-white p-6 sm:p-8 lg:col-span-3">
              <h2 className="text-lg font-semibold text-navy">Send Inquiry</h2>
              <div className="mt-6">
                <ContactForm source="contact-page" id="contact-page-form" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
