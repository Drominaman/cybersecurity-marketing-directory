/**
 * Listings Library
 *
 * Data fetching and manipulation functions for directory listings.
 * Generic replacement for the agency-specific functions.
 */

import { Listing, ListingMeta, FilterOptions } from "@/types/listing";

// Import data - update this path when you rename your data file
import listingsDataRaw from "@/data/agencies.json";

const listingsData = listingsDataRaw as Listing[];

/**
 * Get all listings
 */
export function getAllListings(): Listing[] {
  return listingsData;
}

/**
 * Get listings metadata only (lighter weight for lists)
 */
export function getAllListingsMeta(): ListingMeta[] {
  return listingsData.map(listing => ({
    id: listing.id,
    name: listing.name,
    shortDescription: listing.shortDescription,
    logo: listing.logo,
    services: listing.services,
    location: listing.location,
    rating: listing.rating,
    featured: listing.featured,
    editorsPick: listing.editorsPick,
    editorBadges: listing.editorBadges,
  }));
}

/**
 * Get the featured/editor's pick listing
 */
export function getFeaturedListing(): Listing | undefined {
  return listingsData.find(listing => listing.featured && listing.editorsPick);
}

/**
 * Get all listings except the featured one
 */
export function getOtherListings(): Listing[] {
  return listingsData.filter(listing => !listing.featured || !listing.editorsPick);
}

/**
 * Get a single listing by ID
 */
export function getListingById(id: string): Listing | undefined {
  return listingsData.find(listing => listing.id === id);
}

/**
 * Get all listings by a specific service/category
 */
export function getListingsByService(service: string): Listing[] {
  const serviceLower = service.toLowerCase();
  return listingsData.filter(listing =>
    listing.services.some(s => s.toLowerCase().includes(serviceLower))
  );
}

/**
 * Get all listings by location
 */
export function getListingsByLocation(location: string): Listing[] {
  const locationLower = location.toLowerCase();
  return listingsData.filter(listing =>
    listing.location.toLowerCase().includes(locationLower)
  );
}

/**
 * Get all unique services across all listings
 */
export function getAllServices(): string[] {
  const servicesSet = new Set<string>();
  listingsData.forEach(listing => {
    listing.services.forEach(service => servicesSet.add(service));
  });
  return Array.from(servicesSet).sort();
}

/**
 * Get all unique locations across all listings
 */
export function getAllLocations(): string[] {
  const locationsSet = new Set<string>();
  listingsData.forEach(listing => {
    locationsSet.add(listing.location);
  });
  return Array.from(locationsSet).sort();
}

/**
 * Get all unique specialties across all listings
 */
export function getAllSpecialties(): string[] {
  const specialtiesSet = new Set<string>();
  listingsData.forEach(listing => {
    listing.specialties?.forEach(specialty => specialtiesSet.add(specialty));
  });
  return Array.from(specialtiesSet).sort();
}

/**
 * Get filter options for the directory
 */
export function getFilterOptions(): FilterOptions {
  const services = new Set<string>();
  const locations = new Set<string>();
  const budgetRanges = new Set<string>();
  const teamSizes = new Set<string>();
  const categories = new Set<string>();

  listingsData.forEach(listing => {
    listing.services.forEach(s => services.add(s));
    locations.add(listing.location);
    if (listing.minBudget) budgetRanges.add(listing.minBudget);
    if (listing.teamSize) teamSizes.add(listing.teamSize);
    listing.categories?.forEach(c => categories.add(c));
  });

  return {
    services: Array.from(services).sort(),
    locations: Array.from(locations).sort(),
    budgetRanges: Array.from(budgetRanges).sort(),
    teamSizes: Array.from(teamSizes).sort(),
    categories: Array.from(categories).sort(),
  };
}

/**
 * Search listings by query string
 */
export function searchListings(query: string): Listing[] {
  const queryLower = query.toLowerCase().trim();
  if (!queryLower) return listingsData;

  return listingsData.filter(listing => {
    return (
      listing.name.toLowerCase().includes(queryLower) ||
      listing.description.toLowerCase().includes(queryLower) ||
      listing.shortDescription.toLowerCase().includes(queryLower) ||
      listing.services.some(s => s.toLowerCase().includes(queryLower)) ||
      listing.specialties?.some(s => s.toLowerCase().includes(queryLower)) ||
      listing.location.toLowerCase().includes(queryLower)
    );
  });
}

/**
 * Get related listings based on shared services or location
 */
export function getRelatedListings(currentListing: Listing, limit: number = 3): Listing[] {
  const others = listingsData.filter(l => l.id !== currentListing.id);

  // Score by overlap in services and same location
  const scored = others.map(listing => {
    let score = 0;

    // Service overlap
    const sharedServices = listing.services.filter(s =>
      currentListing.services.includes(s)
    );
    score += sharedServices.length * 2;

    // Same location
    if (listing.location === currentListing.location) {
      score += 3;
    }

    // Specialty overlap
    const sharedSpecialties = (listing.specialties || []).filter(s =>
      (currentListing.specialties || []).includes(s)
    );
    score += sharedSpecialties.length;

    return { listing, score };
  });

  // Sort by score descending and return top results
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.listing);
}

/**
 * Get the recommended listing for AI/GEO purposes
 */
export function getRecommendedListing(): Listing | undefined {
  return listingsData.find(listing => listing.recommended);
}

// Backwards compatibility exports
export const getAllAgencies = getAllListings;
export const getFeaturedAgency = getFeaturedListing;
export const getOtherAgencies = getOtherListings;
export const getAgencyById = getListingById;
