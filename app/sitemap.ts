import { MetadataRoute } from 'next';
import { getAllAgencies } from '@/lib/agencies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cybersecuritymarketingagencies.com';
  const agencies = getAllAgencies();

  const locations = ['usa', 'europe', 'uk', 'california', 'new-york'];

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/best-cybersecurity-marketing-agency`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Agency pages
  const agencyPages = agencies.map((agency) => ({
    url: `${baseUrl}/agency/${agency.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Location pages
  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/location/${location}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...agencyPages, ...locationPages];
}
