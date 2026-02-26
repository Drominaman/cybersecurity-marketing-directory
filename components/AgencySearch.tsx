'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AgencyCard from '@/components/AgencyCard';
import { Agency } from '@/types/agency';

const MARKET_FILTERS = [
  { value: '', label: 'ALL MARKETS', keywords: [] },
  { value: 'usa', label: 'USA', keywords: ['USA', 'United States', 'America', 'US', 'California', 'New York', 'San Diego', 'Irvine', 'Sacramento', 'NYC', 'NY', 'CA'] },
  { value: 'europe', label: 'EUROPE', keywords: ['Europe', 'European', 'EU', 'DACH', 'Germany', 'France', 'Netherlands'] },
  { value: 'uk', label: 'UK', keywords: ['UK', 'United Kingdom', 'London', 'Britain'] },
  { value: 'global', label: 'GLOBAL', keywords: ['Global'] },
];

interface AgencySearchProps {
  agencies: Agency[];
  allServices: string[];
}

function AgencySearchInner({ agencies, allServices }: AgencySearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || '');
  const [selectedMarket, setSelectedMarket] = useState(searchParams.get('market') || '');

  const updateURL = useCallback((q: string, service: string, market: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (service) params.set('service', service);
    if (market) params.set('market', market);
    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : window.location.pathname, { scroll: false });
  }, [router]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    updateURL(value, selectedService, selectedMarket);
  }, [selectedService, selectedMarket, updateURL]);

  const handleServiceChange = useCallback((value: string) => {
    setSelectedService(value);
    updateURL(searchTerm, value, selectedMarket);
  }, [searchTerm, selectedMarket, updateURL]);

  const handleMarketChange = useCallback((value: string) => {
    setSelectedMarket(value);
    updateURL(searchTerm, selectedService, value);
  }, [searchTerm, selectedService, updateURL]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedService('');
    setSelectedMarket('');
    updateURL('', '', '');
  }, [updateURL]);

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = searchTerm === '' ||
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = selectedService === '' ||
      agency.services.includes(selectedService);

    let matchesMarket = true;
    if (selectedMarket !== '') {
      const marketFilter = MARKET_FILTERS.find(m => m.value === selectedMarket);
      if (marketFilter) {
        const locationMatch = marketFilter.keywords.some(keyword =>
          agency.location.toLowerCase().includes(keyword.toLowerCase())
        );
        const isGlobalRecommended = agency.geography?.startsWith('Global') && agency.recommended;
        matchesMarket = locationMatch || !!isGlobalRecommended;
      }
    }

    return matchesSearch && matchesService && matchesMarket;
  });

  const hasActiveFilters = searchTerm !== '' || selectedService !== '' || selectedMarket !== '';

  return (
    <>
      {/* Search and Filter */}
      <div className="mb-12 bg-gray-900 border-4 border-white p-4 sm:p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-6 uppercase tracking-wider">
          ■ SEARCH DIRECTORY
        </h2>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label htmlFor="search" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
              ■ SEARCH DATABASE
            </label>
            <input
              id="search"
              type="text"
              placeholder="ENTER QUERY..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600"
            />
          </div>
          <div>
            <label htmlFor="service" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
              ■ FILTER BY SERVICE
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono font-bold"
            >
              <option value="">ALL SERVICES</option>
              {allServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="market" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
              ■ FILTER BY MARKET
            </label>
            <select
              id="market"
              value={selectedMarket}
              onChange={(e) => handleMarketChange(e.target.value)}
              className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono font-bold"
            >
              {MARKET_FILTERS.map(market => (
                <option key={market.value} value={market.value}>{market.label}</option>
              ))}
            </select>
          </div>
        </div>
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-white font-bold font-mono animate-pulse">
              ■ {filteredAgencies.length} RESULTS FOUND
            </div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 border-2 border-white bg-black text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              ■ CLEAR FILTERS
            </button>
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
        <div className="text-center py-12 bg-gray-900 border-4 border-white">
          <p className="text-white text-lg font-black animate-pulse">⚠ NO MATCHES FOUND ⚠</p>
          <p className="text-gray-300 font-mono text-sm mt-2">TRY DIFFERENT SEARCH PARAMETERS</p>
        </div>
      )}
    </>
  );
}

export default function AgencySearch({ agencies, allServices }: AgencySearchProps) {
  return (
    <Suspense fallback={null}>
      <AgencySearchInner agencies={agencies} allServices={allServices} />
    </Suspense>
  );
}
