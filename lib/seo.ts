import { Agency } from "@/types/agency";
import { siteConfig } from "@/config/site.config";

// Canonical apex domain (no www)
const baseUrl = "https://cybersecuritymarketingagencies.com";

export function websiteSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      description: siteConfig.description,
      knowsAbout: [
        "Cybersecurity Marketing",
        "AI Visibility",
        "SEO for Cybersecurity",
        "Generative Engine Optimization",
        "Content Marketing for Security Companies",
        "B2B Cybersecurity Marketing",
        "Cybersecurity PR",
        "Lead Generation for Security Vendors",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: baseUrl,
      description: siteConfig.description,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

export function collectionPageSchema(
  name: string,
  description: string,
  path: string,
  items: Agency[]
) {
  const url = path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 20).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.name,
        url: `${baseUrl}/${siteConfig.listing.routePath}/${a.id}`,
      })),
    },
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function articleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  image,
}: ArticleSchemaInput) {
  const url = `${baseUrl}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Person",
      name: author || siteConfig.seo.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    ...(image ? { image: image.startsWith("http") ? image : `${baseUrl}${image}` } : {}),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ label: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url.startsWith("/") ? item.url : `/${item.url}`}`,
    })),
  };
}
