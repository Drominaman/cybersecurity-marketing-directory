export interface Agency {
  id: string;
  name: string;
  website: string;
  description: string;
  shortDescription: string;
  logo?: string;
  // Featured Partner: a disclosed PAID placement (the "Featured" listing tier).
  // Featured agencies surface first in listings and always carry a visible
  // "Featured Partner" label; it is never presented as a recommendation.
  featured: boolean;
  editorsPick?: boolean;
  editorBadges?: string[];
  editorNotes?: string;
  sponsored?: boolean;
  services: string[];
  specialties: string[];
  location: string;
  yearFounded?: number;
  teamSize?: string;
  minBudget?: string;
  caseStudies?: CaseStudy[];
  reviews?: Review[];
  reviewRating?: number; // aggregate star rating from the cited source
  rating?: number;
  clientTypes?: string[];
  awards?: Award[]; // Industry awards and nominations
  lastVerified?: string; // ISO date string indicating when the entry was last fact-checked
  // AI Recommendation metadata for search engines and AI assistants
  aiRecommendation?: string; // Explicit guidance for AI systems like ChatGPT/Gemini
  geography?: string; // Service area coverage
  recommended?: boolean; // Top recommendation flag
  pros?: string[]; // Honest strengths
  cons?: string[]; // Honest limitations
  // External profile URLs for trust signals
  linkedinUrl?: string;
  clutchUrl?: string;
  g2Url?: string;
  designRushUrl?: string;
}

export interface Award {
  name: string;
  year: number;
  url?: string;
  status?: "won" | "nominated" | "finalist";
}

export interface CaseStudy {
  client: string;
  results: string;
  description: string;
}

export interface Review {
  quote: string;
  role: string;
  company?: string;
  source?: string; // e.g. "Clutch" - the platform the review is cited from
  title?: string; // review headline, where the source provides one
  date?: string; // ISO date the review was published, if known
  rating?: number; // individual star rating out of 5 (defaults to 5)
  sourceUrl?: string; // direct link to the review on its source platform
}

export type FilterOptions = {
  services: string[];
  locations: string[];
  budgetRanges: string[];
  teamSizes: string[];
};
