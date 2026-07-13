import Link from 'next/link';
import { getAllAgencies } from '@/lib/agencies';
import { getAllPosts, getTagsWithCounts } from '@/lib/blog';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap - Cybersecurity Marketing Agencies',
  description: 'Every page on the cybersecurity marketing agencies directory: agency profiles, service pages, location pages, and blog posts, in one place.',
  alternates: {
    canonical: 'https://cybersecuritymarketingagencies.com/sitemap-html',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SERVICES: [string, string][] = [
  ['seo', 'SEO'],
  ['ai-visibility', 'AI Visibility'],
  ['content-marketing', 'Content Marketing'],
  ['pr-media-relations', 'PR & Media Relations'],
  ['lead-generation', 'Lead Generation'],
  ['thought-leadership', 'Thought Leadership'],
  ['technical-content-strategy', 'Technical Content Strategy'],
  ['ppc', 'PPC'],
  ['social-media', 'Social Media'],
  ['brand-strategy', 'Brand Strategy'],
  ['website-development', 'Website Development'],
  ['digital-marketing', 'Digital Marketing'],
  ['video-marketing', 'Video Marketing'],
  ['podcast-marketing', 'Podcast Marketing'],
  ['demand-generation', 'Demand Generation'],
  ['sales-enablement', 'Sales Enablement'],
  ['marketing-analytics', 'Marketing Analytics'],
];

const LOCATIONS: [string, string][] = [
  ['usa', 'United States'],
  ['europe', 'Europe'],
  ['uk', 'United Kingdom'],
  ['california', 'California'],
  ['new-york', 'New York'],
];

const AUDIENCES: [string, string][] = [
  ['startups', 'Cybersecurity Startups'],
  ['enterprise', 'Enterprise Security Vendors'],
  ['mssp', 'MSSPs & Security Service Providers'],
];

const KEY_PAGES: [string, string][] = [
  ['/', 'Home / Directory'],
  ['/best-cybersecurity-marketing-agency', 'Best Cybersecurity Marketing Agency: How to Compare and Choose'],
  ['/blog', 'Blog'],
  ['/compare', 'Compare Agencies'],
  ['/methodology', 'Methodology'],
  ['/submit-agency', 'Submit Your Agency'],
];

function SectionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-gray-900 border-4 border-white p-6 sm:p-10 mb-10">
      <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 uppercase tracking-wider">
        ■ {title}
      </h2>
      {children}
    </section>
  );
}

export default function SitemapPage() {
  const agencies = [...getAllAgencies()].sort((a, b) => a.name.localeCompare(b.name));
  const posts = [...getAllPosts()].sort((a, b) => a.title.localeCompare(b.title));
  const tags = getTagsWithCounts();

  return (
    <>
      <div className="min-h-screen bg-black">
        <SiteNav />

        <header className="bg-gray-950 border-b-8 border-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <nav className="mb-6 font-mono text-xs uppercase tracking-wider">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">HOME</Link>
              <span className="text-gray-600 mx-2">&gt;</span>
              <span className="text-white">SITEMAP</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              SITEMAP
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Every page on the directory in one place: agency profiles, service and location pages,
              and the full blog archive. For search engines, see the{' '}
              <Link href="/sitemap.xml" className="text-white underline hover:text-gray-300">XML sitemap</Link>.
            </p>
          </div>
        </header>

        <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <SectionBox title={`Agency Directory (${agencies.length})`}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
              {agencies.map((agency) => (
                <Link
                  key={agency.id}
                  href={`/agency/${agency.id}`}
                  className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-white transition-colors text-sm py-1"
                >
                  {agency.name}
                </Link>
              ))}
            </div>
          </SectionBox>

          <SectionBox title="Service Pages">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
              {SERVICES.map(([slug, name]) => (
                <Link
                  key={slug}
                  href={`/best-for/${slug}`}
                  className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-white transition-colors text-sm py-1"
                >
                  Best for {name}
                </Link>
              ))}
            </div>
          </SectionBox>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-900 border-4 border-white p-6 sm:p-8">
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-wider">■ Location Pages</h2>
              <div className="flex flex-col gap-2">
                {LOCATIONS.map(([slug, name]) => (
                  <Link
                    key={slug}
                    href={`/location/${slug}`}
                    className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-white transition-colors text-sm"
                  >
                    Agencies in {name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border-4 border-white p-6 sm:p-8">
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-wider">■ By Company Stage</h2>
              <div className="flex flex-col gap-2">
                {AUDIENCES.map(([slug, name]) => (
                  <Link
                    key={slug}
                    href={`/best-for-audience/${slug}`}
                    className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-white transition-colors text-sm"
                  >
                    Best for {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <SectionBox title="Blog: Browse by Topic">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="bg-black border-2 border-white text-gray-300 hover:text-white hover:bg-gray-800 transition-colors px-3 py-1.5 text-xs font-bold uppercase"
                >
                  {tag.name} <span className="text-gray-500">({tag.postCount})</span>
                </Link>
              ))}
            </div>
          </SectionBox>

          <SectionBox title={`All Blog Posts (${posts.length})`}>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-white transition-colors text-sm py-1"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </SectionBox>

          <SectionBox title="Key Pages">
            <div className="flex flex-col gap-2">
              {KEY_PAGES.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-white transition-colors text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </SectionBox>

        </main>
      </div>
      <SiteFooter />
    </>
  );
}
