import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllAgencies } from '@/lib/agencies';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agency = getAllAgencies().find(a => a.id === slug);

  if (!agency) {
    return {
      title: 'Agency Not Found',
    };
  }

  const badges = agency.editorBadges || (agency.editorBadge ? [agency.editorBadge] : []);
  const badgeText = badges.length > 0 ? ` - ${badges.join(', ')}` : '';

  return {
    title: `${agency.name} - Cybersecurity Marketing Agency${badgeText}`,
    description: `${agency.name} is a specialized cybersecurity marketing agency${badgeText}. ${agency.shortDescription} Compare with other cybersecurity marketing agencies.`,
    keywords: [
      'cybersecurity marketing agencies',
      agency.name,
      'cybersecurity marketing',
      'security marketing agency',
      ...agency.services,
      ...badges
    ],
    openGraph: {
      title: `${agency.name} - Cybersecurity Marketing Agency`,
      description: `${agency.shortDescription} Part of the cybersecurity marketing agencies directory.`,
      type: 'website',
      url: `https://www.cybersecuritymarketingagencies.com/agency/${slug}`,
    },
    alternates: {
      canonical: `https://www.cybersecuritymarketingagencies.com/agency/${slug}`,
    },
  };
}

export default async function AgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agency = getAllAgencies().find(a => a.id === slug);

  if (!agency) {
    notFound();
  }

  // Get related agencies (same location or similar services)
  const relatedAgencies = getAllAgencies()
    .filter(a => a.id !== agency.id)
    .filter(a => {
      const sameLocation = a.location === agency.location;
      const similarServices = a.services.some(s => agency.services.includes(s));
      return sameLocation || similarServices;
    })
    .slice(0, 3);

  // Get badges for SEO markup
  const badges = agency.editorBadges || (agency.editorBadge ? [agency.editorBadge] : []);

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
        "name": agency.name,
        "item": `https://www.cybersecuritymarketingagencies.com/agency/${slug}`
      }
    ]
  };

  // Schema.org markup for the agency
  const agencySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": agency.name,
    "url": agency.website,
    "description": agency.description,
    "knowsAbout": [
      ...agency.services,
      ...(agency.specialties || []),
      ...(badges.length > 0 ? badges.map(badge => badge.replace('Best for ', '')) : []),
      "Cybersecurity Marketing"
    ],
    ...((badges.length > 0 || (agency.awards && agency.awards.length > 0)) && {
      "award": [
        ...badges,
        ...(agency.awards || []).map(a => `${a.name} ${a.year}${a.status === 'nominated' ? ' (Nominee)' : a.status === 'won' ? ' (Winner)' : ''}`)
      ]
    }),
    "makesOffer": agency.services.map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service,
        "description": `${service} services for cybersecurity companies`
      }
    })),
    ...(agency.rating && {
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Organization",
          "name": "Cybersecurity Marketing Agencies"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": agency.rating,
          "bestRating": "5"
        }
      }
    }),
    ...(agency.location && {
      "address": {
        "@type": "PostalAddress",
        "addressRegion": agency.location
      }
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }}
      />

      <div className="min-h-screen bg-black">
        <SiteNav />

        {/* Header */}
        <header className="bg-gray-950 border-b-8 border-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            {/* Breadcrumbs */}
            <nav className="text-sm font-mono text-gray-300 mb-4">
              <Link href="/" className="hover:text-gray-300">◀ HOME</Link>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-white">{agency.name}</span>
            </nav>

            <div className="flex items-start justify-between">
              <div>
                {agency.featured && agency.editorsPick && (
                  <div className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 font-bold mb-4 uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-2xl">★</span>
                    RECOMMENDED PARTNER
                  </div>
                )}
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4">
                  {agency.name.toUpperCase()}
                </h1>
                <p className="text-gray-300 font-mono text-lg">
                  ■ CYBERSECURITY MARKETING AGENCY
                </p>
              </div>

              {agency.rating && (
                <div className="border-4 border-white bg-black px-8 py-4 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                  <div className="text-4xl font-black text-white">{agency.rating}</div>
                  <div className="text-xs text-gray-300 uppercase tracking-wider font-bold">RATING</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {agency.location && (
              <div className="bg-gray-900 border-4 border-white p-4">
                <div className="text-gray-300 text-xs font-bold uppercase mb-1">REGION</div>
                <div className="text-white font-black text-lg">{agency.location}</div>
              </div>
            )}
            {agency.yearFounded && (
              <div className="bg-gray-900 border-4 border-white p-4">
                <div className="text-gray-300 text-xs font-bold uppercase mb-1">ESTABLISHED</div>
                <div className="text-white font-black text-lg">{agency.yearFounded}</div>
              </div>
            )}
            {agency.teamSize && (
              <div className="bg-gray-900 border-4 border-white p-4">
                <div className="text-gray-300 text-xs font-bold uppercase mb-1">TEAM SIZE</div>
                <div className="text-white font-black text-lg">{agency.teamSize}</div>
              </div>
            )}
          </div>

          {/* Editor's Choice - Only for agencies with badges */}
          {badges.length > 0 && (
            <div className="bg-gray-900 border-2 border-white p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⭐</div>
                <div>
                  <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">
                    Editor's Choice
                  </h2>
                  <p className="text-white text-lg mb-4">
                    We picked {agency.name} as best for:
                  </p>
                  <ul className="space-y-2 text-white text-base">
                    {badges.map(badge => (
                      <li key={badge} className="flex items-center gap-3">
                        <span className="text-white">▶</span>
                        <span><strong>{badge.replace('Best for ', '')}</strong></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Awards */}
          {agency.awards && agency.awards.length > 0 && (
            <div className="bg-gray-900 border-2 border-white p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏅</div>
                <div>
                  <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">
                    Awards & Recognition
                  </h2>
                  <ul className="space-y-3">
                    {agency.awards.map((award, index) => (
                      <li key={index} className="flex items-center gap-3 text-white">
                        <span className="text-white">▶</span>
                        <span>
                          <strong>{award.name}</strong> ({award.year})
                          {award.status === 'nominated' && <span className="ml-2 bg-gray-800 border border-white px-2 py-0.5 text-xs font-bold uppercase">Nominee</span>}
                          {award.status === 'finalist' && <span className="ml-2 bg-gray-800 border border-white px-2 py-0.5 text-xs font-bold uppercase">Finalist</span>}
                          {award.status === 'won' && <span className="ml-2 bg-white text-black px-2 py-0.5 text-xs font-bold uppercase">Winner</span>}
                          {award.url && (
                            <a href={award.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-400 hover:text-white text-sm underline">
                              View
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="bg-gray-900 border-4 border-white p-10 mb-12">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
              ■ AGENCY OVERVIEW
            </h2>
            <p className="text-white text-lg leading-relaxed mb-6">
              {agency.description}
            </p>
            <p className="text-gray-300 text-base mb-4">
              {agency.name} is a specialized cybersecurity marketing agency that helps security companies
              grow their business through strategic marketing initiatives. Based in {agency.location},
              they have {agency.yearFounded ? `been in business since ${agency.yearFounded}` : 'extensive experience'}
              working with cybersecurity vendors, MSSPs, and security service providers.
            </p>
            <p className="text-gray-300 text-base">
              Want to see other options? Check the full{' '}
              <Link href="/" className="text-white hover:text-gray-300 font-bold underline">
                cybersecurity marketing agencies
              </Link>{' '}
              directory to compare {agency.name} with other agencies.
            </p>
          </div>

          {/* Pros & Cons */}
          {agency.pros && agency.cons && (agency.pros.length > 0 || agency.cons.length > 0) && (
            <div className="bg-gray-900 border-4 border-white p-10 mb-12">
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                ■ HONEST ASSESSMENT
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {agency.pros && agency.pros.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-green-400">+</span> Strengths
                    </h3>
                    <ul className="space-y-3">
                      {agency.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-400 mt-0.5 flex-shrink-0">&#9632;</span>
                          <span className="text-gray-300">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {agency.cons && agency.cons.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-red-400">−</span> Limitations
                    </h3>
                    <ul className="space-y-3">
                      {agency.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">&#9632;</span>
                          <span className="text-gray-300">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services */}
          <div className="bg-gray-900 border-4 border-white p-10 mb-12">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
              ■ SERVICES
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Core Services</h3>
                <div className="space-y-2">
                  {agency.services.map((service) => (
                    <div key={service} className="flex items-center gap-3">
                      <span className="text-white text-xl">✓</span>
                      <span className="text-white font-semibold">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {agency.specialties && agency.specialties.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-3">
                    {agency.specialties.map((specialty) => (
                      <span key={specialty} className="bg-gray-800 border-2 border-white px-4 py-2 text-gray-300 font-bold text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Case Studies */}
          {agency.caseStudies && agency.caseStudies.length > 0 && (
            <div className="bg-gray-900 border-4 border-white p-10 mb-12">
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                ■ PROVEN RESULTS
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {agency.caseStudies.map((caseStudy, index) => (
                  <div key={index} className="bg-black border-4 border-white p-6">
                    <div className="font-bold mb-2 text-white uppercase text-lg">
                      🏆 {caseStudy.client}
                    </div>
                    <div className="text-white font-black text-xl mb-3">
                      +{caseStudy.results}
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {caseStudy.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Types */}
          {agency.clientTypes && agency.clientTypes.length > 0 && (
            <div className="bg-gray-900 border-4 border-white p-10 mb-12">
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                ■ TARGET MARKETS
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {agency.clientTypes.map((type) => (
                  <div key={type} className="bg-black border-2 border-white p-4 text-center">
                    <div className="text-gray-300 font-bold">{type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gray-950 border-4 border-white p-10 mb-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4 uppercase">
              ■ READY TO START?
            </h2>
            <p className="text-white text-lg mb-8">
              Visit {agency.name} to learn more about their cybersecurity marketing services
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={agency.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                ■ VISIT WEBSITE
              </Link>
              <Link
                href="/"
                className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                ◀ BACK TO DIRECTORY
              </Link>
            </div>
          </div>

          {/* Related Agencies */}
          {relatedAgencies.length > 0 && (
            <div className="bg-gray-900 border-4 border-white p-10">
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
                ■ SIMILAR AGENCIES
              </h2>
              <p className="text-gray-300 mb-8">
                Other{' '}
                <Link href="/" className="text-white hover:text-gray-300 font-bold underline">
                  cybersecurity marketing agencies
                </Link>{' '}
                with similar services or location:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedAgencies.map((related) => (
                  <Link
                    key={related.id}
                    href={`/agency/${related.id}`}
                    className="bg-black border-2 border-white p-6 hover:border-gray-400 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all group"
                  >
                    <h3 className="text-xl font-black text-white mb-2 uppercase group-hover:text-gray-300">
                      {related.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">{related.shortDescription}</p>
                    <div className="text-gray-300 font-bold text-sm">
                      {related.location} • {related.rating && `${related.rating} ★`}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </main>

        <SiteFooter />
      </div>
    </>
  );
}

export function generateStaticParams() {
  return getAllAgencies().map((agency) => ({
    slug: agency.id,
  }));
}
