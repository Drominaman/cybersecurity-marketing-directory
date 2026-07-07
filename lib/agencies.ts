import { Agency } from '@/types/agency';
import agenciesDataRaw from '@/data/agencies.json';

const agenciesData = agenciesDataRaw as Agency[];

export function getAllAgencies(): Agency[] {
  return agenciesData;
}

// Featured Partners (disclosed paid placements) first, then everyone else -
// each group alphabetical so no agency benefits from raw data-file order.
// With no featured agencies this is a plain alphabetical listing. A featured
// placement is a labelled paid boost, not a ranking or a recommendation.
export function getAllAgenciesFeaturedFirst(): Agency[] {
  const byName = (a: Agency, b: Agency) => a.name.localeCompare(b.name);
  return [
    ...agenciesData.filter(a => a.featured).sort(byName),
    ...agenciesData.filter(a => !a.featured).sort(byName),
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
