'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TrendingSectionProps {
  agencyNamesById: Record<string, string>;
  postTitlesBySlug: Record<string, string>;
}

interface StatsResponse {
  human: number;
  paths: Record<string, number>;
}

interface TrendingItem {
  href: string;
  label: string;
  views: number;
}

/**
 * Reads real page-view data from this site's own beacon (see
 * netlify/functions/stats.mts, components/PageViewBeacon.tsx) and shows
 * what's actually being read. Fetched client-side so the homepage itself
 * stays statically generated - this never blocks or breaks page render if
 * the endpoint is unavailable (e.g. local `next dev` without `netlify dev`).
 */
export default function TrendingSection({ agencyNamesById, postTitlesBySlug }: TrendingSectionProps) {
  const [readers, setReaders] = useState<number | null>(null);
  const [items, setItems] = useState<TrendingItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/.netlify/functions/stats?format=json&days=30')
      .then((res) => (res.ok ? (res.json() as Promise<StatsResponse>) : null))
      .then((data) => {
        if (!data || cancelled) return;

        const ranked: TrendingItem[] = Object.entries(data.paths)
          .map(([path, views]) => {
            if (path.startsWith('/agency/')) {
              const id = path.slice('/agency/'.length);
              const name = agencyNamesById[id];
              return name ? { href: path, label: name, views } : null;
            }
            if (path.startsWith('/blog/')) {
              const slug = path.slice('/blog/'.length);
              const title = postTitlesBySlug[slug];
              return title ? { href: path, label: title, views } : null;
            }
            return null;
          })
          .filter((item): item is TrendingItem => item !== null)
          .sort((a, b) => b.views - a.views)
          .slice(0, 6);

        setReaders(data.human);
        setItems(ranked);
      })
      .catch(() => {
        // Measurement is a bonus, not a dependency - never surface an error.
      });

    return () => {
      cancelled = true;
    };
  }, [agencyNamesById, postTitlesBySlug]);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gray-900 border-4 border-white p-10 mt-20">
      <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wider">
        &#9632; Trending Now
      </h2>
      <p className="text-gray-300 mb-8">
        {readers !== null
          ? `Read by ${readers.toLocaleString()} visitors in the last 30 days. Ranked by page views, counted by this site's own cookieless beacon.`
          : "Ranked by page views over the last 30 days, counted by this site's own cookieless beacon."}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between gap-3 bg-black border-2 border-white/20 px-4 py-3 hover:bg-gray-800 transition-colors group"
          >
            <span className="text-white text-sm font-bold group-hover:text-gray-300 truncate">
              <span className="text-gray-500 font-mono mr-2">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </span>
            <span className="text-gray-400 text-xs font-mono whitespace-nowrap">{item.views} views</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
