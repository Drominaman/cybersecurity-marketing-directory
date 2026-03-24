'use client';

import { useState, useEffect, FormEvent } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const SERVICE_LABELS: Record<string, string> = {
  'seo': 'SEO',
  'ai-visibility': 'AI Visibility',
  'content-marketing': 'Content Marketing',
  'pr-media-relations': 'PR & Media',
  'lead-generation': 'Lead Generation',
  'ppc': 'PPC',
  'thought-leadership': 'Thought Leadership',
  'brand-strategy': 'Brand Strategy',
  'digital-marketing': 'Digital Marketing',
  'demand-generation': 'Demand Generation',
  'social-media': 'Social Media',
  'website-development': 'Website Development',
  'video-marketing': 'Video Marketing',
  'podcast-marketing': 'Podcast Marketing',
  'sales-enablement': 'Sales Enablement',
  'marketing-analytics': 'Marketing Analytics',
  'technical-content-strategy': 'Technical Content',
};

const LOCATION_LABELS: Record<string, string> = {
  'usa': 'US',
  'uk': 'UK',
  'europe': 'European',
  'california': 'California',
  'new-york': 'New York',
};

const NICHE_LABELS: Record<string, string> = {
  'startups': 'Startup',
  'enterprise': 'Enterprise',
  'mssp': 'MSSP',
};

function getContextText(pathname: string, serviceParam: string | null): string {
  // Service pages: /best-for/seo → "cybersecurity SEO"
  const serviceMatch = pathname.match(/^\/best-for\/(.+)$/);
  if (serviceMatch && SERVICE_LABELS[serviceMatch[1]]) {
    return `cybersecurity ${SERVICE_LABELS[serviceMatch[1]]}`;
  }

  // Location pages: /location/usa → "US cybersecurity marketing"
  const locationMatch = pathname.match(/^\/location\/(.+)$/);
  if (locationMatch && LOCATION_LABELS[locationMatch[1]]) {
    return `${LOCATION_LABELS[locationMatch[1]]} cybersecurity marketing`;
  }

  // Audience pages: /best-for-audience/startups → "startup cybersecurity marketing"
  const nicheMatch = pathname.match(/^\/best-for-audience\/(.+)$/);
  if (nicheMatch && NICHE_LABELS[nicheMatch[1]]) {
    return `${NICHE_LABELS[nicheMatch[1]]} cybersecurity marketing`;
  }

  // Homepage with service filter: /?service=SEO → "cybersecurity SEO"
  if (pathname === '/' && serviceParam) {
    return `cybersecurity ${serviceParam}`;
  }

  // Default
  return 'cybersecurity inbound marketing';
}

export default function ConsultationCTA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const contextText = getContextText(pathname, serviceParam);

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('consultation-cta-dismissed')) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.5) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem('consultation-cta-dismissed', 'true');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, context: contextText }),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-80 bg-gray-900 border-4 border-white p-6 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-500 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
      }`}
    >
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl font-bold transition-colors"
        aria-label="Dismiss"
      >
        &times;
      </button>

      {status === 'success' ? (
        <div className="text-center py-2">
          <p className="text-white font-black uppercase tracking-wide text-sm mb-1">WE&apos;LL BE IN TOUCH</p>
          <p className="text-gray-400 font-mono text-xs">Check your inbox soon.</p>
        </div>
      ) : (
        <>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono mb-1">
            FREE CONSULTATION
          </p>
          <p className="text-white font-black uppercase tracking-tight text-sm mb-4">
            Get a free {contextText} consultation
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border-4 border-white bg-black text-white font-mono text-sm placeholder-gray-600 outline-none focus:border-gray-400"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-white text-black py-2 font-black uppercase tracking-wide text-sm border-4 border-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'SENDING...' : 'GET CONSULTATION'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 font-mono text-xs text-center">Something went wrong. Try again.</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}
