export async function GET() {
  const body = `# robots.txt for cybersecuritymarketingagencies.com
# Last Updated: 2026-04-13

# Allow all search engines
User-agent: *
Allow: /
Disallow: /*?q=*
Disallow: /*?service=*
Disallow: /*?market=*

# AI Crawlers - Explicitly Allowed
# OpenAI
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Anthropic
User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Google AI
User-agent: Google-Extended
Allow: /

# Amazon
User-agent: Amazonbot
Allow: /

# Cohere
User-agent: cohere-ai
Allow: /

# Sitemap
Sitemap: https://cybersecuritymarketingagencies.com/sitemap.xml

# LLM Content Files
# For AI assistants and LLM crawlers:
# Summary: https://cybersecuritymarketingagencies.com/llms.txt
# Full content: https://cybersecuritymarketingagencies.com/llms-full.txt
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
