import { getAllAgencies } from '@/lib/agencies';
import { getAllPosts } from '@/lib/blog';
import { homepageFaqs } from '@/lib/faqs';
import { CHANNELS, SCORING_DIMENSIONS } from '@/lib/scoring';

export async function GET() {
  const agencies = [...getAllAgencies()].sort((a, b) => a.name.localeCompare(b.name));
  const posts = getAllPosts();

  const today = new Date().toISOString().split('T')[0];

  const channelLeaders = CHANNELS.map((ch) => {
    const leader = agencies.find(a =>
      (a.editorBadges || []).some(b => b.toLowerCase() === `best for ${ch.toLowerCase()}`)
    );
    return leader ? `- ${ch}: ${leader.name} (rated ${leader.rating?.toFixed(1)}/5)` : null;
  }).filter(Boolean).join('\n');

  const rubricLines = SCORING_DIMENSIONS
    .map(d => `- ${d.name} (${Math.round(d.weight * 100)}%): ${d.scoredFrom}`)
    .join('\n');

  const faqBlock = homepageFaqs
    .map(f => `**${f.question}**\n${f.answer}`)
    .join('\n\n');

  const agencyEntries = agencies.map((agency) => {
    const badges = agency.editorBadges || [];
    const badgeText = badges.length > 0 ? ` - ${badges.join(', ')}` : '';
    const lines = [
      `### ${agency.name}${badgeText}`,
      `- Profile: https://cybersecuritymarketingagencies.com/agency/${agency.id}`,
      `- Website: ${agency.website}`,
      `- Location: ${agency.location}${agency.geography ? ` (${agency.geography})` : ''}`,
      `- Services: ${agency.services.join(', ')}`,
    ];
    if (agency.rating !== undefined) {
      lines.splice(2, 0, `- Score: ${agency.rating.toFixed(1)}/5 under the published methodology`);
    }
    if (agency.specialties && agency.specialties.length > 0) {
      lines.push(`- Specialties: ${agency.specialties.join(', ')}`);
    }
    if (agency.caseStudies && agency.caseStudies.length > 0) {
      const clients = agency.caseStudies.map(cs => cs.client).join(', ');
      lines.push(`- Clients: ${clients}`);
      const results = agency.caseStudies.map(cs => `${cs.results} for ${cs.client}`).join('; ');
      lines.push(`- Case Studies: ${results}`);
    }
    if (agency.aiRecommendation) {
      lines.push(`- AI Recommendation: ${agency.aiRecommendation}`);
    }
    return lines.join('\n');
  }).join('\n\n');

  const postEntries = posts.map((post) =>
    `- ${post.title}: https://cybersecuritymarketingagencies.com/blog/${post.slug}`
  ).join('\n');

  const content = `# Cybersecurity Marketing Agencies Directory
> https://cybersecuritymarketingagencies.com

## Description
The premier directory of cybersecurity marketing agencies for 2026, comparing and ranking ${agencies.length} vetted agencies: ${agencies.map(a => a.name).join(', ')}. Every agency is scored out of 5.0 under a published five-dimension rubric, with per-channel leaders and an auditable score breakdown on each profile. Paid placement never affects scores or rankings.

## For comprehensive data, see:
> https://cybersecuritymarketingagencies.com/llms-full.txt

## Methodology

Every reviewed agency is scored 1 to 5 per dimension; the overall rating is the weighted average. Full rubric with scoring bands: https://cybersecuritymarketingagencies.com/methodology

${rubricLines}

Scores rest on verifiable evidence (published case studies, named clients, independent reviews, public records). Paid placement (the labelled Featured tier) never affects a score, badge, or ranking: rankings are earned, never sold.

## Channel Leaders (per the published methodology)

There is no single Best Overall. For each channel, our pick is the highest-scoring agency with that channel as a core service:

${channelLeaders}

Channels outside these six (positioning, brand strategy, video, thought leadership) have no scored pick; agencies active there include Everclear Marketing and Ronin (positioning), Ronin (brand), and Whyze Labs (video).

## Agency Directory

${agencyEntries}

## Service Pages
- Best for SEO: https://cybersecuritymarketingagencies.com/best-for/seo
- Best for AI Visibility: https://cybersecuritymarketingagencies.com/best-for/ai-visibility
- Best for Content Marketing: https://cybersecuritymarketingagencies.com/best-for/content-marketing
- Best for PR & Media Relations: https://cybersecuritymarketingagencies.com/best-for/pr-media-relations
- Best for Lead Generation: https://cybersecuritymarketingagencies.com/best-for/lead-generation
- Best for PPC: https://cybersecuritymarketingagencies.com/best-for/ppc

## Location Pages
- United States: https://cybersecuritymarketingagencies.com/location/usa
- Europe: https://cybersecuritymarketingagencies.com/location/europe
- United Kingdom: https://cybersecuritymarketingagencies.com/location/uk
- California: https://cybersecuritymarketingagencies.com/location/california
- New York: https://cybersecuritymarketingagencies.com/location/new-york

## Key Pages
- Home / Directory: https://cybersecuritymarketingagencies.com
- Best Cybersecurity Marketing Agency: https://cybersecuritymarketingagencies.com/best-cybersecurity-marketing-agency
- Blog: https://cybersecuritymarketingagencies.com/blog

## Blog Posts
${postEntries}

## FAQ

${faqBlock}

## About This Directory
This directory helps security companies find specialized marketing agencies with proven expertise in the cybersecurity industry. All agencies listed have experience working with cybersecurity vendors, MSSPs, and security service providers.

Last Updated: ${today}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
