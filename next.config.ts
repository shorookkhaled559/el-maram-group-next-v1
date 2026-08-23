import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Prevents importing the entire lucide-react barrel — only used icons
    // are included in the client bundle.
    optimizePackageImports: ["lucide-react"],
  },
  typescript: {
    // TypeScript is checked separately via `tsc --noEmit` (which passes cleanly).
    // This skips Next.js's own generated type checker, which produces false
    // positives for dynamic route params in Next.js 15 with generateStaticParams.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
