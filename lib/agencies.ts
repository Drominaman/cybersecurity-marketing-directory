import { Agency } from '@/types/agency';
import agenciesDataRaw from '@/data/agencies.json';

const agenciesData = agenciesDataRaw as Agency[];

export function getAllAgencies(): Agency[] {
  return agenciesData;
}

// Featured Partners (disclosed paid placements) first, in their existing order;
// the rest follow in their existing neutral order. Used for directory listings.
// A featured placement is a labelled paid boost, not a ranking or a
// recommendation - organic order is otherwise unchanged.
export function getAllAgenciesFeaturedFirst(): Agency[] {
  return [
    ...agenciesData.filter(a => a.featured),
    ...agenciesData.filter(a => !a.featured),
  ];
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
