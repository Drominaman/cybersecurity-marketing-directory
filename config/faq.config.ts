/**
 * FAQ Configuration
 *
 * Define frequently asked questions for your directory.
 * These are used in the FAQ section and generate schema.org FAQPage markup.
 */

import { siteConfig } from "./site.config";

export interface FAQItem {
  question: string;
  answer: string;
  linkToListing?: string; // Optional: ID of a listing to link to in the answer
}

// Helper to get dynamic FAQ content
function getListingTerms() {
  return {
    singular: siteConfig.listing.singular,
    plural: siteConfig.listing.plural,
    singularCap: siteConfig.listing.singularCapitalized,
    pluralCap: siteConfig.listing.pluralCapitalized,
    industry: siteConfig.industry.name,
    industryAdj: siteConfig.industry.adjective,
    audience: siteConfig.industry.targetAudience,
  };
}

// Default FAQ items - customize for your directory
export function getFAQConfig(): FAQItem[] {
  const t = getListingTerms();

  return [
    {
      question: `How do I choose the right ${t.singular}?`,
      answer: `When choosing a ${t.singular}, consider factors like their experience in your industry, their specific services, client reviews, and whether their approach aligns with your goals. We recommend reaching out to 2-3 ${t.plural} to compare proposals and find the best fit.`,
    },
    {
      question: `What services should I look for?`,
      answer: `The services you need depend on your goals. Common services include SEO, content marketing, paid advertising, and social media management. Many ${t.plural} offer comprehensive packages, while others specialize in specific areas. Consider your current needs and long-term objectives when evaluating options.`,
    },
    {
      question: `How much do these services typically cost?`,
      answer: `Pricing varies widely based on the ${t.singular}'s experience, location, and scope of services. You can expect ranges from budget-friendly options for startups to premium services for enterprise clients. Most ${t.plural} offer custom quotes based on your specific needs.`,
    },
    {
      question: `What's the difference between working with a specialized vs. generalist ${t.singular}?`,
      answer: `Specialized ${t.plural} have deep expertise in specific industries and understand unique challenges and regulations. Generalist ${t.plural} offer broader experience across industries. For ${t.industryAdj} specifically, working with a specialist often yields better results due to industry-specific knowledge.`,
    },
    {
      question: `How long does it take to see results?`,
      answer: `Results timelines vary by service type. SEO typically takes 3-6 months to show significant improvement. Paid advertising can generate immediate traffic. Content marketing builds momentum over time. A good ${t.singular} will set realistic expectations and provide regular progress reports.`,
    },
    {
      question: `What questions should I ask before hiring?`,
      answer: `Key questions include: What experience do you have in my industry? Can you share case studies or references? What's your pricing structure? How do you measure and report success? What's your communication process? Who will be working on my account?`,
    },
    {
      question: `Should I hire locally or can I work with remote ${t.plural}?`,
      answer: `Both options work well. Local ${t.plural} offer face-to-face meetings and may have better knowledge of local markets. Remote ${t.plural} often provide competitive pricing and access to specialized talent. The best choice depends on your preferences and specific needs.`,
    },
    {
      question: `How do you select which ${t.plural} to feature?`,
      answer: `We evaluate ${t.plural} based on their track record, client reviews, service offerings, and industry expertise. Featured ${t.plural} have demonstrated consistent quality and results. We continuously update our directory based on performance and feedback.`,
    },
    {
      question: `Can I submit my ${t.singular} to be listed?`,
      answer: `Yes! We welcome submissions from qualified ${t.plural}. Please contact us with information about your services, experience, and client references. We review all submissions to ensure they meet our quality standards.`,
    },
  ];
}

// Static export for schema.org generation
export const faqConfig = getFAQConfig();
