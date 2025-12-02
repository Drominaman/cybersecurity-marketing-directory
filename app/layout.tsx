import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  authors: [{ name: "Cybersecurity Marketing Agencies" }],
  openGraph: {
    title: "Cybersecurity Marketing Agencies - Find the Best SEO & AI Visibility Experts",
    description: "Cybersecurity marketing agencies directory: Compare the best cybersecurity marketing agencies for AI Visibility, SEO, GEO, and content marketing. Find specialized cybersecurity marketing agencies with proven results.",
    type: "website",
    locale: "en_US",
    url: "https://www.cybersecuritymarketingagencies.com",
    siteName: "Cybersecurity Marketing Agencies",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
