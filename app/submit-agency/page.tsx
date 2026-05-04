'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import TldrSummary from '@/components/TldrSummary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const SERVICES = [
  'SEO',
  'AI Visibility',
  'Content Marketing',
  'PPC',
  'PR & Media Relations',
  'Lead Generation',
  'Brand Strategy',
  'Digital Marketing',
];

const SUBMISSIONS_EMAIL = 'submissions@cybersecuritymarketingagencies.com';

export default function SubmitAgencyPage() {
  const [agencyName, setAgencyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [location, setLocation] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/submit-agency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyName,
          websiteUrl,
          contactEmail,
          location,
          services: selectedServices,
          description,
          website_url: websiteHoneypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit.');
      }

      setSubmitStatus('success');
      setAgencyName('');
      setWebsiteUrl('');
      setContactEmail('');
      setLocation('');
      setSelectedServices([]);
      setDescription('');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteNav />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Breadcrumbs */}
          <nav className="mb-8 font-mono text-xs uppercase tracking-wider">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-gray-600 mx-2">&gt;</span>
            <span className="text-white">LIST YOUR AGENCY</span>
          </nav>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              LIST YOUR CYBERSECURITY MARKETING AGENCY
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mb-2">
              We are a curated directory of cybersecurity marketing agencies, used by founders, CMOs and security buyers researching specialist partners. Two ways to be listed.
            </p>
          </div>

          <TldrSummary points={[
            'Two listing tiers: Verified ($499/year) and Featured ($1,499/year).',
            'Editorial picks (Best for SEO, Best Overall, etc.) cannot be purchased.',
            'Submit below or email submissions@cybersecuritymarketingagencies.com to discuss.',
            'Approval takes 5 to 7 business days. Annual renewal.',
          ]} />

          {/* Pricing Tiers */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
              &#9632; LISTING TIERS
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Editorial */}
              <div className="bg-gray-900 border-4 border-gray-600 p-8 flex flex-col">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  TIER 1
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Editorial</h3>
                <div className="text-3xl font-black text-white mb-1">Free</div>
                <div className="text-xs font-mono text-gray-400 uppercase mb-6">
                  By invitation only
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  Editorial picks are agencies we have evaluated against documented results, client portfolio, and industry standing. They cannot be purchased.
                </p>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex gap-2">
                    <span className="text-white">&#9632;</span>
                    <span>Selected by us based on merit</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">&#9632;</span>
                    <span>Eligible for Editor&apos;s Pick badges</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">&#9632;</span>
                    <span>Included in &quot;Best of&quot; rankings</span>
                  </li>
                </ul>
                <div className="mt-auto text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Not available for purchase
                </div>
              </div>

              {/* Verified */}
              <div className="bg-gray-900 border-4 border-white p-8 flex flex-col shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  TIER 2
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Verified</h3>
                <div className="text-3xl font-black text-white mb-1">$499<span className="text-base text-gray-400 font-normal">/year</span></div>
                <div className="text-xs font-mono text-gray-400 uppercase mb-6">
                  Annual renewal
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  A complete profile in the directory, surfaced when buyers filter by your services and location.
                </p>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex gap-2">
                    <span className="text-white">&#9632;</span>
                    <span>Full agency profile page</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">&#9632;</span>
                    <span>Listed by service category and location</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">&#9632;</span>
                    <span>Strengths, services, client types, links</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">&#9632;</span>
                    <span>Logo, LinkedIn, Clutch, G2 links</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500">&#9633;</span>
                    <span className="text-gray-500">Not included in &quot;Best of&quot; rankings</span>
                  </li>
                </ul>
                <a
                  href={`mailto:${SUBMISSIONS_EMAIL}?subject=Verified%20Listing%20Inquiry`}
                  className="mt-auto bg-white text-black px-6 py-3 font-black uppercase tracking-wide text-sm text-center hover:bg-gray-200 transition-colors border-4 border-white"
                >
                  EMAIL TO DISCUSS
                </a>
              </div>

              {/* Featured */}
              <div className="bg-gray-900 border-4 border-yellow-400 p-8 flex flex-col shadow-[6px_6px_0px_0px_rgba(250,204,21,0.3)]">
                <div className="text-xs font-mono text-yellow-400 uppercase tracking-wider mb-2">
                  TIER 3 &mdash; MOST VISIBILITY
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Featured</h3>
                <div className="text-3xl font-black text-white mb-1">$1,499<span className="text-base text-gray-400 font-normal">/year</span></div>
                <div className="text-xs font-mono text-gray-400 uppercase mb-6">
                  Annual renewal
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  Everything in Verified, plus inclusion in our editorial roundup posts and a dedicated agency Q&amp;A.
                </p>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex gap-2">
                    <span className="text-yellow-400">&#9632;</span>
                    <span>Everything in Verified</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">&#9632;</span>
                    <span>Listed in relevant &quot;Best of&quot; roundups</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">&#9632;</span>
                    <span>One agency Q&amp;A blog post per year</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-400">&#9632;</span>
                    <span>Featured placement on relevant category pages</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-500">&#9633;</span>
                    <span className="text-gray-500">Editor&apos;s Pick badges still selected by us</span>
                  </li>
                </ul>
                <a
                  href={`mailto:${SUBMISSIONS_EMAIL}?subject=Featured%20Listing%20Inquiry`}
                  className="mt-auto bg-yellow-400 text-black px-6 py-3 font-black uppercase tracking-wide text-sm text-center hover:bg-yellow-300 transition-colors border-4 border-yellow-400"
                >
                  EMAIL TO DISCUSS
                </a>
              </div>
            </div>
          </div>

          {/* Editorial Integrity Disclosure */}
          <div className="bg-gray-950 border-4 border-white p-10 mb-12">
            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">
              &#9632; OUR EDITORIAL LINE
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Listings are paid. Editorial recognition is not.</strong> Verified and Featured tiers buy you a place in the directory. They do not buy you a Best Overall or Best for SEO designation, a top ranking in any &quot;Best of&quot; post, or favourable editorial language. Those are determined by us based on documented results, client portfolio, awards, and industry standing.
              </p>
              <p>
                <strong className="text-white">What this means for buyers:</strong> when you read a phrase like &quot;Top Pick&quot; or see an Editor&apos;s Pick badge, that is our independent judgement, not a transaction. When you see an agency in the directory or a Featured tier roundup mention, that is a paid listing and disclosed accordingly.
              </p>
              <p>
                <strong className="text-white">What this means for agencies:</strong> if you are great, the editorial recognition follows the work, not the cheque. The paid tiers exist to fund the directory and surface you to buyers. They do not buy you a ranking we have not earned for you.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wider">
              &#9632; SUBMIT YOUR DETAILS
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Fill out the form below and we will follow up with next steps. Or email <a href={`mailto:${SUBMISSIONS_EMAIL}`} className="text-white underline hover:text-gray-300">{SUBMISSIONS_EMAIL}</a> directly.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              value={websiteHoneypot}
              onChange={(e) => setWebsiteHoneypot(e.target.value)}
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            />
            <div className="bg-gray-900 border-4 border-white p-10 mb-12 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">
                &#9632; AGENCY DETAILS
              </h3>

              <div className="space-y-6">
                {/* Agency Name */}
                <div>
                  <label htmlFor="agencyName" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
                    Agency Name *
                  </label>
                  <input
                    type="text"
                    id="agencyName"
                    required
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="Enter agency name"
                    className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600"
                  />
                </div>

                {/* Website URL */}
                <div>
                  <label htmlFor="websiteUrl" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    id="websiteUrl"
                    required
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://youragency.com"
                    className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label htmlFor="contactEmail" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contact@youragency.com"
                    className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
                    Location / Region
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., United States, Europe, UK"
                    className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-900 border-4 border-white p-10 mb-12 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">
                &#9632; SERVICES OFFERED
              </h3>
              <p className="text-gray-400 font-mono text-xs mb-6 uppercase tracking-wider">
                Select all that apply
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-6 h-6 border-4 flex items-center justify-center transition-colors ${
                        selectedServices.includes(service)
                          ? 'border-white bg-white'
                          : 'border-white bg-black group-hover:border-gray-400'
                      }`}
                    >
                      {selectedServices.includes(service) && (
                        <span className="text-black font-black text-sm">&#10003;</span>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="sr-only"
                    />
                    <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors uppercase tracking-wider">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 border-4 border-white p-10 mb-12 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">
                &#9632; ABOUT YOUR AGENCY
              </h3>

              <div>
                <label htmlFor="description" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
                  Brief Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your agency, specializations, notable clients, and what sets you apart in the cybersecurity marketing space. Mention which tier (Verified or Featured) you are interested in."
                  className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600 resize-vertical"
                />
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-900 border-4 border-green-400 p-6 mb-12 text-center">
                <p className="text-green-400 font-black uppercase tracking-wide text-lg mb-2">SUBMISSION RECEIVED</p>
                <p className="text-green-300 font-mono text-sm">Thanks. We will be in touch within 5 business days with next steps and an invoice link.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-900 border-4 border-red-400 p-6 mb-12 text-center">
                <p className="text-red-400 font-black uppercase tracking-wide text-lg mb-2">SUBMISSION FAILED</p>
                <p className="text-red-300 font-mono text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST ▶'}
              </button>
            </div>
          </form>

          {/* FAQ */}
          <div className="bg-gray-900 border-4 border-white p-10 mt-12">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
              &#9632; FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-white mb-2">How long does the review take?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Five to seven business days. We verify the agency is real, check for documented cybersecurity work, and confirm the website and social profiles match.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">What if my agency is rejected?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Full refund within 30 days, no questions asked. We may decline submissions that lack demonstrable cybersecurity experience or have unresolvable trust issues. We let you know why.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">Can I switch tiers later?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Yes. Upgrade from Verified to Featured at any time and we credit the unused portion of your Verified term to the new subscription.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">Can I buy a Best for SEO or Editor&apos;s Pick badge?</h3>
                <p className="text-gray-300 leading-relaxed">
                  No. Editor&apos;s Pick badges and Best for designations are editorial. They are based on documented results, client portfolio, and industry standing. The directory is only useful to buyers if those signals stay independent.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">Are existing listings paid?</h3>
                <p className="text-gray-300 leading-relaxed">
                  No. The thirteen agencies listed before this pricing went live are editorial. New submissions follow the tiered model.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-white mb-2">Do you offer custom packages or sponsorship?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Yes, for category sponsorship (for example, sole sponsor of the &quot;Best Cybersecurity PR Agency&quot; landing page) or content partnerships. Email <a href={`mailto:${SUBMISSIONS_EMAIL}`} className="text-white underline hover:text-gray-300">{SUBMISSIONS_EMAIL}</a> to discuss.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
