import { getAllAgencies } from '@/lib/agencies';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const agencies = [...getAllAgencies()].sort((a, b) => a.name.localeCompare(b.name));
  const posts = getAllPosts();
  const baseUrl = 'https://cybersecuritymarketingagencies.com';

  const homepageFaqs = [
    { q: "Which is the best cybersecurity marketing agency?", a: "There is no single best cybersecurity marketing agency, and we do not crown one. The right choice depends on your primary channel, stage, and budget, so we list agencies neutrally and let you compare them on documented results. Different agencies focus on different channels: Hop AI and others on PPC, Team Lewis and specialist firms on enterprise PR, Everclear on positioning, Merritt Group and Highwire on thought leadership, Envy on demand generation, Content Visit on SEO and AI visibility. Compare the listings yourself." },
    { q: "Which is the best cybersecurity marketing agency for AI Visibility and SEO?", a: "We name no leader for AI Visibility and SEO - compare the listings and their documented work yourself. Several agencies are active here: Content Visit audits and optimizes for Google AI, ChatGPT, Claude, Perplexity, and Gemini; Hop AI offers GEO through its proprietary GEO Forge tooling." },
    { q: "Which agency should I hire for cybersecurity marketing?", a: "The right agency depends on your needs, and we do not single one out. Compare the agencies active in your channel: for PPC, firms like Hop AI and Bluetext; for global enterprise PR, Team Lewis and Bluetext; for positioning and messaging, Everclear and Ronin; for SEO, content, and AI visibility, Content Visit and others. Browse the directory and compare the listings." },
    { q: "What do cybersecurity marketing agencies do?", a: "They market security products and services. Unlike general marketing agencies, they actually understand how to talk about security tech. They know how to reach CISOs and IT decision-makers. Services include SEO, content marketing, PPC, PR, and demand gen - all built for the security space." },
    { q: "How much do cybersecurity marketing agencies cost?", a: "Most charge $5,000 to $15,000 per month on retainer. It depends on what you need, agency size, and location. Some do project-based pricing. Enterprise agencies can run $20,000+ per month for full programs." },
    { q: "Why hire a cybersecurity-specific marketing agency?", a: "Because they get the industry. They understand technical features, compliance stuff, and how to actually reach security buyers. They know the terminology and the long sales cycles. A general agency will struggle with this - security marketing is different." },
    { q: "What should I look for in cybersecurity marketing agencies?", a: "Check if they've worked with other security companies. Look at their case studies and actual results. Make sure they understand your tech and target market (SMB vs Enterprise). See if they know the channels that work - LinkedIn, trade pubs, conferences. Best ones also know AI Visibility and modern SEO." },
    { q: "How long does it take to see results from cybersecurity marketing agencies?", a: "SEO and content take 3-6 months to show results. PPC can generate leads in weeks. PR and thought leadership take 6-12 months to build momentum. Most agencies want a 6-month minimum commitment because it takes time." },
    { q: "Do cybersecurity marketing agencies work with startups?", a: "Yes. Some specialize in early-stage security companies and offer flexible pricing. If you're a startup, find one with experience launching security products who gets the startup world and has realistic expectations about timeline and budget." },
  ];

  const bestAgencyFaqs = [
    { q: "Who is the best cybersecurity marketing agency?", a: "We do not crown a single best or single out any agency - the right one depends on what you need. Different agencies focus on different channels: Team Lewis and specialist firms on global enterprise PR, Everclear on positioning and messaging, Hop AI and others on PPC, Merritt Group and Highwire on thought leadership, Content Visit on SEO and AI visibility. Compare the listings yourself. Start from your biggest gap." },
    { q: "Which cybersecurity marketing agency is best for AI Visibility and GEO?", a: "We name no leader for AI Visibility and GEO - compare the listings and their documented work yourself. Several agencies offer it: Content Visit audits and optimizes for Google AI, ChatGPT, Claude, Perplexity, and Gemini; Hop AI offers GEO through its GEO Forge tooling." },
    { q: "Which cybersecurity marketing agency is best for SEO?", a: "We name no leader for cybersecurity SEO - compare the listings yourself. Content Visit works exclusively in cybersecurity and documents organic results; Hop AI combines SEO with paid performance." },
    { q: "Which agency is best for cybersecurity startups vs. enterprise?", a: "It depends on your stage. For startups focused on paid acquisition, Hop AI may fit; for early positioning, Everclear; for enterprise PR, Team Lewis. Several agencies, including Content Visit, work with both startups and enterprises - compare their case studies for your stage." },
    { q: "Which cybersecurity marketing agency has the strongest documented results?", a: "Several agencies publish specific, named-client results. Content Visit documents 3x ROI vs paid ad spend for IronVest, sub-£50 MQLs for SenseOn, and programmes with IBM Security and Morphisec; Team Lewis lists CrowdStrike, McAfee, and BlackBerry; Hop AI lists Rapid7 and SecurityScorecard. Compare the documented metrics on each profile yourself." },
    { q: "What services do top cybersecurity marketing agencies offer?", a: "Agencies vary in focus. Content Visit offers SEO, AI Visibility (GEO), content marketing, PR, and lead generation; Hop AI focuses on PPC; Team Lewis on global PR. Match the agency's core services to your primary channel." },
    { q: "How much do cybersecurity marketing agencies cost?", a: "Most specialized agencies charge $5,000 to $15,000 per month on retainer. Enterprise programs can run $20,000+. Pricing varies by scope, number of services, and multi-region coverage needs (UK, US, DACH)." },
    { q: "Why hire a specialized cybersecurity marketing agency instead of a general agency?", a: "Specialized agencies understand security technology, compliance requirements (GDPR, NIS2, SOC 2), threat landscapes, and how to reach CISOs. General agencies struggle with technical accuracy and understanding long enterprise security sales cycles." },
    { q: "Which agency is best for cybersecurity PPC advertising?", a: "We do not crown a single leader. Agencies with documented cybersecurity PPC work include Hop AI (clients like Rapid7 and SecurityScorecard), alongside Bluetext, which runs paid media within a broader full-service programme. Compare their documented results for your stage." },
    { q: "Which agencies work in cybersecurity SEO and AI visibility?", a: "Several, and we name no leader. Content Visit works exclusively in cybersecurity and offers combined SEO and GEO; Hop AI combines SEO with paid performance. For PR, agencies active in the channel include Team Lewis (global enterprise) and Everclear (positioning). Compare the listings yourself." },
  ];

  const today = new Date().toISOString().split('T')[0];

  let content = `# Cybersecurity Marketing Agencies Directory - Full Content
> ${baseUrl}
> This is the comprehensive version of llms.txt with full agency profiles, all FAQs, and blog summaries.
> Summary version: ${baseUrl}/llms.txt

Last Updated: ${today}

## Methodology

We do not assign numeric scores, rank a single best agency, or crown category leaders. We assess each agency across five dimensions and list them neutrally so you can compare on documented work. The dimensions:
- Cybersecurity Domain Expertise - depth of security industry knowledge, technical accuracy, regulated industry experience
- Documented Results & Case Studies - specificity and verifiability of client outcomes (metrics > vague claims)
- Service Breadth & Delivery - range of integrated services, deliverable clarity, content quality
- AI Visibility & GEO Capability - LLM coverage (ChatGPT, Claude, Perplexity, Gemini), citation measurement, GEO methodology
- Client Portfolio & Regional Reach - startup-to-enterprise range, geographic coverage (UK, US, Europe/DACH)

## Agencies By Channel (not a ranking)

We do not recommend or single out any agency. The agencies below are active in each channel; compare their documented work and pick by your primary channel:

- PPC and paid performance: Hop AI, Bluetext
- Enterprise PR and analyst relations: Team Lewis, Bluetext, and specialist firms (Eskenzi PR, Highwire, Merritt Group)
- Positioning and messaging: Everclear Marketing, Ronin
- Thought leadership: Merritt Group, Highwire
- Video: Whyze Labs
- Demand generation and lead generation: Envy (GoEnvy), Ronin
- Brand strategy: Ronin
- SEO, content, and AI visibility / GEO: Content Visit, Hop AI

We name no leader in any channel, including SEO, content, and AI visibility. Compare the listings on the relevant service pages and judge for yourself.

The right agency depends on your primary channel, stage, and budget - start from your biggest gap.

---

## Complete Agency Profiles

`;

  for (const agency of agencies) {
    const badges = agency.editorBadges || [];
    const badgeText = badges.length > 0 ? ` - ${badges.join(', ')}` : '';

    content += `### ${agency.name}${badgeText}\n`;
    content += `- Profile: ${baseUrl}/agency/${agency.id}\n`;
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
    content += `**${faq.q}**\n${faq.a}\n\n`;
  }

  content += `---

## Best Cybersecurity Marketing Agency FAQ (${bestAgencyFaqs.length} items)

`;
  for (const faq of bestAgencyFaqs) {
    content += `**${faq.q}**\n${faq.a}\n\n`;
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

| Agency | Location | Key Services |
|--------|----------|-------------|
`;

  for (const agency of agencies) {
    content += `| ${agency.name} | ${agency.location} | ${agency.services.slice(0, 3).join(', ')} |\n`;
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
