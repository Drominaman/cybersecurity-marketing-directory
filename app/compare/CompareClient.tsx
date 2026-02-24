'use client';

import { Agency } from '@/types/agency';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

interface CompareClientProps {
  agencies: Agency[];
}

export default function CompareClient({ agencies }: CompareClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedIds = useMemo(() => {
    const param = searchParams.get('agencies');
    if (!param) return [] as string[];
    return param
      .split(',')
      .map((id) => id.trim())
      .filter((id) => agencies.some((a) => a.id === id));
  }, [searchParams, agencies]);

  const selectedAgencies = useMemo(() => {
    return selectedIds
      .map((id) => agencies.find((a) => a.id === id))
      .filter(Boolean) as Agency[];
  }, [selectedIds, agencies]);

  const updateSelection = useCallback(
    (newIds: string[]) => {
      const params = new URLSearchParams();
      if (newIds.length > 0) {
        params.set('agencies', newIds.join(','));
      }
      const query = params.toString();
      router.replace(`/compare${query ? `?${query}` : ''}`, { scroll: false });
    },
    [router]
  );

  const toggleAgency = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) {
        updateSelection(selectedIds.filter((sid) => sid !== id));
      } else if (selectedIds.length < 3) {
        updateSelection([...selectedIds, id]);
      }
    },
    [selectedIds, updateSelection]
  );

  const clearAll = useCallback(() => {
    updateSelection([]);
  }, [updateSelection]);

  return (
    <div>
      {/* Agency Selector */}
      <div className="bg-gray-900 border-4 border-white p-6 mb-10 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">
              &#9632; SELECT AGENCIES TO COMPARE
            </h2>
            <p className="text-gray-400 font-mono text-sm mt-1">
              {selectedIds.length}/3 SELECTED
            </p>
          </div>
          <div className="flex gap-3">
            {selectedIds.length > 0 && (
              <button
                onClick={clearAll}
                className="bg-black text-white px-4 py-2 font-black uppercase tracking-wider border-2 border-white/40 hover:border-white hover:bg-gray-800 transition-all text-sm"
              >
                CLEAR ALL
              </button>
            )}
            <button
              onClick={() => setSelectorOpen(!selectorOpen)}
              className="bg-white text-black px-6 py-2 font-black uppercase tracking-wider border-4 border-black hover:bg-gray-200 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] text-sm"
            >
              {selectorOpen ? 'HIDE LIST' : 'CHOOSE AGENCIES'}
            </button>
          </div>
        </div>

        {/* Selected agency pills */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedAgencies.map((agency) => (
              <span
                key={agency.id}
                className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 font-bold text-sm border-2 border-black"
              >
                {agency.name}
                <button
                  onClick={() => toggleAgency(agency.id)}
                  className="hover:text-red-600 font-black"
                  aria-label={`Remove ${agency.name}`}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Agency checklist */}
        {selectorOpen && (
          <div className="border-t-2 border-white/20 pt-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-80 overflow-y-auto">
              {agencies.map((agency) => {
                const isSelected = selectedIds.includes(agency.id);
                const isDisabled = !isSelected && selectedIds.length >= 3;
                return (
                  <label
                    key={agency.id}
                    className={`flex items-center gap-3 p-3 border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-white bg-gray-800'
                        : isDisabled
                          ? 'border-white/10 bg-gray-950 opacity-40 cursor-not-allowed'
                          : 'border-white/20 bg-black hover:border-white/50 hover:bg-gray-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => toggleAgency(agency.id)}
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'border-white bg-white' : 'border-white/40'
                      }`}
                    >
                      {isSelected && (
                        <span className="text-black font-black text-xs">&#10003;</span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="text-white font-bold text-sm truncate">
                        {agency.name}
                      </div>
                      <div className="text-gray-500 text-xs font-mono truncate">
                        {agency.location}
                        {agency.rating ? ` | ${agency.rating}/5` : ''}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {selectedAgencies.length === 0 && (
        <div className="bg-gray-900 border-4 border-white p-12 text-center shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
          <div className="text-4xl text-white mb-4 font-mono">&#9632; &#9632; &#9632;</div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-4">
            NO AGENCIES SELECTED
          </h3>
          <p className="text-gray-400 font-mono mb-6 max-w-md mx-auto">
            Select 2-3 agencies above to see a side-by-side comparison of their services,
            ratings, specialties, and more.
          </p>
          <button
            onClick={() => setSelectorOpen(true)}
            className="bg-white text-black px-8 py-4 font-black uppercase tracking-wider border-4 border-black hover:bg-gray-200 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            CHOOSE AGENCIES TO COMPARE
          </button>
        </div>
      )}

      {/* Comparison Table */}
      {selectedAgencies.length > 0 && (
        <div className="bg-gray-900 border-4 border-white overflow-hidden shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead className="bg-black border-b-4 border-white">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-black text-white uppercase tracking-wider sticky left-0 bg-black z-10 min-w-[140px]">
                    &#9632; ATTRIBUTE
                  </th>
                  {selectedAgencies.map((agency) => (
                    <th
                      key={agency.id}
                      className="px-6 py-5 text-center min-w-[220px]"
                    >
                      <div className="font-black text-white uppercase text-lg">
                        {agency.name}
                      </div>
                      {agency.rating && (
                        <div className="text-sm text-gray-300 mt-1 font-mono">
                          &#9733; {agency.rating}/5
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/20">
                {/* Rating */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Rating
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td
                      key={agency.id}
                      className="px-6 py-4 text-center"
                    >
                      {agency.rating ? (
                        <span className="text-white font-black text-lg">
                          {agency.rating}/5
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Location
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td
                      key={agency.id}
                      className="px-6 py-4 text-sm text-gray-300 text-center"
                    >
                      {agency.location || '-'}
                    </td>
                  ))}
                </tr>

                {/* Min Budget */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Min Budget
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td
                      key={agency.id}
                      className="px-6 py-4 text-sm text-gray-300 text-center font-mono"
                    >
                      {agency.minBudget || '-'}
                    </td>
                  ))}
                </tr>

                {/* Year Founded */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Year Founded
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td
                      key={agency.id}
                      className="px-6 py-4 text-sm text-gray-300 text-center"
                    >
                      {agency.yearFounded || '-'}
                    </td>
                  ))}
                </tr>

                {/* Team Size */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Team Size
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td
                      key={agency.id}
                      className="px-6 py-4 text-sm text-gray-300 text-center"
                    >
                      {agency.teamSize || '-'}
                    </td>
                  ))}
                </tr>

                {/* Editor Badges */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Editor Badges
                  </td>
                  {selectedAgencies.map((agency) => {
                    const badges =
                      agency.editorBadges ||
                      (agency.editorBadge ? [agency.editorBadge] : []);
                    return (
                      <td
                        key={agency.id}
                        className="px-6 py-4 text-center"
                      >
                        {badges.length > 0 ? (
                          <div className="flex flex-wrap gap-1 justify-center">
                            {badges.map((badge) => (
                              <span
                                key={badge}
                                className="bg-white text-black px-2 py-1 text-xs font-black uppercase"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Services */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Services
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td key={agency.id} className="px-6 py-4 text-sm text-gray-300">
                      <ul className="text-left space-y-1">
                        {agency.services.map((service) => (
                          <li key={service} className="flex items-start">
                            <span className="text-white mr-2">&#10003;</span>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Specialties */}
                <tr className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 font-mono">
                    Specialties
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td key={agency.id} className="px-6 py-4">
                      {agency.specialties && agency.specialties.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {agency.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="bg-gray-800 border border-white/40 text-gray-300 px-2 py-1 text-xs font-bold"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-center block">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Website + View Profile */}
                <tr className="bg-black">
                  <td className="px-6 py-5 text-sm font-bold text-white uppercase sticky left-0 bg-black font-mono">
                    Links
                  </td>
                  {selectedAgencies.map((agency) => (
                    <td key={agency.id} className="px-6 py-5 text-center">
                      <div className="flex flex-col gap-2 items-center">
                        <Link
                          href={`/agency/${agency.id}`}
                          className="inline-block bg-white text-black px-6 py-2 text-sm font-black hover:bg-gray-200 transition-colors uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                          VIEW PROFILE
                        </Link>
                        <Link
                          href={agency.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white text-xs font-mono underline transition-colors"
                        >
                          {agency.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Helpful tips */}
      {selectedAgencies.length === 1 && (
        <div className="mt-6 bg-gray-900 border-2 border-white/20 p-4 text-center">
          <p className="text-gray-400 font-mono text-sm">
            &#9632; TIP: Select at least one more agency to see a side-by-side comparison.
          </p>
        </div>
      )}
    </div>
  );
}
