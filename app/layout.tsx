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
  title: "Cybersecurity Marketing Agencies - Top Rated Marketing Firms for Security Companies",
  description: "Find the best cybersecurity marketing agencies. Compare top-rated marketing firms specializing in security companies, with expert services in SEO, content marketing, PPC, and PR for the cybersecurity industry.",
  keywords: [
    "cybersecurity marketing agencies",
    "cybersecurity marketing",
    "security marketing agency",
    "cyber security marketing firms",
    "information security marketing",
    "B2B cybersecurity marketing",
  ],
  authors: [{ name: "Cybersecurity Marketing Agencies" }],
  openGraph: {
    title: "Cybersecurity Marketing Agencies Directory",
    description: "Find the best marketing agencies specialized in cybersecurity and information security",
    type: "website",
    locale: "en_US",
    url: "https://cybersecuritymarketingagencies.com",
    siteName: "Cybersecurity Marketing Agencies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Marketing Agencies - Top Rated Marketing Firms",
    description: "Find the best cybersecurity marketing agencies. Compare top-rated marketing firms specializing in security companies.",
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
