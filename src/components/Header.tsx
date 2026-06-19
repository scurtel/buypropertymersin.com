"use client";

import Link from "next/link";
import { useState } from "react";
import { site, getWhatsAppUrl } from "@/lib/site";

const navLinks = [
  { href: "/properties/", label: "Properties" },
  { href: "/apartments-for-sale-in-mersin/", label: "Apartments" },
  { href: "/villas-for-sale-in-mersin/", label: "Villas" },
  { href: "/blog/", label: "Blog" },
  { href: "/buying-property-in-turkey/", label: "Buying Guide" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-beige-dark/40 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-navy sm:text-xl">
            {site.siteName}
          </span>
          <span className="text-xs text-gray-muted">Mersin, Türkiye</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-beige-dark/40 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-lg bg-[#25D366] px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Contact on WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
