import { Agency } from '@/types/agency';
import agenciesDataRaw from '@/data/agencies.json';

const agenciesData = agenciesDataRaw as Agency[];

export function getAllAgencies(): Agency[] {
  return agenciesData;
}

export function getFeaturedAgency(): Agency | undefined {
  return agenciesData.find(agency => agency.featured && agency.editorsPick);
}

export function getOtherAgencies(): Agency[] {
  return agenciesData.filter(agency => !agency.featured || !agency.editorsPick);
}

export function getAgencyById(id: string): Agency | undefined {
  return agenciesData.find(agency => agency.id === id);
}

export function getAllServices(): string[] {
  const servicesSet = new Set<string>();
  agenciesData.forEach(agency => {
    agency.services.forEach(service => servicesSet.add(service));
  });
  return Array.from(servicesSet).sort();
}

export function getAllLocations(): string[] {
  const locationsSet = new Set<string>();
  agenciesData.forEach(agency => {
    locationsSet.add(agency.location);
  });
  return Array.from(locationsSet).sort();
}
