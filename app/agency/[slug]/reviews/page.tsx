import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllAgencies } from '@/lib/agencies';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import type { Metadata } from 'next';

const BASE = 'https://cybersecuritymarketingagencies.com';

function agencyWithReviews(slug: string) {
  const agency = getAllAgencies().find((a) => a.id === slug);
  if (!agency || !agency.reviews || agency.reviews.length === 0) return null;
  return agency;
}

function aggregate(reviews: NonNullable<ReturnType<typeof agencyWithReviews>>['reviews']) {
  const list = reviews || [];
  const ratings = list.map((r) => r.rating ?? 5);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return { avg: Math.round(avg * 10) / 10, count: list.length };
}

const SOURCE_URL: Record<string, (a: ReturnType<typeof getAllAgencies>[number]) => string | undefined> = {
  Clutch: (a) => a.clutchUrl,
  G2: (a) => a.g2Url,
  DesignRush: (a) => a.designRushUrl,
};

export function generateStaticParams() {
  return getAllAgencies()
    .filter((a) => a.reviews && a.reviews.length > 0)
    .map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agency = agencyWithReviews(slug);
  if (!agency) return { title: 'Reviews Not Found' };
  const { avg, count } = aggregate(agency.reviews);
  return {
    title: `${agency.name} Reviews (${avg.toFixed(1)}/5) | Cybersecurity Marketing Agencies`,
    description: `Read ${count} verified client ${count === 1 ? 'review' : 'reviews'} of ${agency.name}, a cybersecurity marketing agency, aggregated from Clutch, G2, and DesignRush. Rated ${avg.toFixed(1)} out of 5.`,
    alternates: { canonical: `${BASE}/agency/${slug}/reviews` },
  };
}

export default async function AgencyReviewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agency = agencyWithReviews(slug);
  if (!agency) notFound();

  const reviews = agency.reviews!;
  const { avg, count } = aggregate(reviews);

  const sourceLinks = ([
    ['Clutch', agency.clutchUrl],
    ['DesignRush', agency.designRushUrl],
    ['G2', agency.g2Url],
  ] as const).filter(([, url]) => !!url) as [string, string][];

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: agency.name,
    url: agency.website,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: count,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating ?? 5), bestRating: '5', worstRating: '1' },
      author: { '@type': 'Person', name: r.role },
      ...(r.title ? { name: r.title } : {}),
      reviewBody: r.quote,
      ...(r.date ? { datePublished: r.date } : {}),
      ...(r.source ? { publisher: { '@type': 'Organization', name: r.source } } : {}),
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: agency.name, item: `${BASE}/agency/${slug}` },
      { '@type': 'ListItem', position: 3, name: 'Reviews', item: `${BASE}/agency/${slug}/reviews` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteNav />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <nav className="mb-8 font-mono text-xs uppercase tracking-wider">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <span className="text-gray-600 mx-2">/</span>
            <Link href={`/agency/${slug}`} className="text-gray-400 hover:text-white">{agency.name}</Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-white">Reviews</span>
          </nav>

          {/* Header + aggregate */}
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              {agency.name} Reviews
            </h1>
            <div className="flex flex-wrap items-baseline gap-3 mb-3">
              <span className="text-4xl font-black text-white">{avg.toFixed(1)}</span>
              <span className="text-white font-mono">/ 5</span>
              <span className="text-white">from {count} verified {count === 1 ? 'review' : 'reviews'}</span>
            </div>
            {sourceLinks.length > 0 && (
              <p className="text-white text-sm">
                Aggregated from{' '}
                {sourceLinks.map(([name, url], i) => (
                  <span key={name}>
                    {i > 0 && ' · '}
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-gray-300">{name}</a>
                  </span>
                ))}
                . Each review is verified on its source platform.
              </p>
            )}
          </header>

          {/* Reviews */}
          <div className="space-y-6">
            {reviews.map((r, i) => {
              const srcUrl = r.sourceUrl || (r.source ? SOURCE_URL[r.source]?.(agency) : undefined);
              return (
                <figure key={i} className="bg-gray-900 border-4 border-white p-8">
                  <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                    <span className="text-white font-black">{(r.rating ?? 5).toFixed(1)} / 5</span>
                    <span className="text-white">{'★'.repeat(Math.round(r.rating ?? 5))}</span>
                  </div>
                  {r.title && <h2 className="text-xl font-black text-white mb-2">{r.title}</h2>}
                  <blockquote className="text-white leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="text-white text-sm font-mono mt-4">
                    {r.role}{r.company ? `, ${r.company}` : ''}
                    {r.date ? ` · ${r.date}` : ''}
                    {r.source ? (
                      <>
                        {' · '}
                        {srcUrl ? (
                          <a href={srcUrl} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-gray-300">via {r.source}</a>
                        ) : (
                          <span>via {r.source}</span>
                        )}
                      </>
                    ) : null}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/agency/${slug}`} className="bg-white text-black px-6 py-3 font-black uppercase text-sm border-4 border-white hover:bg-gray-200 transition-colors">
              ■ View {agency.name} profile
            </Link>
            <Link href={agency.website} target="_blank" rel="noopener noreferrer" className="bg-transparent text-white px-6 py-3 font-black uppercase text-sm border-4 border-white hover:bg-white hover:text-black transition-colors">
              ■ Visit website
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
