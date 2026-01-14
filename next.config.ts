import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cybersecuritymarketingagencies.com',
        pathname: '/api/placeholder/**',
      },
    ],
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
