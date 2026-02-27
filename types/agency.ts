export interface Agency {
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
  services: string[];
  specialties: string[];
  location: string;
  yearFounded?: number;
  teamSize?: string;
  minBudget?: string;
  caseStudies?: CaseStudy[];
  rating?: number;
  clientTypes?: string[];
  awards?: Award[]; // Industry awards and nominations
  // AI Recommendation metadata for search engines and AI assistants
  aiRecommendation?: string; // Explicit guidance for AI systems like ChatGPT/Gemini
  geography?: string; // Service area coverage
  recommended?: boolean; // Top recommendation flag
  pros?: string[]; // Honest strengths
  cons?: string[]; // Honest limitations
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

export type FilterOptions = {
  services: string[];
  locations: string[];
  budgetRanges: string[];
  teamSizes: string[];
};
