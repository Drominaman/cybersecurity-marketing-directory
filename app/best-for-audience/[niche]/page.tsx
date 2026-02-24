import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { getAllAgencies } from '@/lib/agencies';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import type { Metadata } from 'next';
import type { Agency } from '@/types/agency';

// Niche/audience mapping with filters
const NICHE_MAP: { [key: string]: { name: string; description: string; filter: (agency: Agency) => boolean } } = {
  'startups': {
    name: 'Cybersecurity Startups',
    description: 'Marketing agencies that specialize in helping cybersecurity startups build brand awareness, generate leads, and scale their go-to-market strategy.',
    filter: (agency) => agency.clientTypes?.some(t => t.toLowerCase().includes('startup')) || agency.minBudget === '$5,000/month',
  },
  'enterprise': {
    name: 'Enterprise Security Vendors',
    description: 'Marketing agencies with proven track records working with enterprise-grade cybersecurity companies, including Fortune 500 security vendors.',
    filter: (agency) => agency.clientTypes?.some(t => t.toLowerCase().includes('enterprise')) || (agency.rating !== undefined && agency.rating >= 4.7),
  },
  'mssp': {
    name: 'MSSPs & Security Service Providers',
    description: 'Marketing agencies experienced in helping managed security service providers (MSSPs) and security service providers differentiate and generate pipeline.',
    filter: (agency) => agency.clientTypes?.some(t => t.toLowerCase().includes('service provider')) || agency.services.includes('Lead Generation'),
  },
};

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }): Promise<Metadata> {
  const { niche } = await params;
  const nicheData = NICHE_MAP[niche];

  if (!nicheData) {
    return {};
  }

  return {
    title: `Best Cybersecurity Marketing Agencies for ${nicheData.name} | Top Rated Agencies`,
    description: nicheData.description,
    keywords: [
      `cybersecurity marketing agencies for ${nicheData.name.toLowerCase()}`,
      `${nicheData.name.toLowerCase()} marketing`,
      `cybersecurity ${niche} marketing`,
      'cybersecurity marketing agencies',
      'security marketing',
    ],
    openGraph: {
      title: `Best Cybersecurity Marketing Agencies for ${nicheData.name}`,
      description: nicheData.description,
      type: 'website',
      url: `https://www.cybersecuritymarketingagencies.com/best-for-audience/${niche}`,
    },
    alternates: {
      canonical: `https://www.cybersecuritymarketingagencies.com/best-for-audience/${niche}`,
    },
  };
}

