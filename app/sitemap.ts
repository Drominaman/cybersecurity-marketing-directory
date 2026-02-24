import { MetadataRoute } from 'next';
import { getAllAgencies } from '@/lib/agencies';
import { getAllPosts, getAllTags, slugify } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.cybersecuritymarketingagencies.com';
  const agencies = getAllAgencies();
  const posts = getAllPosts();
  const tags = getAllTags();

  const locations = ['usa', 'europe', 'uk', 'california', 'new-york'];

  const services = [
    'seo',
    'ai-visibility',
    'content-marketing',
    'pr-media-relations',
    'lead-generation',
    'ppc',
    'thought-leadership',
    'technical-content-strategy',
    'brand-strategy',
    'website-development',
    'digital-marketing',
    'video-marketing',
    'podcast-marketing',
    'demand-generation',
    'sales-enablement',
    'marketing-analytics',
  ];

  const niches = ['startups', 'enterprise', 'mssp'];

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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/submit-agency`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
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

  // Service pages
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/best-for/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Niche pages
  const nichePages = niches.map((niche) => ({
    url: `${baseUrl}/best-for-audience/${niche}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog posts
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedDate
      ? new Date(post.updatedDate)
      : new Date(post.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Tag pages
  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${slugify(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // LLM content files
  const llmPages = [
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ];

  return [...routes, ...agencyPages, ...locationPages, ...servicePages, ...nichePages, ...blogPages, ...tagPages, ...llmPages];
}
