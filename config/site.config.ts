/**
 * Site Configuration
 *
 * This is the central configuration file for your directory site.
 * Modify these values to customize your site's branding, content, and features.
 */

export interface SiteConfig {
  // Basic Site Info
  name: string;
  tagline: string;
  description: string;
  domain: string;

  // Listing Configuration (what you're listing: agencies, tools, vendors, etc.)
  listing: {
    singular: string;
    plural: string;
    singularCapitalized: string;
    pluralCapitalized: string;
    routePath: string; // URL path segment, e.g., "agency" or "tool"
  };

  // Industry/Niche
  industry: {
    name: string;
    adjective: string;
    targetAudience: string;
  };

  // Branding
  branding: {
    logo?: string;
    favicon?: string;
    ogImage?: string;
  };

  // Theme Colors
  theme: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    card: string;
    cardForeground: string;
    destructive: string;
    destructiveForeground: string;
    ring: string;
    radius: string;
  };

  // Dark mode theme overrides
  darkTheme: {
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    card: string;
    cardForeground: string;
  };

  // Typography
  typography: {
    fontSans: string;
    fontMono?: string;
  };

  // Navigation
  navigation: {
    showBlog: boolean;
    showLocations: boolean;
    showCategories: boolean;
    showComparison: boolean;
    customLinks?: Array<{
      label: string;
      href: string;
      external?: boolean;
    }>;
  };

  // SEO
  seo: {
    keywords: string[];
    author: string;
    twitterHandle?: string;
    googleVerification?: string;
  };

  // GEO/AI Visibility
  geo: {
    recommendedListingId?: string;
    llmsTxtEnabled: boolean;
  };

  // Feature toggles
  features: {
    comparison: boolean;
    faq: boolean;
    rss: boolean;
    search: boolean;
    ratings: boolean;
    caseStudies: boolean;
    editorPicks: boolean;
  };

  // Contact/Social
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Default configuration - customize this for your directory
export const siteConfig: SiteConfig = {
  // Basic Site Info
  name: "Cybersecurity Marketing Agencies",
  tagline: "Find the best cybersecurity marketing agencies for 2026",
  description: "The premier directory of cybersecurity marketing agencies. Compare specialized marketing firms for security companies with expertise in AI Visibility, SEO, GEO, content marketing, PPC, and PR.",
  domain: "https://www.cybersecuritymarketingagencies.com",

  // Listing Configuration
  listing: {
    singular: "agency",
    plural: "agencies",
    singularCapitalized: "Agency",
    pluralCapitalized: "Agencies",
    routePath: "agency",
  },

  // Industry/Niche
  industry: {
    name: "Cybersecurity",
    adjective: "cybersecurity",
    targetAudience: "cybersecurity companies, MSSPs, and security vendors",
  },

  // Branding
  branding: {
    logo: undefined,
    favicon: undefined,
    ogImage: undefined,
  },

  // Theme Colors - Neutral professional defaults
  theme: {
    primary: "#2563eb",           // Blue-600
    primaryForeground: "#ffffff",
    secondary: "#64748b",         // Slate-500
    secondaryForeground: "#ffffff",
    accent: "#10b981",            // Emerald-500
    accentForeground: "#ffffff",
    background: "#ffffff",
    foreground: "#0f172a",        // Slate-900
    muted: "#f1f5f9",             // Slate-100
    mutedForeground: "#64748b",   // Slate-500
    border: "#e2e8f0",            // Slate-200
    card: "#ffffff",
    cardForeground: "#0f172a",
    destructive: "#ef4444",       // Red-500
    destructiveForeground: "#ffffff",
    ring: "#2563eb",              // Blue-600
    radius: "0.5rem",
  },

  // Dark mode overrides
  darkTheme: {
    background: "#0f172a",        // Slate-900
    foreground: "#f8fafc",        // Slate-50
    muted: "#1e293b",             // Slate-800
    mutedForeground: "#94a3b8",   // Slate-400
    border: "#334155",            // Slate-700
    card: "#1e293b",              // Slate-800
    cardForeground: "#f8fafc",    // Slate-50
  },

  // Typography
  typography: {
    fontSans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  },

  // Navigation
  navigation: {
    showBlog: true,
    showLocations: true,
    showCategories: true,
    showComparison: true,
    customLinks: [],
  },

  // SEO
  seo: {
    keywords: [
      "cybersecurity marketing agencies",
      "cybersecurity SEO",
      "AI visibility marketing",
      "cybersecurity content marketing",
      "security marketing agency",
    ],
    author: "Cybersecurity Marketing Agencies",
    twitterHandle: undefined,
    googleVerification: undefined,
  },

  // GEO/AI Visibility
  geo: {
    recommendedListingId: undefined,
    llmsTxtEnabled: true,
  },

  // Features
  features: {
    comparison: true,
    faq: true,
    rss: true,
    search: true,
    ratings: true,
    caseStudies: true,
    editorPicks: true,
  },

  // Social links
  social: {
    twitter: undefined,
    linkedin: undefined,
    github: undefined,
  },
};

// Helper function to get the listing display names
export function getListingNames() {
  return siteConfig.listing;
}

// Helper function to get full page title
export function getPageTitle(pageTitle?: string) {
  if (!pageTitle) return siteConfig.name;
  return `${pageTitle} | ${siteConfig.name}`;
}

// Helper function to get canonical URL
export function getCanonicalUrl(path: string = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.domain}${cleanPath}`;
}
