import { notFound } from 'next/navigation';
import Link from 'next/link';
import AgencyCard from '@/components/AgencyCard';
import { getAllAgencies } from '@/lib/agencies';
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

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-b-8 border-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="text-green-400 font-mono text-sm mb-4 inline-block hover:text-cyan-400">
            ◀ BACK TO MAIN MENU
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-magenta-500 tracking-wider mb-4">
            {location.name.toUpperCase()}
          </h1>
          <p className="text-yellow-400 font-mono">
            ► CYBERSECURITY MARKETING AGENCIES SERVING {location.name.toUpperCase()}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-cyan-400 mb-4 uppercase">
            ► {totalAgencies} AGENCIES AVAILABLE
          </h2>
          <p className="text-white mb-4">
            These{' '}
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
              cybersecurity marketing agencies
            </Link>{' '}
            serve clients in {location.name}. Includes both local agencies and global firms with international capabilities.
          </p>
          <p className="text-gray-300">
            Want more options? Check the full{' '}
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
              cybersecurity marketing agencies
            </Link>{' '}
            directory to see all regions.
          </p>
        </div>

        {/* Global/Recommended Agencies Section */}
        {globalAgencies.length > 0 && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border-4 border-yellow-500 p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⭐</span>
                <h3 className="text-3xl font-black text-yellow-400 uppercase tracking-wider">
                  TOP RECOMMENDED - SERVES {location.name.toUpperCase()}
                </h3>
              </div>
              <p className="text-yellow-300 text-lg">
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
            <h3 className="text-2xl font-black text-cyan-400 mb-6 uppercase">
              ► LOCAL AGENCIES IN {location.name.toUpperCase()}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        )}

        {totalAgencies === 0 && (
          <div className="text-center py-12 bg-gray-900 border-4 border-red-500">
            <p className="text-red-500 text-lg font-black">⚠ NO AGENCIES FOUND ⚠</p>
            <p className="text-cyan-400 font-mono text-sm mt-2">CHECK MAIN DIRECTORY FOR ALL LOCATIONS</p>
          </div>
        )}

        <div className="bg-gray-900 border-4 border-yellow-500 p-10 mt-12">
          <h3 className="text-2xl font-black text-yellow-400 mb-4 uppercase">
            ► ABOUT {location.name.toUpperCase()} CYBERSECURITY MARKET
          </h3>
          <div className="text-white space-y-4">
            <p>
              Cybersecurity is growing in {location.name}. More threats, more regulations, more demand for security products. The{' '}
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
                cybersecurity marketing agencies
              </Link>{' '}
              here know how to reach security buyers in the region.
            </p>
            <p>
              When picking from{' '}
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
                cybersecurity marketing agencies
              </Link>{' '}
              in {location.name}, check:
            </p>
            <ul className="list-none space-y-2 text-gray-300">
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Do they know the local market?</li>
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Experience with regional compliance (GDPR, etc.)?</li>
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Understand local buyer behavior?</li>
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Past work with security companies?</li>
            </ul>
          </div>
        </div>
      </main>

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
  );
}

export function generateStaticParams() {
  return Object.keys(locations).map((slug) => ({
    slug: slug,
  }));
}
