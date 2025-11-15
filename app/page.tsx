'use client';

import { useState } from 'react';
import Script from 'next/script';
import AgencyCard from '@/components/AgencyCard';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { getAllAgencies } from '@/lib/agencies';

export default function Home() {
  const allAgencies = getAllAgencies();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Get all unique services
  const allServices = Array.from(
    new Set(allAgencies.flatMap(a => a.services))
  ).sort();

  // Schema.org structured data for ItemList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cybersecurity Marketing Agencies Directory",
    "description": "The ultimate directory of specialized cybersecurity marketing agencies offering SEO, AI Visibility, content marketing, PPC, PR, and demand generation services for security companies.",
    "numberOfItems": getAllAgencies().length,
    "itemListElement": getAllAgencies().map((agency, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": agency.name,
        "description": agency.description,
        "url": agency.website,
        ...(agency.rating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": agency.rating,
            "bestRating": "5"
          }
        })
      }
    }))
  };

  // WebSite schema for better search appearance
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cybersecurity Marketing Agencies",
    "url": "https://cybersecuritymarketingagencies.com",
    "description": "The ultimate directory of specialized cybersecurity marketing agencies. Find the best cybersecurity marketing agencies for AI Visibility, SEO, content marketing, and PR.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://cybersecuritymarketingagencies.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Filter agencies
  const filteredAgencies = allAgencies.filter(agency => {
    const matchesSearch = searchTerm === '' ||
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = selectedService === '' ||
      agency.services.includes(selectedService);

    return matchesSearch && matchesService;
  });

  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-b-8 border-cyan-500 relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)'}}>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-sm font-mono text-green-400 mb-4">► CYBERSEC.DIR v1.0</div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-magenta-500 tracking-wider mb-4" style={{textShadow: '3px 3px 0px rgba(0,0,0,0.5)'}}>
            CYBERSECURITY MARKETING AGENCIES 2026
          </h1>
          <div className="flex items-center gap-4 text-yellow-400 font-mono">
            <span className="animate-pulse">▶</span>
            <p className="text-base md:text-lg">
              The ultimate directory of specialized cybersecurity marketing agencies
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Introduction Section - Keyword Rich */}
        <div className="mb-12 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-4 border-cyan-500 p-8">
          <h2 className="text-3xl font-black text-cyan-400 mb-6 uppercase tracking-wider">
            ► Find the Best Cybersecurity Marketing Agencies
          </h2>
          <div className="text-white space-y-4 text-lg leading-relaxed">
            <p>
              This is a directory of cybersecurity marketing agencies for 2026. If you run a cybersecurity startup, MSSP, or enterprise security vendor, you need a marketing partner who gets your space. These agencies specialize in SEO, AI Visibility, content marketing, PPC, PR, and demand generation for security companies.
            </p>
            <p>
              Marketing security products is hard. You're dealing with complex tech, long sales cycles, and technical buyers. The cybersecurity marketing agencies here have done it before and know what works in 2026.
            </p>
            <p className="text-yellow-400 font-bold">
              ► Browse the directory below and find the right partner for your security company.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 bg-gray-900 border-4 border-green-500 p-8 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
          <h2 className="text-2xl font-black text-green-400 mb-6 uppercase tracking-wider">
            ► CHARACTER SELECT
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="search" className="block text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider font-mono">
                → SEARCH DATABASE
              </label>
              <input
                id="search"
                type="text"
                placeholder="ENTER QUERY..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-4 border-cyan-500 focus:border-magenta-500 outline-none bg-black text-green-400 font-mono placeholder-gray-600"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-xs font-bold text-magenta-400 mb-2 uppercase tracking-wider font-mono">
                → FILTER BY SKILL
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 border-4 border-magenta-500 focus:border-cyan-500 outline-none bg-black text-magenta-400 font-mono font-bold"
              >
                <option value="">ALL ABILITIES</option>
                {allServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>
          {(searchTerm || selectedService) && (
            <div className="mt-4 text-sm text-yellow-400 font-bold font-mono animate-pulse">
              ▶ {filteredAgencies.length} RESULTS FOUND
            </div>
          )}
        </div>

        {/* Agency Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="text-center py-12 bg-gray-900 border-4 border-red-500">
            <p className="text-red-500 text-lg font-black animate-pulse">⚠ NO MATCHES FOUND ⚠</p>
            <p className="text-cyan-400 font-mono text-sm mt-2">TRY DIFFERENT SEARCH PARAMETERS</p>
          </div>
        )}

        {/* Comparison Table */}
        {getAllAgencies().length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-black text-green-400 mb-4 uppercase tracking-wider">
              ► STATS COMPARISON
            </h2>
            <p className="text-cyan-400 mb-4 font-mono">
              COMPARE ALL PLAYER ATTRIBUTES AND ABILITIES
            </p>
            <p className="text-gray-300 mb-10">
              Compare all cybersecurity marketing agencies side-by-side.
            </p>
            <ComparisonTable agencies={getAllAgencies()} />
          </div>
        )}

        {/* SEO Content Section */}
        <div className="mt-20 prose prose-lg max-w-none">
          <div className="bg-gray-900 border-4 border-yellow-500 p-10">
            <h2 className="text-3xl font-black text-yellow-400 mb-6 uppercase tracking-wider">
              ► How to Choose the Best Cybersecurity Marketing Agencies
            </h2>
            <div className="text-white space-y-6 text-base">
              <p>
                Picking the right cybersecurity marketing agency matters. Security products are technical, the sales cycles are long, and you need someone who's worked in this space before. Here's what to look for:
              </p>

              <h3 className="text-xl font-black text-cyan-400 mt-8 mb-4 uppercase tracking-wider border-b-2 border-cyan-500 pb-2">
                → PLAYER STATS TO CHECK
              </h3>

              <ul className="space-y-3 list-none pl-0">
                <li className="text-gray-300">
                  <strong className="text-yellow-400">▶ XP LEVEL:</strong> Agencies with proven cybersecurity marketing battle experience.
                  They must understand technical specs, compliance missions, and buyer personas.
                </li>
                <li className="text-gray-300">
                  <strong className="text-yellow-400">▶ SKILL SET:</strong> Verify they have unlocked the abilities you need:
                  SEO, content, PPC, PR, or full-service power-ups.
                </li>
                <li className="text-gray-300">
                  <strong className="text-yellow-400">▶ ACHIEVEMENTS:</strong> Review their high scores with other security companies.
                  Look for concrete wins: lead gen combos, traffic multipliers, brand boosts.
                </li>
                <li className="text-gray-300">
                  <strong className="text-yellow-400">▶ TECH KNOWLEDGE:</strong> Must translate complex security code into messages
                  that reach both tech wizards and business bosses.
                </li>
                <li className="text-gray-300">
                  <strong className="text-yellow-400">▶ COIN COST:</strong> Different players serve different difficulty levels.
                  Match their pricing to your wallet and expected loot drops.
                </li>
              </ul>

              <h3 className="text-xl font-black text-cyan-400 mt-8 mb-4 uppercase tracking-wider border-b-2 border-magenta-500 pb-2">
                → STANDARD POWER-UP INVENTORY
              </h3>

              <ul className="space-y-2 list-none pl-0 border-l-4 border-green-500 pl-6">
                <li className="text-gray-300">▶ Search Engine Optimization (SEO) for security keywords</li>
                <li className="text-gray-300">▶ Content marketing and thought leadership missions</li>
                <li className="text-gray-300">▶ Pay-per-click (PPC) advertising on Google and LinkedIn</li>
                <li className="text-gray-300">▶ Public relations and media raid campaigns</li>
                <li className="text-gray-300">▶ Account-based marketing (ABM) for enterprise boss battles</li>
                <li className="text-gray-300">▶ Social media guild management</li>
                <li className="text-gray-300">▶ Website forge and development</li>
                <li className="text-gray-300">▶ Marketing automation and lead farming</li>
              </ul>

              <p className="mt-8 text-white font-semibold border-t-2 border-yellow-500 pt-6">
                <span className="text-yellow-400">►</span> Every agency here has worked with security companies. Compare them, check their case studies, and pick the one that fits your budget and needs.
              </p>
            </div>
          </div>
        </div>

        {/* Location Links for GEO SEO */}
        <div className="bg-gray-900 border-4 border-cyan-500 p-10 mt-20">
          <h2 className="text-3xl font-black text-cyan-400 mb-8 uppercase tracking-wider">
            ► BROWSE BY REGION
          </h2>
          <p className="text-gray-300 mb-6">
            Filter by region if you want an agency that knows your local market.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/location/usa"
              className="bg-black border-2 border-green-500 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] group"
            >
              <div className="text-green-400 font-black text-lg group-hover:text-green-300">
                ► UNITED STATES
              </div>
              <div className="text-gray-400 text-sm mt-1">View US agencies</div>
            </Link>

            <Link
              href="/location/europe"
              className="bg-black border-2 border-magenta-500 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] group"
            >
              <div className="text-magenta-400 font-black text-lg group-hover:text-magenta-300">
                ► EUROPE
              </div>
              <div className="text-gray-400 text-sm mt-1">View European agencies</div>
            </Link>

            <Link
              href="/location/uk"
              className="bg-black border-2 border-yellow-500 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] group"
            >
              <div className="text-yellow-400 font-black text-lg group-hover:text-yellow-300">
                ► UNITED KINGDOM
              </div>
              <div className="text-gray-400 text-sm mt-1">View UK agencies</div>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
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
