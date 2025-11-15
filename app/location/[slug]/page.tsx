import { notFound } from 'next/navigation';
import Link from 'next/link';
import AgencyCard from '@/components/AgencyCard';
import { getAllAgencies } from '@/lib/agencies';

const locations = {
  'usa': { name: 'United States', keywords: ['USA', 'United States', 'America', 'US'] },
  'europe': { name: 'Europe', keywords: ['Europe', 'European', 'EU'] },
  'uk': { name: 'United Kingdom', keywords: ['UK', 'United Kingdom', 'London', 'Britain'] },
  'california': { name: 'California', keywords: ['California', 'CA', 'San Diego', 'Irvine', 'Sacramento'] },
  'new-york': { name: 'New York', keywords: ['New York', 'NY', 'NYC'] },
};

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations[slug as keyof typeof locations];

  if (!location) {
    notFound();
  }

  const agencies = getAllAgencies().filter(agency =>
    location.keywords.some(keyword =>
      agency.location.toLowerCase().includes(keyword.toLowerCase())
    )
  );

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
            ► CYBERSECURITY MARKETING AGENCIES IN {location.name.toUpperCase()}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-cyan-400 mb-4 uppercase">
            ► {agencies.length} AGENCIES FOUND
          </h2>
          <p className="text-white mb-8">
            Browse top-rated cybersecurity marketing agencies serving {location.name}.
            These specialized firms understand the unique challenges of marketing security products and services
            to businesses in the {location.name} market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {agencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>

        {agencies.length === 0 && (
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
              The cybersecurity industry in {location.name} continues to grow rapidly, driven by increasing
              cyber threats and regulatory requirements. Marketing agencies specializing in this sector
              understand the unique challenges of reaching security decision-makers.
            </p>
            <p>
              When selecting a cybersecurity marketing agency in {location.name}, consider their:
            </p>
            <ul className="list-none space-y-2 text-gray-300">
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Local market knowledge and connections</li>
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Experience with regional compliance requirements</li>
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Understanding of local buyer behavior</li>
              <li className="text-gray-300"><span className="text-yellow-400">▶</span> Track record with cybersecurity clients</li>
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
