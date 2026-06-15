import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/site";

interface CTAProps {
  title?: string;
  description?: string;
  showInquiry?: boolean;
}

export function CTA({
  title = "Looking for Property in Mersin?",
  description = "Tell us what type of property you are looking for and we will help you find suitable options in Mersin.",
  showInquiry = true,
}: CTAProps) {
  return (
    <section className="bg-navy py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-white/80">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.557 4.126 1.528 5.867L0 24l6.335-1.662A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.82 9.82 0 01-5.01-1.378l-.36-.214-3.76.987 1.004-3.67-.235-.374A9.82 9.82 0 1121.82 12 9.83 9.83 0 0112 21.82z" />
            </svg>
            Contact on WhatsApp
          </a>
          {showInquiry && (
            <Link
              href="/contact/"
              className="inline-flex w-full items-center justify-center rounded-lg border-2 border-gold bg-transparent px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy sm:w-auto"
            >
              Send Inquiry
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
