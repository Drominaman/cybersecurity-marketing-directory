'use client';

import { useState } from 'react';
import { Agency } from '@/types/agency';
import AgencyFeaturedProfile from './AgencyFeaturedProfile';

/**
 * Featured agency teaser with a single "Read more" that drops the full profile
 * down inline (same mechanism as cybersectool's featured listing). The featured
 * agency is shown here and excluded from the alphabetical grid below.
 */
export default function AgencyFeaturedReveal({ agency }: { agency: Agency }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8">
      {open ? (
        <>
          <AgencyFeaturedProfile agency={agency} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-expanded={true}
            className="w-full mt-2 border-2 border-yellow-300 text-yellow-300 px-3 py-2 font-mono font-bold text-xs uppercase tracking-wider hover:bg-yellow-300 hover:text-black transition-colors"
          >
            ■ Read less ▲
          </button>
        </>
      ) : (
        <div className="bg-gray-900 border-4 border-yellow-300 p-4 sm:p-5 shadow-[8px_8px_0px_0px_rgba(253,224,71,0.3)]">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-white font-black uppercase text-lg">{agency.name}</span>
            <span
              className="text-[10px] font-mono uppercase tracking-wider text-yellow-300/80 border border-yellow-300/40 px-1.5 py-0.5"
              title="Sponsored placement. See our methodology for how featured listings work."
            >
              ★ Featured
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-3">{agency.shortDescription}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            className="border-2 border-yellow-300 text-yellow-300 px-4 py-2 font-mono font-bold text-xs uppercase tracking-wider hover:bg-yellow-300 hover:text-black transition-colors"
          >
            ■ Read more ▼
          </button>
        </div>
      )}
    </div>
  );
}
