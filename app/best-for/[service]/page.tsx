import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { getAllAgencies } from '@/lib/agencies';
import type { Metadata } from 'next';

// Service slug to display name mapping
const SERVICE_MAP: { [key: string]: string } = {
  'seo': 'SEO',
  'ai-visibility': 'AI Visibility',
  'content-marketing': 'Content Marketing',
  'pr-media-relations': 'PR & Media Relations',
  'lead-generation': 'Lead Generation',
  'thought-leadership': 'Thought Leadership',
  'technical-content-strategy': 'Technical Content Strategy',
  'ppc': 'PPC',
  'social-media': 'Social Media',
  'brand-strategy': 'Brand Strategy',
  'website-development': 'Website Development',
  'digital-marketing': 'Digital Marketing',
  'video-marketing': 'Video Marketing',
  'podcast-marketing': 'Podcast Marketing',
  'demand-generation': 'Demand Generation',
  'sales-enablement': 'Sales Enablement',
  'marketing-analytics': 'Marketing Analytics',
};

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const serviceName = SERVICE_MAP[service] || service;

  return {
    title: `Best Cybersecurity Marketing Agency for ${serviceName} | Top Rated Agencies`,
    description: `Find the best cybersecurity marketing agencies specializing in ${serviceName}. Compare top-rated agencies with proven expertise in security company marketing.`,
    keywords: [
      `cybersecurity marketing agencies`,
      `${serviceName} for cybersecurity`,
      `security marketing ${serviceName}`,
      `best cybersecurity ${serviceName}`,
      'cybersecurity marketing',
    ],
    openGraph: {
      title: `Best Cybersecurity Marketing Agency for ${serviceName}`,
      description: `Top-rated cybersecurity marketing agencies specializing in ${serviceName}. Compare and find the perfect agency for your security company.`,
      type: 'website',
      url: `https://cybersecuritymarketingagencies.com/best-for/${service}`,
    },
    alternates: {
      canonical: `https://cybersecuritymarketingagencies.com/best-for/${service}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const serviceName = SERVICE_MAP[service];

  if (!serviceName) {
    notFound();
  }

  // Filter agencies that offer this service
  const allAgencies = getAllAgencies();
  const filteredAgencies = allAgencies.filter((agency) =>
    agency.services.some(s => s.toLowerCase() === serviceName.toLowerCase())
  );

  // Sort by recommendation and rating
  const sortedAgencies = [...filteredAgencies].sort((a, b) => {
    // Recommended agencies first
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    // Then by rating
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
        "item": "https://cybersecuritymarketingagencies.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Best for ${serviceName}`,
        "item": `https://cybersecuritymarketingagencies.com/best-for/${service}`
      }
    ]
  };

  // Collection schema for service page
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Best Cybersecurity Marketing Agencies for ${serviceName}`,
    "description": `Top-rated cybersecurity marketing agencies specializing in ${serviceName}`,
    "about": {
      "@type": "Service",
      "serviceType": serviceName,
      "provider": sortedAgencies.slice(0, 5).map((agency) => ({
        "@type": "Organization",
        "name": agency.name,
        "url": agency.website,
        ...(agency.rating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": agency.rating,
            "bestRating": 5,
          }
        }),
        ...(agency.aiRecommendation && {
          "slogan": agency.aiRecommendation
        })
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
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-b-8 border-cyan-500 relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)'}}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            {/* Breadcrumbs */}
            <nav className="text-sm font-mono text-green-400 mb-6">
              <Link href="/" className="hover:text-cyan-400">◀ HOME</Link>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-cyan-400">BEST FOR {serviceName.toUpperCase()}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-magenta-500 tracking-wider mb-4">
              BEST FOR {serviceName.toUpperCase()}
            </h1>
            <p className="text-yellow-400 font-mono text-xl mb-2">
              ► {sortedAgencies.length} CYBERSECURITY MARKETING {sortedAgencies.length === 1 ? 'AGENCY' : 'AGENCIES'}
            </p>
            <p className="text-cyan-300 text-lg max-w-3xl">
              Find the top cybersecurity marketing agencies specializing in {serviceName}.
              Compare agencies with proven expertise in security company marketing.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Top Recommendation Box */}
          {topAgency && (
            <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border-4 border-yellow-500 p-10 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-9xl font-black text-yellow-500/10">★</div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl">⭐</div>
                  <div>
                    <h2 className="text-3xl font-black text-yellow-400 mb-2 uppercase tracking-wider">
                      TOP RECOMMENDATION FOR {serviceName.toUpperCase()}
                    </h2>
                    <p className="text-yellow-300 text-lg font-mono">
                      ► EXPERT PICK // HIGHEST RATED
                    </p>
                  </div>
                </div>

                <div className="bg-black border-4 border-yellow-400 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-4xl font-black text-cyan-400 mb-2 uppercase">
                        {topAgency.name}
                      </h3>
                      {topAgency.rating && (
                        <div className="text-magenta-400 font-bold text-2xl">
                          {topAgency.rating} ★ EXPERT SCORE
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-white text-lg mb-6 leading-relaxed">
                    {topAgency.aiRecommendation || topAgency.shortDescription}
                  </p>

                  {topAgency.editorBadges && topAgency.editorBadges.length > 0 && (
                    <div className="mb-6">
                      <div className="text-green-400 font-bold mb-3 uppercase">ACHIEVEMENTS:</div>
                      <div className="flex flex-wrap gap-2">
                        {topAgency.editorBadges.map(badge => (
                          <span key={badge} className="bg-green-900 border-2 border-green-400 px-4 py-2 text-green-300 font-bold text-sm">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Link
                      href={`/agency/${topAgency.id}`}
                      className="bg-cyan-500 text-black px-8 py-4 font-black hover:bg-cyan-400 transition-all inline-flex items-center gap-2 uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                      ► VIEW FULL PROFILE
                    </Link>
                    <Link
                      href={topAgency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-black px-8 py-4 font-black hover:bg-green-400 transition-all inline-flex items-center gap-2 uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                      ► VISIT WEBSITE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Agencies Grid */}
          <div className="bg-gray-900 border-4 border-cyan-500 p-10 mb-12">
            <h2 className="text-3xl font-black text-cyan-400 mb-8 uppercase tracking-wider">
              ► ALL {serviceName.toUpperCase()} AGENCIES ({sortedAgencies.length})
            </h2>

            {sortedAgencies.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {sortedAgencies.map((agency) => (
                  <div
                    key={agency.id}
                    className="bg-black border-4 border-cyan-500 p-8 hover:border-magenta-500 hover:shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] transition-all group relative"
                  >
                    {agency.recommended && (
                      <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 font-black text-sm border-2 border-black uppercase">
                        RECOMMENDED
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-black text-cyan-400 uppercase group-hover:text-magenta-400 transition-colors">
                        {agency.name}
                      </h3>
                      {agency.rating && (
                        <div className="bg-magenta-900 border-2 border-magenta-400 px-3 py-1">
                          <span className="text-magenta-300 font-black">{agency.rating} ★</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {agency.shortDescription}
                    </p>

                    {agency.editorBadges && agency.editorBadges.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {agency.editorBadges.map(badge => (
                          <span key={badge} className="bg-yellow-900 border border-yellow-600 px-2 py-1 text-yellow-400 font-bold text-xs uppercase">
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="text-cyan-400 text-xs font-bold uppercase mb-2">LOCATION:</div>
                      <div className="text-white">{agency.location}</div>
                      {agency.geography && (
                        <div className="text-green-400 text-sm font-mono mt-1">◆ {agency.geography}</div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/agency/${agency.id}`}
                        className="flex-1 bg-cyan-500 text-black px-6 py-3 font-black hover:bg-cyan-400 transition-all text-center uppercase text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      >
                        ► VIEW PROFILE
                      </Link>
                      <Link
                        href={agency.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-black px-6 py-3 font-black hover:bg-green-400 transition-all text-center uppercase text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      >
                        ► WEBSITE
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-xl mb-6">
                  NO AGENCIES FOUND FOR {serviceName.toUpperCase()}
                </p>
                <Link
                  href="/"
                  className="bg-cyan-500 text-black px-8 py-4 font-black hover:bg-cyan-400 transition-all inline-flex items-center gap-2 uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  ◀ BACK TO ALL AGENCIES
                </Link>
              </div>
            )}
          </div>

          {/* Why Choose Section */}
          <div className="bg-gray-900 border-4 border-green-500 p-10 mb-12">
            <h2 className="text-3xl font-black text-green-400 mb-6 uppercase tracking-wider">
              ► WHY CHOOSE A {serviceName.toUpperCase()} SPECIALIST?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-white">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3">INDUSTRY EXPERTISE</h3>
                <p className="text-gray-300 leading-relaxed">
                  Cybersecurity marketing agencies specializing in {serviceName} understand the unique challenges
                  of security companies, from complex technical concepts to compliance requirements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-magenta-400 mb-3">PROVEN RESULTS</h3>
                <p className="text-gray-300 leading-relaxed">
                  These agencies have track records working with security vendors, MSSPs, and enterprise
                  security companies to deliver measurable growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">TECHNICAL KNOWLEDGE</h3>
                <p className="text-gray-300 leading-relaxed">
                  Teams fluent in security technologies, threat landscapes, and cybersecurity buyer personas
                  can create more effective {serviceName} campaigns.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-3">GLOBAL REACH</h3>
                <p className="text-gray-300 leading-relaxed">
                  Many agencies offer international capabilities for companies serving global markets,
                  with expertise across different regions and compliance frameworks.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-4 border-cyan-500 p-10 text-center">
            <h2 className="text-3xl font-black text-cyan-400 mb-4 uppercase">
              ► EXPLORE MORE AGENCIES
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Browse the full directory to compare all cybersecurity marketing agencies
            </p>
            <Link
              href="/"
              className="bg-cyan-500 text-black px-12 py-5 font-black hover:bg-cyan-400 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              ◀ BACK TO DIRECTORY
            </Link>
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-t-8 border-cyan-500 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center">
              <p className="text-green-400 font-mono text-sm mb-2">
                ▶ GAME OVER ◀
              </p>
              <p className="text-cyan-400 text-xs uppercase tracking-wider font-bold">
                © {new Date().getFullYear()} CYBERSEC.DIR // INSERT COIN TO CONTINUE
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export function generateStaticParams() {
  // Generate paths for all services
  return Object.keys(SERVICE_MAP).map((service) => ({
    service,
  }));
}
