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
