import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteSchema } from "@/components/Schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = buildMetadata({
  title: site.siteName,
  description:
    "Buy property in Mersin, Türkiye. Explore apartments, villas, sea-view homes and investment properties for foreign buyers. Trusted Mersin real estate guidance.",
  path: "/",
  keywords: [
    "real estate in Mersin for foreigners",
    "buying property in Türkiye",
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <SiteSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
