import { Agency } from '@/types/agency';
import { getAgencyLogoUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ComparisonTableProps {
  agencies: Agency[];
}

function getBadges(agency: Agency): string[] {
  if (agency.editorBadges && agency.editorBadges.length > 0) return agency.editorBadges;
  if (agency.editorBadge) return [agency.editorBadge];
  return [];
}

function SectionHeader({ label, colSpan }: { label: string; colSpan: number }) {
  return (
    <tr className="bg-black border-t-2 border-white">
      <td
        colSpan={colSpan}
        className="px-6 py-2 text-xs font-mono text-gray-400 uppercase tracking-widest"
      >
        {label}
      </td>
    </tr>
  );
}

export default function ComparisonTable({ agencies }: ComparisonTableProps) {
  if (agencies.length === 0) {
    return null;
  }

  const colCount = agencies.length + 1;

  return (
    <div className="bg-gray-900 border-4 border-white overflow-hidden">
      <p className="md:hidden text-center text-xs font-mono text-gray-400 py-2 border-b border-white/20">
        ← SCROLL HORIZONTALLY →
      </p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black border-b-4 border-white sticky top-0 z-20">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider sticky left-0 bg-black z-10">
                Agency
              </th>
              {agencies.map((agency) => {
                const logoUrl = getAgencyLogoUrl(agency.website);
                return (
                  <th key={agency.id} className="px-6 py-4 text-center min-w-[200px]">
                    {logoUrl && (
                      <div className="flex justify-center mb-2">
                        <Image
                          src={logoUrl}
                          alt={`${agency.name} logo`}
                          width={28}
                          height={28}
                          className="bg-white rounded-sm"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="font-black text-white uppercase">{agency.name}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            {/* ── OVERVIEW ── */}
            <SectionHeader label="Overview" colSpan={colCount} />

            {/* Rating */}
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                Rating
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300 text-center">
                  {agency.rating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{ width: `${(agency.rating / 5) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-white text-sm">{agency.rating}</span>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                Location
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300 text-center">
                  {agency.location || '-'}
                </td>
              ))}
            </tr>

            {/* Geography */}
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                Geography
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300 text-center">
                  {agency.geography || '-'}
                </td>
              ))}
            </tr>

            {/* Min Budget */}
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                Min Budget
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-center">
                  {agency.minBudget ? (
                    <span className="font-mono text-white">{agency.minBudget}</span>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Editor Badges */}
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                Editor Badges
              </td>
              {agencies.map((agency) => {
                const badges = getBadges(agency);
                return (
                  <td key={agency.id} className="px-6 py-4 text-sm text-gray-300 text-center">
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
                      '-'
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Pros */}
            {agencies.some(a => a.pros && a.pros.length > 0) && (
              <tr className="hover:bg-gray-800">
                <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                  Strengths
                </td>
                {agencies.map((agency) => (
                  <td key={agency.id} className="px-6 py-4 text-sm text-gray-300">
                    {agency.pros && agency.pros.length > 0 ? (
                      <ul className="text-left space-y-1">
                        {agency.pros.slice(0, 2).map((pro, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-400 mr-2">+</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      '-'
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* Cons */}
            {agencies.some(a => a.cons && a.cons.length > 0) && (
              <tr className="hover:bg-gray-800">
                <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                  Limitations
                </td>
                {agencies.map((agency) => (
                  <td key={agency.id} className="px-6 py-4 text-sm text-gray-300">
                    {agency.cons && agency.cons.length > 0 ? (
                      <ul className="text-left space-y-1">
                        {agency.cons.slice(0, 2).map((con, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-400 mr-2">−</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      '-'
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* ── CAPABILITIES ── */}
            <SectionHeader label="Capabilities" colSpan={colCount} />

            {/* Services */}
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                Services
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300">
                  <ul className="text-left space-y-1">
                    {agency.services.slice(0, 5).map((service) => (
                      <li key={service} className="flex items-start">
                        <span className="text-white mr-2">✓</span>
                        {service}
                      </li>
                    ))}
                    {agency.services.length > 5 && (
                      <li className="text-gray-500 italic">+{agency.services.length - 5} more</li>
                    )}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Client Types */}
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                Client Types
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300">
                  {agency.clientTypes && agency.clientTypes.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {agency.clientTypes.map((type) => (
                        <span
                          key={type}
                          className="bg-gray-800 border border-white/40 text-gray-300 px-2 py-1 text-xs font-bold"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-center block">-</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Specialties */}
            {agencies.some(a => a.specialties && a.specialties.length > 0) && (
              <tr className="hover:bg-gray-800">
                <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900 z-10">
                  Specialties
                </td>
                {agencies.map((agency) => (
                  <td key={agency.id} className="px-6 py-4 text-sm text-gray-300">
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
                      '-'
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* Website CTA */}
            <tr className="bg-black">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-black z-10">
                Website
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-center">
                  <Link
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-black px-6 py-2 text-sm font-black hover:bg-gray-200 transition-colors uppercase border-2 border-white"
                  >
                    Visit Website
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
