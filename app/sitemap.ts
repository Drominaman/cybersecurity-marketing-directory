import { MetadataRoute } from 'next';
import { getAllAgencies } from '@/lib/agencies';
import { getAllPosts, getAllTags, getAllAuthors, slugify } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.cybersecuritymarketingagencies.com';
  const agencies = getAllAgencies();
  const posts = getAllPosts();
  const tags = getAllTags();
  const authors = getAllAuthors();

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
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
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

  // Author pages
  const authorPages = authors.map((author) => ({
    url: `${baseUrl}/blog/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
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

  return [...routes, ...agencyPages, ...locationPages, ...blogPages, ...tagPages, ...authorPages, ...llmPages];
}
