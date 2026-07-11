import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllAgencies } from '@/lib/agencies';
import TldrSummary from '@/components/TldrSummary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare Cybersecurity Marketing Agencies Side-by-Side',
  description:
    'Compare cybersecurity marketing agencies side-by-side. Select up to 3 agencies to compare services, ratings, location, specialties, and budgets.',
  openGraph: {
    title: 'Compare Cybersecurity Marketing Agencies Side-by-Side',
    description:
      'Select up to 3 cybersecurity marketing agencies and compare them side-by-side on services, ratings, location, specialties, and budgets.',
    type: 'website',
    url: 'https://cybersecuritymarketingagencies.com/compare',
  },
  alternates: {
    canonical: 'https://cybersecuritymarketingagencies.com/compare',
  },
};

export default function ComparePage() {
  const agencies = [...getAllAgencies()].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-black">
      <SiteNav />

      <header className="bg-gray-950 border-b-8 border-white relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4">
            COMPARE AGENCIES
          </h1>
          <div className="flex items-center gap-4 text-white font-mono">
            <span>&#9632;</span>
            <p className="text-base md:text-lg">
              Select up to 3 cybersecurity marketing agencies to compare side-by-side
            </p>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TldrSummary points={[
          'Select up to 3 cybersecurity marketing agencies to compare side-by-side.',
          'Compare services, ratings, location, specialties, and budget ranges.',
          `${agencies.length} agencies available for comparison.`,
        ]} />
        <Suspense fallback={<div className="text-white font-mono text-center py-12">■ LOADING COMPARISON...</div>}>
          <CompareClient agencies={agencies} />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}