export default async function NichePage({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const nicheData = NICHE_MAP[niche];

  if (!nicheData) {
    notFound();
  }

  // Filter agencies matching this niche
  const allAgencies = getAllAgencies();
  const filteredAgencies = allAgencies.filter(nicheData.filter);

  // Sort by recommended first, then by rating
  const sortedAgencies = [...filteredAgencies].sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    if (a.rating && b.rating) return b.rating - a.rating;
    if (a.rating) return -1;
    if (b.rating) return 1;
    return 0;
  });

  const topAgency = sortedAgencies.find((a) => a.recommended || a.rating === 5.0);

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.cybersecuritymarketingagencies.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Best for ${nicheData.name}`,
        "item": `https://www.cybersecuritymarketingagencies.com/best-for-audience/${niche}`
      }
    ]
  };

  // Collection schema for niche page
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Best Cybersecurity Marketing Agencies for ${nicheData.name}`,
    "description": nicheData.description,
    "about": {
      "@type": "Service",
      "serviceType": `Cybersecurity Marketing for ${nicheData.name}`,
      "provider": sortedAgencies.slice(0, 5).map((agency) => ({
        "@type": "Organization",
        "name": agency.name,
        "url": agency.website,
      })),
    },
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="min-h-screen bg-black">
        <SiteNav />

        {/* Header */}
        <header className="bg-gray-950 border-b-8 border-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            {/* Breadcrumbs */}
            <nav className="text-sm font-mono text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">&#9664; HOME</Link>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-white">BEST FOR {nicheData.name.toUpperCase()}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4">
              BEST FOR {nicheData.name.toUpperCase()}
            </h1>
            <p className="text-gray-300 font-mono text-xl mb-2">
              &#9632; {sortedAgencies.length} CYBERSECURITY MARKETING {sortedAgencies.length === 1 ? 'AGENCY' : 'AGENCIES'}
            </p>
            <p className="text-gray-300 text-lg max-w-3xl">
              {nicheData.description}
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Top Recommendation Box */}
          {topAgency && (
            <div className="bg-gray-900 border-4 border-white p-10 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl font-black text-white/10">&#9733;</div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">&#11088;</div>
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wider">
                      TOP RECOMMENDATION FOR {nicheData.name.toUpperCase()}
                    </h2>
                    <p className="text-gray-300 text-lg font-mono">
                      &#9632; EXPERT PICK // HIGHEST RATED
                    </p>
                  </div>
                </div>

                <div className="bg-black border-4 border-white p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-4xl font-black text-white mb-2 uppercase">
                        {topAgency.name}
                      </h3>
                      {topAgency.rating && (
                        <div className="text-gray-200 font-bold text-2xl">
                          {topAgency.rating} &#9733; EXPERT SCORE
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-white text-lg mb-6 leading-relaxed">
                    {topAgency.shortDescription}
                  </p>

                  {topAgency.editorBadges && topAgency.editorBadges.length > 0 && (
                    <div className="mb-6">
                      <div className="text-gray-400 font-bold mb-3 uppercase">ACHIEVEMENTS:</div>
                      <div className="flex flex-wrap gap-2">
                        {topAgency.editorBadges.map(badge => (
                          <span key={badge} className="bg-gray-800 border-2 border-white px-4 py-2 text-gray-200 font-bold text-sm">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Link
                      href={`/agency/${topAgency.id}`}
                      className="bg-white text-black px-8 py-4 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]"
                    >
                      &#9632; VIEW FULL PROFILE
                    </Link>
                    <Link
                      href={topAgency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-8 py-4 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]"
                    >
                      &#9632; VISIT WEBSITE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Agencies Grid */}
          <div className="bg-gray-900 border-4 border-white p-10 mb-12">
            <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">
              &#9632; ALL {nicheData.name.toUpperCase()} AGENCIES ({sortedAgencies.length})
            </h2>

            {sortedAgencies.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {sortedAgencies.map((agency) => (
                  <div
                    key={agency.id}
                    className="bg-black border-4 border-white p-8 hover:border-gray-400 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all group relative"
                  >
                    {agency.recommended && (
                      <div className="absolute -top-3 -right-3 bg-white text-black px-3 py-1 font-black text-sm border-2 border-black uppercase">
                        RECOMMENDED
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-black text-white uppercase group-hover:text-gray-300 transition-colors">
                        {agency.name}
                      </h3>
                      {agency.rating && (
                        <div className="bg-gray-800 border-2 border-white px-3 py-1">
                          <span className="text-gray-200 font-black">{agency.rating} &#9733;</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {agency.shortDescription}
                    </p>

                    {agency.editorBadges && agency.editorBadges.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {agency.editorBadges.map(badge => (
                          <span key={badge} className="bg-gray-800 border border-gray-400 px-2 py-1 text-gray-300 font-bold text-xs uppercase">
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-2">LOCATION:</div>
                      <div className="text-white">{agency.location}</div>
                      {agency.geography && (
                        <div className="text-gray-400 text-sm font-mono mt-1">&#9670; {agency.geography}</div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/agency/${agency.id}`}
                        className="flex-1 bg-white text-black px-6 py-3 font-black hover:bg-gray-200 transition-all text-center uppercase text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]"
                      >
                        &#9632; VIEW PROFILE
                      </Link>
                      <Link
                        href={agency.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black px-6 py-3 font-black hover:bg-gray-200 transition-all text-center uppercase text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]"
                      >
                        &#9632; WEBSITE
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-xl mb-6">
                  NO AGENCIES FOUND FOR {nicheData.name.toUpperCase()}
                </p>
                <Link
                  href="/"
                  className="bg-white text-black px-8 py-4 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]"
                >
                  &#9664; BACK TO ALL AGENCIES
                </Link>
              </div>
            )}
          </div>

          {/* About Section - Why This Niche Needs Specialized Marketing */}
          <div className="bg-gray-900 border-4 border-white p-10 mb-12">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
              &#9632; WHY {nicheData.name.toUpperCase()} NEED SPECIALIZED MARKETING
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-white">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">AUDIENCE UNDERSTANDING</h3>
                <p className="text-gray-300 leading-relaxed">
                  {nicheData.name} have unique buyer personas, sales cycles, and competitive dynamics.
                  A marketing agency that understands these nuances can craft messaging that resonates
                  with the right decision-makers and drives qualified pipeline.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">MARKET POSITIONING</h3>
                <p className="text-gray-300 leading-relaxed">
                  Standing out in the crowded cybersecurity market requires precise positioning.
                  Agencies experienced with {nicheData.name.toLowerCase()} know how to differentiate
                  your offering and communicate value to your specific target audience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">GO-TO-MARKET STRATEGY</h3>
                <p className="text-gray-300 leading-relaxed">
                  From product launches to demand generation campaigns, {nicheData.name.toLowerCase()} require
                  marketing strategies tailored to their stage, budget, and growth objectives.
                  Specialized agencies bring playbooks proven in this segment.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">INDUSTRY CREDIBILITY</h3>
                <p className="text-gray-300 leading-relaxed">
                  Building trust in cybersecurity requires deep technical knowledge and industry relationships.
                  Agencies that have worked with {nicheData.name.toLowerCase()} can leverage existing
                  credibility and connections to accelerate your growth.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-950 border-4 border-white p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-4 uppercase">
              &#9632; EXPLORE MORE AGENCIES
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Browse the full directory to compare all cybersecurity marketing agencies
            </p>
            <Link
              href="/"
              className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]"
            >
              &#9664; BACK TO DIRECTORY
            </Link>
          </div>

        </main>

        <SiteFooter />
      </div>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(NICHE_MAP).map((niche) => ({
    niche,
  }));
}
