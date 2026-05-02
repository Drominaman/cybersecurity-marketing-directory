import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['resend', '@supabase/supabase-js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cybersecuritymarketingagencies.com',
        pathname: '/api/placeholder/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Allow query strings for local API routes
    localPatterns: [
      {
        pathname: '/api/placeholder/**',
        search: '',
      },
    ],
    // Allow unoptimized images for local API routes
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
