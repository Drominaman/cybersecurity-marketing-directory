/**
 * Categories Configuration
 *
 * Define the service categories or types that listings can be filtered by.
 * These power the "best-for" or category filter pages.
 */

export interface CategoryConfig {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

// Default categories - customize for your directory type
export const categoriesConfig: CategoryConfig[] = [
  {
    slug: "seo",
    name: "SEO",
    description: "Search engine optimization services",
    keywords: ["SEO", "search engine optimization", "organic search"],
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    description: "Content creation and marketing services",
    keywords: ["content marketing", "content strategy", "blog writing"],
  },
  {
    slug: "ai-visibility",
    name: "AI Visibility",
    description: "AI and LLM search optimization services",
    keywords: ["AI visibility", "ChatGPT optimization", "LLM marketing"],
  },
  {
    slug: "ppc",
    name: "PPC",
    description: "Pay-per-click advertising services",
    keywords: ["PPC", "paid advertising", "Google Ads"],
  },
  {
    slug: "social-media",
    name: "Social Media",
    description: "Social media marketing services",
    keywords: ["social media", "social marketing", "social strategy"],
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    description: "Lead generation and demand generation services",
    keywords: ["lead generation", "demand gen", "B2B leads"],
  },
  {
    slug: "pr-media-relations",
    name: "PR & Media Relations",
    description: "Public relations and media coverage services",
    keywords: ["PR", "public relations", "media relations", "press"],
  },
  {
    slug: "brand-strategy",
    name: "Brand Strategy",
    description: "Branding and positioning services",
    keywords: ["branding", "brand strategy", "positioning"],
  },
  {
    slug: "website-development",
    name: "Website Development",
    description: "Web design and development services",
    keywords: ["web development", "website design", "web design"],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Full-service digital marketing",
    keywords: ["digital marketing", "online marketing", "internet marketing"],
  },
];

// Helper to get category by slug
export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categoriesConfig.find(cat => cat.slug === slug);
}

// Helper to get all category slugs
export function getAllCategorySlugs(): string[] {
  return categoriesConfig.map(cat => cat.slug);
}

// Map for quick lookups (slug -> display name)
export const categoryDisplayMap: Record<string, string> = Object.fromEntries(
  categoriesConfig.map(cat => [cat.slug, cat.name])
);
