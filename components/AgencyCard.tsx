import { Agency } from '@/types/agency';
import { getAgencyLogoUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface AgencyCardProps {
  agency: Agency;
}

export default function AgencyCard({ agency }: AgencyCardProps) {
  // Support both single badge and multiple badges
  const badges = agency.editorBadges || (agency.editorBadge ? [agency.editorBadge] : []);
  const logoUrl = getAgencyLogoUrl(agency.website);

  return (
    <div className="bg-gray-900 border-4 border-white p-4 sm:p-6 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] transition-all relative">
      {logoUrl && (
        <div className="mb-3 flex items-center gap-3">
          <Image
            src={logoUrl}
            alt={`${agency.name} logo`}
            width={32}
            height={32}
            className="bg-white rounded-sm"
            unoptimized
          />
        </div>
      )}
      {badges.length > 0 && (
        <div className="mb-3">
          {badges.map((badge) => (
            <div
              key={badge}
              className="inline-block bg-gray-800 border border-white/60 text-white px-2 py-1 text-xs font-bold mr-1 mb-1"
            >
              {badge}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-black text-white mb-2 uppercase">{agency.name}</h3>
          <p className="text-gray-300 text-sm mb-3">{agency.shortDescription}</p>
        </div>
        {agency.rating && (
          <div className="border-2 border-white bg-black px-3 py-2 ml-4 flex-shrink-0">
            <div className="text-lg font-black text-white">{agency.rating}</div>
            <div className="text-xs text-gray-300 uppercase font-bold">RATING</div>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4 font-mono text-xs">
        {agency.location && (
          <div className="flex items-center gap-2 text-gray-300">
            <span>■</span>
            <span>{agency.location}</span>
          </div>
        )}

        {agency.teamSize && (
          <div className="flex items-center gap-2 text-gray-300">
            <span>■</span>
            <span>{agency.teamSize}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-xs font-bold text-white mb-2 uppercase tracking-wider">■ SERVICES</div>
        <div className="flex flex-wrap gap-2">
          {agency.services.slice(0, 4).map((service) => (
            <span key={service} className="bg-gray-800 border-2 border-white text-gray-300 px-2 py-1 text-xs font-bold">
              {service}
            </span>
          ))}
          {agency.services.length > 4 && (
            <span className="text-gray-400 text-xs py-1 font-bold">+{agency.services.length - 4}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Link
          href={`/agency/${agency.id}`}
          className="block w-full text-center bg-white border-4 border-white text-black px-3 py-3.5 font-black hover:bg-gray-200 transition-all uppercase text-xs sm:text-sm tracking-wide shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          ■ INFO
        </Link>
        <Link
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-black border-4 border-white text-white px-3 py-3.5 font-black hover:bg-gray-800 transition-all uppercase text-xs sm:text-sm tracking-wide shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          ■ VISIT
        </Link>
      </div>
    </div>
  );
}
