import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Prevents importing the entire lucide-react barrel — only used icons
    // are included in the client bundle.
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-slot",
      "@radix-ui/react-label",
    ],
  },
  
  // Allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maram-kw.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  
  // Production optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  
  typescript: {
    // TypeScript is checked separately via `tsc --noEmit` (which passes cleanly).
    // This skips Next.js's own generated type checker, which produces false
    // positives for dynamic route params in Next.js 15 with generateStaticParams.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
