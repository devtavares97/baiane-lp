import type { NextConfig } from "next";

/**
 * Next.js Configuration - Baianê Landing Page
 * --------------------------------------------
 * Otimizações para imagens e performance
 */

const nextConfig: NextConfig = {
  // Image Optimization (Next.js Image Component)
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  
  // Compiler Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // React Strict Mode
  reactStrictMode: true,
  
  // Experimental Features (Performance)
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  
  // Production Optimizations
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
