import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep default Node.js server mode (not static export).
  // Required for /api/contact and server-side Resend/Gemini.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
