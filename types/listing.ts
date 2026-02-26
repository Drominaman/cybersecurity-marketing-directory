/**
 * Listing Types
 *
 * Generic data types for directory listings.
 * These replace the agency-specific types for template flexibility.
 */

export interface Listing {
  id: string;
  name: string;
  website: string;
  description: string;
  shortDescription: string;
  logo?: string;
  featured: boolean;
  editorsPick?: boolean;
  editorBadge?: string;
  editorBadges?: string[];

  // Categorization
  services: string[];
  specialties: string[];
  categories?: string[];
  tags?: string[];

  // Location
  location: string;
  geography?: "Global" | "Regional";

  // Details
  yearFounded?: number;
  teamSize?: string;
  minBudget?: string;
  pricing?: string;
  rating?: number;

  // Portfolio
  caseStudies?: CaseStudy[];
  clientTypes?: string[];

  // AI/GEO Optimization
  aiRecommendation?: string;
  recommended?: boolean;

  // Allow additional custom fields
  [key: string]: unknown;
}

export interface CaseStudy {
  client: string;
  results: string;
  description: string;
}

export interface ListingMeta {
  id: string;
  name: string;
  shortDescription: string;
  logo?: string;
  services: string[];
  location: string;
  rating?: number;
  featured: boolean;
  editorsPick?: boolean;
  editorBadges?: string[];
}

export type FilterOptions = {
  services: string[];
  locations: string[];
  budgetRanges: string[];
  teamSizes: string[];
  categories: string[];
};

// Re-export Agency as an alias for backwards compatibility during migration
export type Agency = Listing;
