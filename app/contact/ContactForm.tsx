'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

const REASONS: [string, string][] = [
  ['general', 'General question'],
  ['correction', 'Report a data correction'],
  ['verified-listing', 'Verified listing inquiry ($499/year)'],
  ['featured-listing', 'Featured listing inquiry ($1,499/year)'],
  ['sponsorship', 'Sponsorship & partnerships'],
];

const VALID_REASONS = new Set(REASONS.map(([value]) => value));

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialReason = searchParams.get('reason');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(
    initialReason && VALID_REASONS.has(initialReason) ? initialReason : 'general'
  );
  const [message, setMessage] = useState('');
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          reason,
          message,
          website_url: websiteHoneypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send.');
      }

      setSubmitStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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

      <div className="bg-gray-900 border-4 border-white p-10 mb-8 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
              Reason for contact *
            </label>
            <select
              id="reason"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono"
            >
              {REASONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you'd like to discuss."
              className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600 resize-vertical"
            />
          </div>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-900 border-4 border-green-400 p-6 mb-8 text-center">
          <p className="text-green-400 font-black uppercase tracking-wide text-lg mb-2">MESSAGE SENT</p>
          <p className="text-green-300 font-mono text-sm">Thanks. We will get back to you within a few business days.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-900 border-4 border-red-400 p-6 mb-8 text-center">
          <p className="text-red-400 font-black uppercase tracking-wide text-lg mb-2">MESSAGE FAILED</p>
          <p className="text-red-300 font-mono text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE ▶'}
        </button>
      </div>
    </form>
  );
}
