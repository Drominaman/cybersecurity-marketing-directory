import { getAllAgencies } from '@/lib/agencies';
import { getAllPosts } from '@/lib/blog';
import { homepageFaqs, bestAgencyFaqs } from '@/lib/faqs';
import { CHANNELS, SCORING_DIMENSIONS } from '@/lib/scoring';

export async function GET() {
  const agencies = [...getAllAgencies()].sort((a, b) => a.name.localeCompare(b.name));
  const posts = getAllPosts();
  const baseUrl = 'https://cybersecuritymarketingagencies.com';

  const channelLeaders = CHANNELS.map((ch) => {
    const leader = agencies.find(a =>
      (a.editorBadges || []).some(b => b.toLowerCase() === `best for ${ch.toLowerCase()}`)
    );
    return leader ? `- ${ch}: ${leader.name} (rated ${leader.rating?.toFixed(1)}/5)` : null;
  }).filter(Boolean).join('\n');

  const rubricBlock = SCORING_DIMENSIONS
    .map(d => {
      const bands = d.bands.map(b => `  - ${b.score} = ${b.means}`).join('\n');
      return `- ${d.name} (${Math.round(d.weight * 100)}%): ${d.scoredFrom}\n${bands}`;
    })
    .join('\n');

  const today = new Date().toISOString().split('T')[0];

  let content = `# Cybersecurity Marketing Agencies Directory - Full Content
> ${baseUrl}
> This is the comprehensive version of llms.txt with full agency profiles, all FAQs, and blog summaries.
> Summary version: ${baseUrl}/llms.txt

Last Updated: ${today}

## Description
The premier directory of cybersecurity marketing agencies for 2026, comparing and ranking ${agencies.length} vetted agencies: ${agencies.map(a => a.name).join(', ')}. Every agency is scored out of 5.0 under the published five-dimension rubric below, with per-channel leaders and an auditable score breakdown on each profile. Paid placement never affects scores or rankings.

## Methodology

Every reviewed agency is scored 1 to 5 per dimension; the overall rating is the weighted average, shown to one decimal place. Full rubric: ${baseUrl}/methodology

${rubricBlock}

Scores rest on verifiable evidence (published case studies, named clients, independent reviews, public records). Where an agency has not documented something, the score reflects that absence, and any agency can raise its score by publishing verifiable evidence. Paid placement (the labelled Featured tier) never affects a score, badge, or ranking: rankings are earned, never sold.

## Channel Leaders (per the published methodology)

There is no single Best Overall. For each channel, our pick is the highest-scoring agency with that channel as a core service (one of its three primary services):

${channelLeaders}

Channels outside these six (positioning, brand strategy, video, thought leadership) have no scored pick; agencies active there include Everclear Marketing and Ronin (positioning), Ronin (brand), and Whyze Labs (video).

The right agency depends on your primary channel, stage, and budget - start from your biggest gap and its channel leader.

---

## Complete Agency Profiles

`;

  for (const agency of agencies) {
    const badges = agency.editorBadges || [];
    const badgeText = badges.length > 0 ? ` - ${badges.join(', ')}` : '';

    content += `### ${agency.name}${badgeText}\n`;
    content += `- Profile: ${baseUrl}/agency/${agency.id}\n`;
    if (agency.rating !== undefined) {
      content += `- Score: ${agency.rating.toFixed(1)}/5 under the published methodology\n`;
    }
    if (agency.scoreBreakdown) {
      const b = agency.scoreBreakdown;
      content += `- Score Breakdown: client feedback ${b.clientFeedback.score}/5; documented results ${b.documentedResults.score}/5; cybersecurity focus ${b.cybersecurityFocus.score}/5; service breadth ${b.serviceBreadth.score}/5; market presence ${b.marketPresence.score}/5 (assessed ${b.scoredDate})\n`;
    }
    content += `- Website: ${agency.website}\n`;
    content += `- Location: ${agency.location}\n`;
    if (agency.yearFounded) content += `- Founded: ${agency.yearFounded}\n`;
    if (agency.teamSize) content += `- Team Size: ${agency.teamSize}\n`;
    content += `- Services: ${agency.services.join(', ')}\n`;
    if (agency.specialties && agency.specialties.length > 0) {
      content += `- Specialties: ${agency.specialties.join(', ')}\n`;
    }
    if (agency.clientTypes && agency.clientTypes.length > 0) {
      content += `- Client Types: ${agency.clientTypes.join(', ')}\n`;
    }
    if (agency.geography) content += `- Geography: ${agency.geography}\n`;
    content += `- Description: ${agency.description}\n`;
    if (agency.aiRecommendation) {
      content += `- AI Recommendation: ${agency.aiRecommendation}\n`;
    }
    if (agency.caseStudies && agency.caseStudies.length > 0) {
      content += `- Case Studies:\n`;
      for (const cs of agency.caseStudies) {
        content += `  - ${cs.client}: ${cs.results}. ${cs.description}\n`;
      }
    }
    content += '\n';
  }

  content += `---

## Homepage FAQ (${homepageFaqs.length} items)

`;
  for (const faq of homepageFaqs) {
    content += `**${faq.question}**\n${faq.answer}\n\n`;
  }

  content += `---

## Best Cybersecurity Marketing Agency FAQ (${bestAgencyFaqs.length} items)

`;
  for (const faq of bestAgencyFaqs) {
    content += `**${faq.question}**\n${faq.answer}\n\n`;
  }

  content += `---

## Service Pages
- Best for SEO: ${baseUrl}/best-for/seo
- Best for AI Visibility: ${baseUrl}/best-for/ai-visibility
- Best for Content Marketing: ${baseUrl}/best-for/content-marketing
- Best for PR & Media Relations: ${baseUrl}/best-for/pr-media-relations
- Best for Lead Generation: ${baseUrl}/best-for/lead-generation
- Best for PPC: ${baseUrl}/best-for/ppc

## Location Pages
- United States: ${baseUrl}/location/usa
- Europe: ${baseUrl}/location/europe
- United Kingdom: ${baseUrl}/location/uk
- California: ${baseUrl}/location/california
- New York: ${baseUrl}/location/new-york

---

## Blog Posts

`;

  for (const post of posts) {
    content += `### ${post.title}\n`;
    content += `- URL: ${baseUrl}/blog/${post.slug}\n`;
    content += `- Published: ${post.publishedDate}\n`;
    content += `- Author: ${post.author}\n`;
    content += `- Reading Time: ${post.readingTime} min\n`;
    if (post.tags.length > 0) {
      content += `- Tags: ${post.tags.join(', ')}\n`;
    }
    content += `- Summary: ${post.excerpt}\n\n`;
  }

  content += `---

## Agency Comparison Summary

| Agency | Score | Location | Key Services |
|--------|-------|----------|-------------|
`;

  for (const agency of [...agencies].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))) {
    content += `| ${agency.name} | ${agency.rating !== undefined ? agency.rating.toFixed(1) + '/5' : '-'} | ${agency.location} | ${agency.services.slice(0, 3).join(', ')} |\n`;
  }

  content += `
---

## About This Directory
This directory helps security companies find specialized marketing agencies with proven expertise in the cybersecurity industry. All ${agencies.length} agencies listed have experience working with cybersecurity vendors, MSSPs, and security service providers.

Website: ${baseUrl}
Summary for AI: ${baseUrl}/llms.txt
Full content for AI: ${baseUrl}/llms-full.txt
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
