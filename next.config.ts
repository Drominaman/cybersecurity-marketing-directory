import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['resend', '@supabase/supabase-js'],
  },
  // Enforce canonical hostname: www -> non-www.
  // Belt-and-braces: Netlify also handles this at the edge, but having
  // it in code means it survives any platform reconfiguration and is
  // reviewable in PRs. See memory: seo_canonical_domain_setup.md
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.cybersecuritymarketingagencies.com',
          },
        ],
        destination: 'https://cybersecuritymarketingagencies.com/:path*',
        permanent: true,
      },
    ];
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
