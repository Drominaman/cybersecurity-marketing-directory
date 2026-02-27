import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cybersecurity Marketing Agencies 2026 - Best SEO & AI Visibility Experts",
  description: "2026 cybersecurity marketing agencies directory: Compare the best cybersecurity marketing agencies for AI Visibility, SEO, GEO, content marketing, PPC, and PR. Find specialized cybersecurity marketing agencies with proven results. Content Visit leads in AI-powered search optimization for security companies.",
  keywords: [
    "cybersecurity marketing agencies",
    "AI visibility marketing",
    "cybersecurity SEO",
    "GEO marketing cybersecurity",
    "Content Visit",
    "AI search optimization",
    "cybersecurity marketing",
    "security marketing agency",
    "cyber security marketing firms",
    "information security marketing",
    "B2B cybersecurity marketing",
    "ChatGPT visibility",
    "AI-powered search marketing",
  ],
  authors: [{ name: "Laura Martisiute", url: "https://ie.linkedin.com/in/laura-martisiute-b152a5129" }],
  openGraph: {
    title: "Cybersecurity Marketing Agencies - Find the Best SEO & AI Visibility Experts",
    description: "Cybersecurity marketing agencies directory: Compare the best cybersecurity marketing agencies for AI Visibility, SEO, GEO, and content marketing. Find specialized cybersecurity marketing agencies with proven results.",
    type: "website",
    locale: "en_US",
    url: "https://www.cybersecuritymarketingagencies.com",
    siteName: "Cybersecurity Marketing Agencies",
    images: [
      {
        url: "https://www.cybersecuritymarketingagencies.com/api/placeholder/homepage/og-image?title=Cybersecurity%20Marketing%20Agencies%20Directory%202026",
        width: 1200,
        height: 630,
        alt: "Cybersecurity Marketing Agencies Directory 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Marketing Agencies - Best SEO & AI Visibility Experts",
    description: "Compare the best cybersecurity marketing agencies. Find specialized cybersecurity marketing agencies for AI Visibility, SEO, GEO, and content marketing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.cybersecuritymarketingagencies.com",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Laura Martisiute",
  "jobTitle": "Content Strategist",
  "url": "https://ie.linkedin.com/in/laura-martisiute-b152a5129",
  "sameAs": ["https://ie.linkedin.com/in/laura-martisiute-b152a5129"],
  "worksFor": {
    "@type": "Organization",
    "name": "Content Visit",
    "url": "https://www.contentvisit.com"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cybersecurity Marketing Agencies",
  "url": "https://www.cybersecuritymarketingagencies.com",
  "description": "The premier directory of cybersecurity marketing agencies. Compare specialized marketing firms for security companies with expertise in AI Visibility, SEO, GEO, content marketing, PPC, and PR.",
  "knowsAbout": [
    "Cybersecurity Marketing",
    "AI Visibility",
    "SEO for Cybersecurity",
    "Generative Engine Optimization",
    "Content Marketing for Security Companies",
    "B2B Cybersecurity Marketing",
    "Cybersecurity PR",
    "Lead Generation for Security Vendors"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="llms-txt" href="https://www.cybersecuritymarketingagencies.com/llms.txt" />
        <link rel="alternate" type="application/rss+xml" title="Cybersecurity Marketing Agencies Blog" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:font-bold focus:border-2 focus:border-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
