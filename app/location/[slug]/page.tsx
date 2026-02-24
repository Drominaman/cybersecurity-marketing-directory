import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import AgencyCard from '@/components/AgencyCard';
import { getAllAgencies } from '@/lib/agencies';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import type { Metadata } from 'next';

const locations = {
  'usa': { name: 'United States', keywords: ['USA', 'United States', 'America', 'US'] },
  'europe': { name: 'Europe', keywords: ['Europe', 'European', 'EU'] },
  'uk': { name: 'United Kingdom', keywords: ['UK', 'United Kingdom', 'London', 'Britain'] },
  'california': { name: 'California', keywords: ['California', 'CA', 'San Diego', 'Irvine', 'Sacramento'] },
  'new-york': { name: 'New York', keywords: ['New York', 'NY', 'NYC'] },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locations[slug as keyof typeof locations];

  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `Cybersecurity Marketing Agencies in ${location.name} - Directory 2026`,
    description: `Find the best cybersecurity marketing agencies in ${location.name}. Compare specialized security marketing firms for SEO, AI Visibility, content marketing, and PR services.`,
    keywords: [
      'cybersecurity marketing agencies',
      `cybersecurity marketing ${location.name}`,
      `security marketing agency ${location.name}`,
      'cybersecurity SEO',
      'cybersecurity content marketing',
    ],
    openGraph: {
      title: `Cybersecurity Marketing Agencies in ${location.name}`,
      description: `Find the best cybersecurity marketing agencies in ${location.name}. Compare specialized security marketing firms.`,
      type: 'website',
      url: `https://www.cybersecuritymarketingagencies.com/location/${slug}`,
    },
    alternates: {
      canonical: `https://www.cybersecuritymarketingagencies.com/location/${slug}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations[slug as keyof typeof locations];

  if (!location) {
    notFound();
  }

  // Get local agencies
  const localAgencies = getAllAgencies().filter(agency =>
    location.keywords.some(keyword =>
      agency.location.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  // Get global/recommended agencies that serve all regions
  const globalAgencies = getAllAgencies().filter(agency =>
    agency.geography === "Global" && agency.recommended
  );

  const totalAgencies = localAgencies.length + globalAgencies.length;

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
        "name": `Agencies in ${location.name}`,
        "item": `https://www.cybersecuritymarketingagencies.com/location/${slug}`
      }
    ]
  };

  const allAgencies = [...localAgencies, ...globalAgencies];

  // Collection schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Cybersecurity Marketing Agencies in ${location.name}`,
    "description": `Top-rated cybersecurity marketing agencies serving ${location.name}`,
    "url": `https://www.cybersecuritymarketingagencies.com/location/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allAgencies.length,
      "itemListElement": allAgencies.map((agency, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": agency.name,
          "url": agency.website,
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-black">
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

      <SiteNav />

      <header className="bg-gray-950 border-b-8 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-sm font-mono text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-300">■ HOME</Link>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-white">{location.name.toUpperCase()}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4">
            {location.name.toUpperCase()}
          </h1>
          <p className="text-gray-300 font-mono">
            ■ CYBERSECURITY MARKETING AGENCIES SERVING {location.name.toUpperCase()}
          </p>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-white mb-4 uppercase">
            ■ {totalAgencies} AGENCIES AVAILABLE
          </h2>
          <p className="text-white mb-4">
            These{' '}
            <Link href="/" className="text-white hover:text-gray-300 font-bold underline">
              cybersecurity marketing agencies
            </Link>{' '}
            serve clients in {location.name}. Includes both local agencies and global firms with international capabilities.
          </p>
          <p className="text-gray-300">
            Want more options? Check the full{' '}
            <Link href="/" className="text-white hover:text-gray-300 font-bold underline">
              cybersecurity marketing agencies
            </Link>{' '}
            directory to see all regions.
          </p>
        </div>

        {/* Global/Recommended Agencies Section */}
        {globalAgencies.length > 0 && (
          <div className="mb-16">
            <div className="bg-gray-900 border-4 border-white p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⭐</span>
                <h3 className="text-3xl font-black text-white uppercase tracking-wider">
                  TOP RECOMMENDED - SERVES {location.name.toUpperCase()}
                </h3>
              </div>
              <p className="text-gray-300 text-lg">
                These global agencies work with clients in {location.name} and worldwide
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        )}

        {/* Local Agencies Section */}
        {localAgencies.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-black text-white mb-6 uppercase">
              ■ LOCAL AGENCIES IN {location.name.toUpperCase()}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        )}

        {totalAgencies === 0 && (
          <div className="text-center py-12 bg-gray-900 border-4 border-white">
            <p className="text-white text-lg font-black">⚠ NO AGENCIES FOUND ⚠</p>
            <p className="text-gray-400 font-mono text-sm mt-2">CHECK MAIN DIRECTORY FOR ALL LOCATIONS</p>
          </div>
        )}

        <div className="bg-gray-900 border-4 border-white p-10 mt-12">
          <h3 className="text-2xl font-black text-white mb-4 uppercase">
            ■ ABOUT {location.name.toUpperCase()} CYBERSECURITY MARKET
          </h3>
          <div className="text-white space-y-4">
            <p>
              Cybersecurity is growing in {location.name}. More threats, more regulations, more demand for security products. The{' '}
              <Link href="/" className="text-white hover:text-gray-300 font-bold underline">
                cybersecurity marketing agencies
              </Link>{' '}
              here know how to reach security buyers in the region.
            </p>
            <p>
              When picking from{' '}
              <Link href="/" className="text-white hover:text-gray-300 font-bold underline">
                cybersecurity marketing agencies
              </Link>{' '}
              in {location.name}, check:
            </p>
            <ul className="list-none space-y-2 text-gray-300">
              <li className="text-gray-300"><span className="text-white">■</span> Do they know the local market?</li>
              <li className="text-gray-300"><span className="text-white">■</span> Experience with regional compliance (GDPR, etc.)?</li>
              <li className="text-gray-300"><span className="text-white">■</span> Understand local buyer behavior?</li>
              <li className="text-gray-300"><span className="text-white">■</span> Past work with security companies?</li>
            </ul>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(locations).map((slug) => ({
    slug: slug,
  }));
}
