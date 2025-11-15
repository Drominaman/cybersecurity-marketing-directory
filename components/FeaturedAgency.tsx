import { Agency } from '@/types/agency';
import Link from 'next/link';

interface FeaturedAgencyProps {
  agency: Agency;
}

export default function FeaturedAgency({ agency }: FeaturedAgencyProps) {
  return (
    <div className="bg-black border-4 border-green-500 p-8 md:p-12 mb-12 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-500 text-black px-4 py-2 font-bold mb-4 uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-2xl">★</span>
            PLAYER 1 SELECT
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 text-green-500 tracking-wider" style={{textShadow: '4px 4px 0px #000'}}>{agency.name}</h2>
          <div className="flex items-center gap-4 text-cyan-400 mb-4 text-sm font-mono">
            {agency.location && (
              <span className="flex items-center gap-1">
                <span className="text-lg">▶</span>
                {agency.location}
              </span>
            )}
            {agency.yearFounded && (
              <span>EST {agency.yearFounded}</span>
            )}
            {agency.teamSize && (
              <span>{agency.teamSize} UNITS</span>
            )}
          </div>
        </div>
        {agency.rating && (
          <div className="border-4 border-magenta-500 bg-black px-5 py-3 text-center shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]">
            <div className="text-3xl font-black text-magenta-500">{agency.rating}</div>
            <div className="text-xs text-cyan-400 uppercase tracking-wider font-bold">SCORE</div>
          </div>
        )}
      </div>

      <p className="text-base text-white mb-8 leading-relaxed border-l-4 border-cyan-500 pl-4">
        {agency.description}
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-cyan-400 mb-3 text-sm uppercase tracking-wider">► ABILITIES</h3>
          <div className="flex flex-wrap gap-2">
            {agency.services.map((service) => (
              <span key={service} className="bg-blue-900 border-2 border-cyan-400 px-3 py-1.5 text-xs text-cyan-300 font-bold uppercase">
                {service}
              </span>
            ))}
          </div>
        </div>

        {agency.specialties && (
          <div>
            <h3 className="font-bold text-magenta-400 mb-3 text-sm uppercase tracking-wider">► SPECIALTIES</h3>
            <div className="flex flex-wrap gap-2">
              {agency.specialties.map((specialty) => (
                <span key={specialty} className="bg-purple-900 border-2 border-magenta-400 px-3 py-1.5 text-xs text-magenta-300 font-bold uppercase">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {agency.caseStudies && agency.caseStudies.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-yellow-400 mb-4 text-sm uppercase tracking-wider">► ACHIEVEMENTS UNLOCKED</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {agency.caseStudies.map((caseStudy, index) => (
              <div key={index} className="bg-gray-900 border-4 border-yellow-500 p-5">
                <div className="font-bold mb-2 text-yellow-400 uppercase text-sm">🏆 {caseStudy.client}</div>
                <div className="text-green-400 font-bold mb-2">+{caseStudy.results}</div>
                <div className="text-sm text-gray-300">{caseStudy.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <Link
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-black px-8 py-4 font-black hover:bg-green-400 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          ► START
        </Link>
        {agency.minBudget && (
          <div className="border-4 border-cyan-500 bg-black px-6 py-4 flex items-center gap-2 font-mono">
            <span className="text-cyan-400 text-xs uppercase font-bold">COINS:</span>
            <span className="font-black text-yellow-400">{agency.minBudget}</span>
          </div>
        )}
      </div>
    </div>
  );
}
