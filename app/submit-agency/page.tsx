'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
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

export default function SubmitAgencyPage() {
  const [agencyName, setAgencyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [location, setLocation] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const body = [
      `Agency Name: ${agencyName}`,
      `Website URL: ${websiteUrl}`,
      `Contact Email: ${contactEmail}`,
      `Location/Region: ${location || 'Not specified'}`,
      `Services: ${selectedServices.length > 0 ? selectedServices.join(', ') : 'Not specified'}`,
      ``,
      `Description:`,
      description || 'Not provided',
    ].join('\n');

    const subject = `Agency Submission: ${agencyName}`;
    const mailtoUrl = `mailto:hello@cybersecuritymarketingagencies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <>
      <SiteNav />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Breadcrumbs */}
          <nav className="mb-8 font-mono text-xs uppercase tracking-wider">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-gray-600 mx-2">&gt;</span>
            <span className="text-white">SUBMIT AGENCY</span>
          </nav>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              SUBMIT YOUR AGENCY
            </h1>
            <p className="text-gray-400 font-mono text-sm max-w-2xl">
              Want your cybersecurity marketing agency listed in our directory? Fill out the form below and we&apos;ll review your submission. Your email client will open with the details pre-filled.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-900 border-4 border-white p-10 mb-12 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                ■ AGENCY DETAILS
              </h2>

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
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                ■ SERVICES OFFERED
              </h2>
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
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                ■ ABOUT YOUR AGENCY
              </h2>

              <div>
                <label htmlFor="description" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider font-mono">
                  Brief Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your agency, specializations, notable clients, and what sets you apart in the cybersecurity marketing space..."
                  className="w-full px-4 py-3 border-4 border-white focus:border-gray-400 outline-none bg-black text-white font-mono placeholder-gray-600 resize-vertical"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]"
              >
                SUBMIT AGENCY &#9654;
              </button>
              <p className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-wider">
                This will open your email client with the submission details
              </p>
            </div>
          </form>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
