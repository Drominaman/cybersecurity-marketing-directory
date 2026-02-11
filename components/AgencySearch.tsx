'use client';

import { useState } from 'react';
import AgencyCard from '@/components/AgencyCard';
import { Agency } from '@/types/agency';

interface AgencySearchProps {
  agencies: Agency[];
  allServices: string[];
}

export default function AgencySearch({ agencies, allServices }: AgencySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = searchTerm === '' ||
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = selectedService === '' ||
      agency.services.includes(selectedService);

    return matchesSearch && matchesService;
  });

  return (
    <>
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
    </>
  );
}
