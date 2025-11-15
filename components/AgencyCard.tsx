import { Agency } from '@/types/agency';
import Link from 'next/link';

interface AgencyCardProps {
  agency: Agency;
}

export default function AgencyCard({ agency }: AgencyCardProps) {
  // Support both single badge and multiple badges
  const badges = agency.editorBadges || (agency.editorBadge ? [agency.editorBadge] : []);

  return (
    <div className="bg-gray-900 border-4 border-cyan-500 p-6 hover:border-magenta-500 hover:shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] transition-all relative">
      {badges.length > 0 && (
        <div className="mb-3">
          {badges.map((badge) => (
            <div
              key={badge}
              className="inline-block bg-yellow-900/40 border border-yellow-600/60 text-yellow-300 px-2 py-1 text-xs font-bold mr-1 mb-1"
            >
              {badge}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-black text-cyan-400 mb-2 uppercase">{agency.name}</h3>
          <p className="text-gray-300 text-sm mb-3">{agency.shortDescription}</p>
        </div>
        {agency.rating && (
          <div className="border-2 border-yellow-400 bg-black px-3 py-2 ml-4 flex-shrink-0">
            <div className="text-lg font-black text-yellow-400">{agency.rating}</div>
            <div className="text-xs text-cyan-400 uppercase font-bold">LVL</div>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4 font-mono text-xs">
        {agency.location && (
          <div className="flex items-center gap-2 text-magenta-400">
            <span>▶</span>
            <span>{agency.location}</span>
          </div>
        )}

        {agency.teamSize && (
          <div className="flex items-center gap-2 text-cyan-400">
            <span>👥</span>
            <span>{agency.teamSize} units</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider">► POWER-UPS</div>
        <div className="flex flex-wrap gap-2">
          {agency.services.slice(0, 4).map((service) => (
            <span key={service} className="bg-blue-900 border-2 border-cyan-500 text-cyan-300 px-2 py-1 text-xs font-bold">
              {service}
            </span>
          ))}
          {agency.services.length > 4 && (
            <span className="text-green-400 text-xs py-1 font-bold">+{agency.services.length - 4}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href={`/agency/${agency.id}`}
          className="block w-full text-center bg-cyan-600 border-4 border-cyan-400 text-white px-3 py-3 font-black hover:bg-cyan-500 transition-all uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          ► INFO
        </Link>
        <Link
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-magenta-600 border-4 border-magenta-400 text-white px-3 py-3 font-black hover:bg-magenta-500 transition-all uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          ► VISIT
        </Link>
      </div>
    </div>
  );
}
