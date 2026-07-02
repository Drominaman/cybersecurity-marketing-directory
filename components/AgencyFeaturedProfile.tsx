import Image from 'next/image';
import Link from 'next/link';
import { Agency } from '@/types/agency';
import { getAgencyLogoUrl } from '@/lib/utils';

/**
 * Full "Featured" profile for a featured agency, shown expanded (DesignRush-style
 * mini landing page). Visibility is controlled by the caller (the intro "Read
 * more" reveals it), so there is no internal toggle. A labelled sponsored
 * placement, not a ranking: every section below is built from the agency's
 * verified listing data.
 */

// Channels a buyer might need that this agency may not offer, mapped to the
// browse pages where other agencies do. Powers the honest "might not be the
// best fit" section.
const FIT_GAP_CHANNELS: [string, string][] = [
  ['PPC', 'ppc'],
  ['Brand Strategy', 'brand-strategy'],
  ['Video Marketing', 'video-marketing'],
  ['Website Development', 'website-development'],
  ['Demand Generation', 'demand-generation'],
  ['Marketing Analytics', 'marketing-analytics'],
];

export default function AgencyFeaturedProfile({ agency }: { agency: Agency }) {
  const logoUrl = getAgencyLogoUrl(agency.website);

  const facts: [string, string][] = [];
  if (agency.yearFounded) facts.push(['Founded', String(agency.yearFounded)]);
  if (agency.location) facts.push(['Location', agency.location]);
  if (agency.teamSize) facts.push(['Team', agency.teamSize]);
  if (agency.minBudget) facts.push(['Min budget', agency.minBudget]);

  const clients = (agency.caseStudies || []).map((c) => c.client);
  const serviceGaps = FIT_GAP_CHANNELS.filter(
    ([name]) => !agency.services.some((s) => s.toLowerCase() === name.toLowerCase())
  ).slice(0, 4);

  const faqs: [string, string][] = [];
  if (agency.minBudget) {
    faqs.push([
      `How much does ${agency.name} cost?`,
      `Engagements start at ${agency.minBudget}. Contact the agency directly for a quote scoped to your channels and stage.`,
    ]);
  }
  if (agency.location) {
    faqs.push([
      `Where is ${agency.name} based?`,
      `${agency.location}.${agency.geography ? ` Coverage: ${agency.geography}.` : ''}`,
    ]);
  }
  if ((agency.clientTypes || []).length > 0 || clients.length > 0) {
    faqs.push([
      `Who does ${agency.name} work with?`,
      `${(agency.clientTypes || []).join(', ')}${clients.length > 0 ? `. Documented client work includes ${clients.join(', ')}.` : '.'}`,
    ]);
  }
  if (agency.services.length > 0) {
    faqs.push([
      `What services does ${agency.name} offer?`,
      agency.services.join(', ') + '.',
    ]);
  }
  if ((agency.awards || []).length > 0) {
    faqs.push([
      `Has ${agency.name} won industry awards?`,
      (agency.awards || [])
        .map((a) => `${a.name} (${a.year}${a.status && a.status !== 'won' ? `, ${a.status}` : ''})`)
        .join('; ') + '.',
    ]);
  }

  const sectionHeading = (text: string) => (
    <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3">■ {text}</h3>
  );

  const tagRow = (label: string, items: string[]) => (
    <div>
      {sectionHeading(label)}
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s} className="bg-gray-800 border-2 border-white text-gray-300 px-2 py-1 text-xs font-bold">{s}</span>
        ))}
      </div>
    </div>
  );

  const ctaRow = (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <Link href={agency.website} target="_blank" rel="noopener noreferrer" className="block text-center bg-white border-4 border-white text-black px-3 py-3 font-black hover:bg-gray-200 transition-colors uppercase text-xs sm:text-sm tracking-wide">
        ■ Visit website
      </Link>
      <Link href={`/agency/${agency.id}`} className="block text-center bg-transparent border-4 border-white text-white px-3 py-3 font-black hover:bg-white hover:text-black transition-colors uppercase text-xs sm:text-sm tracking-wide">
        ■ View profile
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-900 border-4 border-yellow-300 p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(253,224,71,0.3)]">
      <div className="mb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-yellow-300/80">
          ■ Our Featured Cybersecurity Marketing Agency
        </span>
      </div>

      {/* Overview */}
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

      {ctaRow}

      <div className="mt-6 border-t-2 border-white/20 pt-6 space-y-6">
        {agency.description && <p className="text-gray-300 text-sm leading-relaxed">{agency.description}</p>}

        {/* Trusted by */}
        {clients.length > 0 && (
          <div>
            {sectionHeading(`${agency.name} has documented client work with`)}
            <div className="flex flex-wrap gap-2">
              {clients.map((c) => (
                <span key={c} className="bg-black border-2 border-yellow-300/50 text-white px-3 py-1.5 text-sm font-bold">{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* Why choose */}
        {(agency.pros || []).length > 0 && (
          <div>
            {sectionHeading(`Why buyers shortlist ${agency.name}`)}
            <ul className="space-y-2">
              {(agency.pros || []).map((p) => (
                <li key={p} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-yellow-300 flex-shrink-0">■</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Honest fit limits */}
        {serviceGaps.length > 0 && (
          <div className="bg-black border-2 border-white/30 p-4">
            {sectionHeading(`${agency.name} might not be the best fit if`)}
            <p className="text-gray-300 text-sm leading-relaxed">
              Your primary need is a channel this agency does not list:{' '}
              {serviceGaps.map(([name, slug], i) => (
                <span key={slug}>
                  {i > 0 && (i === serviceGaps.length - 1 ? ' or ' : ', ')}
                  <Link href={`/best-for/${slug}`} className="text-white underline hover:text-gray-300">{name}</Link>
                </span>
              ))}
              . Other agencies in the directory focus there - compare those listings for your channel.
            </p>
          </div>
        )}

        {agency.services?.length > 0 && tagRow('Services', agency.services)}
        {agency.specialties?.length > 0 && tagRow('Specialties', agency.specialties)}
        {agency.clientTypes && agency.clientTypes.length > 0 && tagRow('Works with', agency.clientTypes)}

        {/* Case studies */}
        {agency.caseStudies && agency.caseStudies.length > 0 && (
          <div>
            {sectionHeading(`Case studies by ${agency.name}`)}
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

        {/* Recognition */}
        {agency.awards && agency.awards.length > 0 && (
          <div>
            {sectionHeading('Recognition')}
            <ul className="space-y-1">
              {agency.awards.map((a, i) => (
                <li key={i} className="text-gray-300 text-sm">{a.name} ({a.year}){a.status && a.status !== 'won' ? `, ${a.status}` : ''}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <div>
            {sectionHeading(`FAQs about ${agency.name}`)}
            <div className="space-y-2">
              {faqs.map(([q, a]) => (
                <details key={q} className="bg-gray-800 border-2 border-white/20 group">
                  <summary className="cursor-pointer list-none p-3 text-white font-bold text-sm flex justify-between items-center [&::-webkit-details-marker]:hidden">
                    <span>{q}</span>
                    <span className="text-gray-500 group-open:hidden">▼</span>
                    <span className="text-gray-500 hidden group-open:inline">▲</span>
                  </summary>
                  <p className="px-3 pb-3 text-gray-300 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Why featured */}
        <div>
          {sectionHeading(`Why ${agency.name} is our Featured Cybersecurity Marketing Agency`)}
          <p className="text-gray-300 text-sm leading-relaxed">
            {agency.name} holds the featured placement with a listing that stands on documented work
            {clients.length > 0 ? `: ${(agency.caseStudies || []).length} published case studies with named clients including ${clients.slice(0, 3).join(', ')}` : ''}
            {(agency.awards || []).length > 0 ? `, plus industry recognition (${(agency.awards || []).map((a) => `${a.name} ${a.year}`).join('; ')})` : ''}
            . Every claim above passed the same five-dimension assessment and quarterly re-verification we
            apply to the whole directory, and you can check it independently via the profile links below.{' '}
            <Link href="/methodology#featured" className="text-gray-400 underline hover:text-gray-300">How featured listings work</Link>.
          </p>
        </div>

        {/* Seal */}
        <div className="border-2 border-yellow-300/40 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-300 text-xl">★</span>
            <span className="text-sm font-black text-white uppercase tracking-wider">Verified Listing Seal</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            We believe partnering with an agency that publishes named, verifiable client results makes a
            real difference to how safely you can shortlist. This listing&apos;s data - services, clients,
            case studies, and awards - carries our verification seal and a last-verified date.
          </p>
        </div>

        {/* How to move forward */}
        <div>
          {sectionHeading('Our tips on how to move forward')}
          <ol className="space-y-2 text-gray-300 text-sm leading-relaxed list-none">
            <li className="flex gap-2"><span className="text-yellow-300 font-black flex-shrink-0">1.</span><span>Shortlist two or three agencies active in your primary channel and compare their documented results side by side.</span></li>
            <li className="flex gap-2"><span className="text-yellow-300 font-black flex-shrink-0">2.</span><span>Ask each for a case study at your company stage, with named clients and concrete metrics - not &quot;significant growth&quot;.</span></li>
            <li className="flex gap-2"><span className="text-yellow-300 font-black flex-shrink-0">3.</span><span>Verify independently on Clutch, G2, and LinkedIn before you sign. Every profile here links out for exactly that reason.</span></li>
          </ol>
        </div>

        {(agency.linkedinUrl || agency.clutchUrl || agency.designRushUrl) && (
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            {agency.linkedinUrl && <a href={agency.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline hover:text-white">LinkedIn</a>}
            {agency.clutchUrl && <a href={agency.clutchUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline hover:text-white">Clutch profile</a>}
            {agency.designRushUrl && <a href={agency.designRushUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline hover:text-white">DesignRush profile</a>}
          </div>
        )}

        {ctaRow}

        <p className="text-gray-600 text-[10px] font-mono">
          Featured placements are part of our paid Featured listing tier.{' '}
          <Link href="/methodology#featured" className="underline hover:text-gray-400">How listings work</Link>
        </p>
      </div>
    </div>
  );
}
