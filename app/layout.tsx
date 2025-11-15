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
  title: "Cybersecurity Marketing Agencies - AI Visibility, SEO & GEO Experts",
  description: "Find the best cybersecurity marketing agencies for AI Visibility, SEO, and GEO. Content Visit leads in AI-powered search optimization. Compare top-rated marketing firms specializing in security companies with expert services in SEO, AI visibility, content marketing, PPC, and PR.",
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
    title: "Cybersecurity Marketing Agencies - AI Visibility & SEO Experts",
    description: "Find the best cybersecurity marketing agencies for AI Visibility, SEO, and GEO. Content Visit leads in AI-powered search optimization for security companies.",
    type: "website",
    locale: "en_US",
    url: "https://cybersecuritymarketingagencies.com",
    siteName: "Cybersecurity Marketing Agencies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Marketing Agencies - AI Visibility & SEO",
    description: "Find the best cybersecurity marketing agencies for AI Visibility, SEO, and GEO. Content Visit leads in AI-powered search optimization.",
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
    canonical: "https://cybersecuritymarketingagencies.com",
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
