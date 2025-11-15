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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10">
                Agency
              </th>
              {agencies.map((agency) => (
                <th key={agency.id} className="px-6 py-4 text-center min-w-[200px]">
                  <div className="font-bold text-gray-900">{agency.name}</div>
                  {agency.rating && (
                    <div className="text-sm text-blue-600 mt-1">★ {agency.rating}</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Location
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-700 text-center">
                  {agency.location || '-'}
                </td>
              ))}
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Team Size
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-700 text-center">
                  {agency.teamSize || '-'}
                </td>
              ))}
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Year Founded
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-700 text-center">
                  {agency.yearFounded || '-'}
                </td>
              ))}
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Services
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-sm text-gray-700">
                  <ul className="text-left space-y-1">
                    {agency.services.slice(0, 5).map((service) => (
                      <li key={service} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
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
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  Specialties
                </td>
                {agencies.map((agency) => (
                  <td key={agency.id} className="px-6 py-4 text-sm text-gray-700">
                    {agency.specialties && agency.specialties.length > 0 ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {agency.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
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

            <tr className="bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-gray-50">
                Website
              </td>
              {agencies.map((agency) => (
                <td key={agency.id} className="px-6 py-4 text-center">
                  <Link
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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
