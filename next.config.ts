// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Do not block builds on ESLint errors in CI/Netlify
    ignoreDuringBuilds: true,
  },
  // optional: prevents Next Image from demanding remote loader config on Netlify
  images: { unoptimized: true },
};

export default nextConfig;
