import type { Metadata } from 'next';
import { Suspense } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Cybersecurity Marketing Agencies',
  description: 'Report a correction, ask about a listing tier, or get in touch with the team behind the cybersecurity marketing agencies directory.',
  alternates: {
    canonical: 'https://cybersecuritymarketingagencies.com/contact',
  },
};

export default function ContactPage() {
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <nav className="mb-6 font-mono text-xs uppercase tracking-wider">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">HOME</a>
            <span className="text-gray-600 mx-2">&gt;</span>
            <span className="text-white">CONTACT</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider mb-4">
            CONTACT
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Report a data correction, ask about a Verified or Featured listing, or get in touch
            for any other reason. We reply within a few business days.
          </p>
        </div>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="text-white font-mono text-center py-12">■ LOADING FORM...</div>}>
          <ContactForm />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}
