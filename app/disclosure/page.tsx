import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ownership and Disclosure',
  description:
    'Who operates this directory, our connection to Content Visit, how that is kept separate from scoring, and how to verify our rankings independently.',
  alternates: {
    canonical: 'https://cybersecuritymarketingagencies.com/disclosure',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DisclosurePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8 font-mono text-xs uppercase tracking-wider">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-gray-600 mx-2">&gt;</span>
            <span className="text-white">DISCLOSURE</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            OWNERSHIP AND DISCLOSURE
          </h1>
          <p className="text-gray-300 text-lg mb-10">
            Who runs this directory, and what that means for the rankings you read here.
          </p>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; WHO OPERATES THIS SITE
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                This directory is operated by the team behind{' '}
                <Link href="/agency/content-visit" className="text-white underline hover:text-gray-300">
                  Content Visit
                </Link>
                , a cybersecurity marketing agency that is itself listed and scored here. Content
                Visit currently holds our channel picks for SEO, AI visibility, and content
                marketing.
              </p>
              <p>
                We are telling you this because an endorsement from a party with a commercial
                interest in the outcome is worth less if you do not know about the interest. You
                should weigh our rankings with that in mind, and verify them.
              </p>
            </div>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; HOW WE KEEP SCORING HONEST
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Every agency, Content Visit included, is scored against the same{' '}
                <Link href="/methodology" className="text-white underline hover:text-gray-300">
                  published rubric
                </Link>
                : verified client feedback (30%), documented results (25%), cybersecurity focus
                (20%), service breadth (15%), and market presence (10%). The scoring bands are
                published in full, and every profile shows its per-dimension score with the evidence
                each one rests on.
              </p>
              <p>
                Content Visit scores highest on the dimensions where the evidence is public and
                checkable: verified reviews across Clutch, G2, and DesignRush, and named-client case
                studies carrying concrete metrics. If another agency documents more, it scores
                higher, and the pick moves. That is the whole mechanism, and you can audit it.
              </p>
              <p>
                Channel picks are constrained by the same published rule for everyone: a pick goes to
                the highest-scoring agency with that channel among its three core services. This is
                why Content Visit does not hold the PR pick despite the highest overall score.
              </p>
            </div>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; PAID PLACEMENT
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Paid listing tiers exist and are described on our{' '}
                <Link href="/submit-agency" className="text-white underline hover:text-gray-300">
                  listing page
                </Link>
                . They buy a labelled placement and a richer profile. They never buy a score, a
                badge, or a channel pick, and paid placements always carry a visible label. See{' '}
                <Link href="/methodology#featured" className="text-white underline hover:text-gray-300">
                  featured listings
                </Link>{' '}
                for the full explanation.
              </p>
            </div>
          </section>

          <section className="bg-gray-950 border-4 border-white p-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; HOW TO CHECK OUR WORK
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Do not take our word for any of it. Every agency profile links to its independent
                third-party profiles (Clutch, G2, DesignRush, LinkedIn) so you can verify the review
                evidence yourself, and every case-study claim names the client so you can ask them.
              </p>
              <p>
                If you believe a score is wrong, or that we have weighed something unfairly,{' '}
                <Link href="/contact?reason=correction" className="text-white underline hover:text-gray-300">
                  tell us
                </Link>{' '}
                and we will re-check it and publish the correction.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
