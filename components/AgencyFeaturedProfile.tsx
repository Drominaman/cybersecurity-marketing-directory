import Image from 'next/image';
import Link from 'next/link';
import { Agency } from '@/types/agency';
import { getAgencyLogoUrl } from '@/lib/utils';

/**
 * Full "Featured" profile for a featured agency, shown expanded. Visibility is
 * controlled by the caller (the intro "Read more" reveals it), so there is no
 * internal toggle. A labelled featured placement, not a ranking.
 */
export default function AgencyFeaturedProfile({ agency }: { agency: Agency }) {
  const logoUrl = getAgencyLogoUrl(agency.website);

  const facts: [string, string][] = [];
  if (agency.yearFounded) facts.push(['Founded', String(agency.yearFounded)]);
  if (agency.location) facts.push(['Location', agency.location]);
  if (agency.teamSize) facts.push(['Team', agency.teamSize]);
  if (agency.minBudget) facts.push(['Min budget', agency.minBudget]);

  const tagRow = (label: string, items: string[]) => (
    <div>
      <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">■ {label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s} className="bg-gray-800 border-2 border-white text-gray-300 px-2 py-1 text-xs font-bold">{s}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 border-4 border-yellow-300 p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(253,224,71,0.3)]">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="inline-block bg-yellow-300 text-black border-2 border-black px-2 py-1 text-xs font-black uppercase tracking-wider">■ Featured Partner</span>
        <span className="text-gray-500 text-xs font-mono uppercase">Paid placement · not a recommendation</span>
      </div>

      <div className="flex items-start gap-4">
        {logoUrl && (
          <Image src={logoUrl} alt={`${agency.name} logo`} width={56} height={56} className="bg-white rounded-sm flex-shrink-0" unoptimized />
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-1">{agency.name}</h2>
          <p className="text-gray-300 text-sm">{agency.shortDescription}</p>
        </div>
      </div>

      {facts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-5 font-mono">
          {facts.map(([label, val]) => (
            <div key={label} className="border-2 border-white/40 p-2">
              <div className="text-xs text-gray-400 uppercase">{label}</div>
              <div className="text-sm text-white font-bold">{val}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <Link href={agency.website} target="_blank" rel="noopener noreferrer" className="block text-center bg-white border-4 border-white text-black px-3 py-3 font-black hover:bg-gray-200 transition-colors uppercase text-xs sm:text-sm tracking-wide">
          ■ Visit website
        </Link>
        <Link href={`/agency/${agency.id}`} className="block text-center bg-transparent border-4 border-white text-white px-3 py-3 font-black hover:bg-white hover:text-black transition-colors uppercase text-xs sm:text-sm tracking-wide">
          ■ View profile
        </Link>
      </div>

      <div className="mt-5 border-t-2 border-white/20 pt-5 space-y-5">
        {agency.description && <p className="text-gray-300 text-sm leading-relaxed">{agency.description}</p>}
        {agency.services?.length > 0 && tagRow('Services', agency.services)}
        {agency.specialties?.length > 0 && tagRow('Specialties', agency.specialties)}
        {agency.clientTypes && agency.clientTypes.length > 0 && tagRow('Works with', agency.clientTypes)}

        {agency.caseStudies && agency.caseStudies.length > 0 && (
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">■ Case studies</div>
            <div className="space-y-2">
              {agency.caseStudies.map((c, i) => (
                <div key={i} className="bg-gray-800 border-l-4 border-yellow-300 p-3">
                  <div className="text-white font-bold text-sm">{c.client}</div>
                  {c.results && <div className="text-yellow-300 text-xs font-mono mt-1">{c.results}</div>}
                  {c.description && <div className="text-gray-400 text-xs mt-1">{c.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {agency.awards && agency.awards.length > 0 && (
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">■ Recognition</div>
            <ul className="space-y-1">
              {agency.awards.map((a, i) => (
                <li key={i} className="text-gray-300 text-sm">{a.name} ({a.year}){a.status && a.status !== 'won' ? `, ${a.status}` : ''}</li>
              ))}
            </ul>
          </div>
        )}

        {(agency.linkedinUrl || agency.clutchUrl) && (
          <div className="flex gap-4 text-xs font-mono">
            {agency.linkedinUrl && <a href={agency.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline hover:text-white">LinkedIn</a>}
            {agency.clutchUrl && <a href={agency.clutchUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline hover:text-white">Clutch profile</a>}
          </div>
        )}
      </div>
    </div>
  );
}
