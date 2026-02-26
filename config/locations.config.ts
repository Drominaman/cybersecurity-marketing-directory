/**
 * Locations Configuration
 *
 * Define the geographic locations that listings can be filtered by.
 * These power the location filter pages.
 */

export interface LocationConfig {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  region?: string; // Optional grouping (e.g., "North America", "Europe")
}

// Default locations - customize for your directory
export const locationsConfig: LocationConfig[] = [
  {
    slug: "usa",
    name: "USA",
    description: "United States based providers",
    keywords: ["USA", "United States", "American"],
    region: "North America",
  },
  {
    slug: "uk",
    name: "UK",
    description: "United Kingdom based providers",
    keywords: ["UK", "United Kingdom", "British", "England"],
    region: "Europe",
  },
  {
    slug: "europe",
    name: "Europe",
    description: "European providers",
    keywords: ["Europe", "European", "EU"],
    region: "Europe",
  },
  {
    slug: "california",
    name: "California",
    description: "California based providers",
    keywords: ["California", "CA", "West Coast", "Silicon Valley"],
    region: "North America",
  },
  {
    slug: "new-york",
    name: "New York",
    description: "New York based providers",
    keywords: ["New York", "NY", "NYC", "East Coast"],
    region: "North America",
  },
  {
    slug: "global",
    name: "Global",
    description: "Providers serving clients worldwide",
    keywords: ["global", "worldwide", "international", "remote"],
    region: undefined,
  },
];

// Helper to get location by slug
export function getLocationBySlug(slug: string): LocationConfig | undefined {
  return locationsConfig.find(loc => loc.slug === slug);
}

// Helper to get all location slugs
export function getAllLocationSlugs(): string[] {
  return locationsConfig.map(loc => loc.slug);
}

// Map for quick lookups (slug -> display name)
export const locationDisplayMap: Record<string, string> = Object.fromEntries(
  locationsConfig.map(loc => [loc.slug, loc.name])
);

// Get locations grouped by region
export function getLocationsByRegion(): Record<string, LocationConfig[]> {
  const grouped: Record<string, LocationConfig[]> = {};

  locationsConfig.forEach(loc => {
    const region = loc.region || "Other";
    if (!grouped[region]) {
      grouped[region] = [];
    }
    grouped[region].push(loc);
  });

  return grouped;
}
