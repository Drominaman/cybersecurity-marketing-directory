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
    // Allow unoptimized images for local API routes
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
