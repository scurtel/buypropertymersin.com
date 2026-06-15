import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/properties/", label: "Properties" },
  { href: "/apartments-for-sale-in-mersin/", label: "Apartments" },
  { href: "/villas-for-sale-in-mersin/", label: "Villas" },
  { href: "/property-in-mezitli/", label: "Area Guides" },
  { href: "/buying-property-in-turkey/", label: "Buying Guide" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-beige-dark/40 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-bold text-gold">{site.siteName}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {site.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Legal
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-white/60">
              Information on this website is for general informational purposes
              only. Property laws, residence permit rules and investment
              conditions may change. Buyers should seek professional legal and
              real estate advice before making a decision.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} {site.siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
