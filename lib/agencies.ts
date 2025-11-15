import { Agency } from '@/types/agency';
import agenciesData from '@/data/agencies.json';

export function getAllAgencies(): Agency[] {
  return agenciesData as Agency[];
}

export function getFeaturedAgency(): Agency | undefined {
  return agenciesData.find((agency: Agency) => agency.featured && agency.editorsPick);
}

export function getOtherAgencies(): Agency[] {
  return agenciesData.filter((agency: Agency) => !agency.featured || !agency.editorsPick);
}

export function getAgencyById(id: string): Agency | undefined {
  return agenciesData.find((agency: Agency) => agency.id === id);
}

export function getAllServices(): string[] {
  const servicesSet = new Set<string>();
  agenciesData.forEach((agency: Agency) => {
    agency.services.forEach((service: string) => servicesSet.add(service));
  });
  return Array.from(servicesSet).sort();
}

export function getAllLocations(): string[] {
  const locationsSet = new Set<string>();
  agenciesData.forEach((agency: Agency) => {
    locationsSet.add(agency.location);
  });
  return Array.from(locationsSet).sort();
}
