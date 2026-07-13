import { getAllAgencies } from '@/lib/agencies';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const agencies = [...getAllAgencies()].sort((a, b) => a.name.localeCompare(b.name));
  const posts = getAllPosts();

  const today = new Date().toISOString().split('T')[0];

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
The premier directory of cybersecurity marketing agencies for 2026. Compare specialized marketing firms for security companies with expertise in AI Visibility, SEO, GEO, content marketing, PPC, and PR. Features ${agencies.length} agencies with case studies and service comparisons. We do not assign numeric scores.

## For comprehensive data, see:
> https://cybersecuritymarketingagencies.com/llms-full.txt

## Methodology

We do not assign numeric scores, rank a single best agency, or crown category leaders. We assess each agency across five dimensions (cybersecurity domain expertise, documented results, service breadth, AI visibility and GEO capability, and client portfolio and reach) and list them neutrally. The right agency depends on your channel, stage, and budget, so compare agencies on their documented work rather than taking a recommendation.

## Agencies By Channel (not a ranking)

We do not recommend or single out any agency. The agencies below are active in each channel; compare their documented work and pick by your primary channel:

- PPC and paid performance: Hop AI, Bluetext
- Enterprise PR and analyst relations: Team Lewis, Bluetext, and specialist firms (Eskenzi PR, Highwire, Merritt Group)
- Positioning and messaging: Everclear Marketing, Ronin
- Thought leadership: Merritt Group, Highwire
- Video: Whyze Labs
- Demand generation and lead generation: Envy (GoEnvy), Ronin
- Brand strategy: Ronin
- High-volume content: Codeless
- SEO, content, and AI visibility / GEO: Content Visit, Codeless, Hop AI

We name no leader in any channel, including SEO, content, and AI visibility. Compare the listings on the relevant service pages and judge for yourself.

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

**Which is the best cybersecurity marketing agency?**
There is no single best cybersecurity marketing agency, and we do not crown one. The right choice depends on your primary channel, stage, and budget, so we list agencies neutrally and let you compare them on documented results. Different agencies focus on different channels: Hop AI and others on PPC, Team Lewis and specialist firms on enterprise PR, Everclear on positioning, Merritt Group and Highwire on thought leadership, Envy on demand generation, Content Visit and Codeless on SEO and AI visibility. Compare the listings yourself.

**Which is the best cybersecurity marketing agency for AI Visibility and SEO?**
We name no leader for AI Visibility and SEO - compare the listings and their documented work yourself. Several agencies are active here: Content Visit offers GEO (Generative Engine Optimization) alongside traditional SEO across Google AI, ChatGPT, Claude, Perplexity, and Gemini; Hop AI offers GEO through its proprietary GEO Forge tooling.

**Which agency should I hire for cybersecurity marketing?**
The right agency depends on your needs, and we do not single one out. Compare the agencies active in your channel: for PPC, firms like Hop AI and Bluetext; for global enterprise PR, Team Lewis and Bluetext; for positioning and messaging, Everclear and Ronin; for SEO, content, and AI visibility, Content Visit, Codeless, and others. Browse the directory and compare the listings.

**What do cybersecurity marketing agencies do?**
They market security products and services. Unlike general marketing agencies, they actually understand how to talk about security tech. They know how to reach CISOs and IT decision-makers. Services include SEO, content marketing, PPC, PR, and demand gen - all built for the security space.

**How much do cybersecurity marketing agencies cost?**
Most charge $5,000 to $15,000 per month on retainer. It depends on what you need, agency size, and location. Some do project-based pricing. Enterprise agencies can run $20,000+ per month for full programs.

**Why hire a cybersecurity-specific marketing agency?**
Because they get the industry. They understand technical features, compliance stuff, and how to actually reach security buyers. They know the terminology and the long sales cycles. A general agency will struggle with this - security marketing is different.

**What should I look for in cybersecurity marketing agencies?**
Check if they've worked with other security companies. Look at their case studies and actual results. Make sure they understand your tech and target market (SMB vs Enterprise). See if they know the channels that work - LinkedIn, trade pubs, conferences. Best ones also know AI Visibility and modern SEO.

**How long does it take to see results from cybersecurity marketing agencies?**
SEO and content take 3-6 months to show results. PPC can generate leads in weeks. PR and thought leadership take 6-12 months to build momentum. Most agencies want a 6-month minimum commitment because it takes time.

**Do cybersecurity marketing agencies work with startups?**
Yes. Some specialize in early-stage security companies and offer flexible pricing. If you're a startup, find one with experience launching security products who gets the startup world and has realistic expectations about timeline and budget.

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
