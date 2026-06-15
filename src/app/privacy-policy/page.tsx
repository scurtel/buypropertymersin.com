import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}. How we collect, use and protect your personal information.`,
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy/" },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy/" },
        ]}
      />
      <PageHeader title="Privacy Policy" />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-sm leading-relaxed text-navy/80 sm:px-6 lg:px-8">
          <p>Last updated: June 2025</p>

          <h2 className="text-lg font-semibold text-navy">Information We Collect</h2>
          <p>
            When you contact us via the inquiry form, WhatsApp or email, we may
            collect your name, email address, phone number, country, property
            preferences and message content.
          </p>

          <h2 className="text-lg font-semibold text-navy">How We Use Your Information</h2>
          <p>
            We use your information to respond to enquiries, provide property
            recommendations and improve our services. We do not sell your personal
            data to third parties.
          </p>

          <h2 className="text-lg font-semibold text-navy">Data Retention</h2>
          <p>
            We retain contact information for as long as necessary to fulfil your
            enquiry and comply with applicable legal obligations.
          </p>

          <h2 className="text-lg font-semibold text-navy">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal
            data by contacting us. Applicable data protection laws may provide
            additional rights depending on your location.
          </p>

          <h2 className="text-lg font-semibold text-navy">Cookies</h2>
          <p>
            This website may use essential cookies for basic functionality.
            Analytics tools may be added in the future with appropriate consent
            mechanisms where required.
          </p>

          <h2 className="text-lg font-semibold text-navy">Contact</h2>
          <p>
            For privacy-related questions, please contact us via the contact page
            on this website.
          </p>
        </div>
      </section>
    </>
  );
}
