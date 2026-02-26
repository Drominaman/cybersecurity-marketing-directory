import { Agency } from '@/types/agency';
import Link from 'next/link';

interface ComparisonTableProps {
  agencies: Agency[];
}

export default function ComparisonTable({ agencies }: ComparisonTableProps) {
  if (agencies.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 border-4 border-white overflow-hidden">
      <p className="md:hidden text-center text-xs font-mono text-gray-400 py-2 border-b border-white/20">
        ← SCROLL HORIZONTALLY →
      </p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black border-b-4 border-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-black text-white uppercase tracking-wider sticky left-0 bg-black z-10">
                Agency
              </th>
              {agencies.map((agency) => (
                <th key={agency.id} className="px-6 py-4 text-center min-w-[200px]">
                  <div className="font-black text-white uppercase">{agency.name}</div>
                  {agency.rating && (
                    <div className="text-sm text-gray-300 mt-1">★ {agency.rating}</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900">
                Location
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300 text-center">
                  {agency.location || '-'}
                </td>
              ))}
            </tr>

            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900">
                Team Size
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300 text-center">
                  {agency.teamSize || '-'}
                </td>
              ))}
            </tr>

            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900">
                Year Founded
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-300 text-center">
                  {agency.yearFounded || '-'}
                </td>
              ))}
            </tr>

            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900">
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

            {agencies.some(a => a.specialties && a.specialties.length > 0) && (
              <tr className="hover:bg-gray-800">
                <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-gray-900">
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

            <tr className="bg-black">
              <td className="px-6 py-4 text-sm font-bold text-white uppercase sticky left-0 bg-black">
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
