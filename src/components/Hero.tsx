import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/site";

const trustPoints = [
  "Local real estate guidance",
  "Support for foreign buyers",
  "Apartments, villas and investment homes",
  "Mersin coastal lifestyle",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')] bg-cover bg-center opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Mersin Real Estate for Foreign Buyers
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Buy Property in Mersin, Türkiye
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
            Discover apartments, villas, sea-view homes and investment
            properties in Mersin for foreign buyers.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/properties/"
              className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
            >
              View Properties
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Contact on WhatsApp
            </a>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-white/80">
                <svg className="h-5 w-5 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
