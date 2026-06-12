import Link from 'next/link';
import AuthorByline from '@/components/AuthorByline';
import TldrSummary from '@/components/TldrSummary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology - How We Assess and List Cybersecurity Marketing Agencies',
  description:
    'How agencies earn a place in our directory: how we assess agencies across five dimensions, the difference between reviewed and listed agencies, verification cadence, paid evaluation, and our independence.',
  alternates: {
    canonical: 'https://cybersecuritymarketingagencies.com/methodology',
  },
};

const criteria = [
  {
    name: 'Cybersecurity expertise',
    detail:
      'How much of the agency’s work is cybersecurity. Exclusive focus weighs most; a general B2B agency with one security client weighs least. We check client rosters, case studies, team backgrounds, and published content for technical depth.',
  },
  {
    name: 'Documented results',
    detail:
      'Named clients with concrete metrics beat anonymised claims. We weight results that can be cross-checked: public case studies, client references, third-party reviews. “We drove growth for a leading security vendor” counts for little.',
  },
  {
    name: 'Service breadth and integration',
    detail:
      'Whether the agency delivers its listed services in-house and how well they integrate. A focused specialist can weigh well here; a long service list with shallow delivery cannot.',
  },
  {
    name: 'AI visibility and GEO capability',
    detail:
      'Whether the agency understands optimisation for AI-driven discovery (ChatGPT, Perplexity, Claude, Google AI Overviews) and can demonstrate it, starting with their own visibility.',
  },
  {
    name: 'Client portfolio quality',
    detail:
      'The calibre and relevance of the agency’s cybersecurity client base, and signals like client tenure, repeat engagements, and industry awards.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cybersecuritymarketingagencies.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Methodology',
      item: 'https://cybersecuritymarketingagencies.com/methodology',
    },
  ],
};

export default function MethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteNav />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <nav className="mb-8 font-mono text-xs uppercase tracking-wider">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-gray-600 mx-2">&gt;</span>
            <span className="text-white">METHODOLOGY</span>
          </nav>

          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              HOW WE ASSESS AND LIST AGENCIES
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl">
              A directory is only useful if you know how it works. This page explains how agencies get
              in, how we assess them, how often data is re-verified, who runs this site, and what
              money does and does not buy here.
            </p>
            <AuthorByline variant="full" lastUpdated="June 2026" />
          </div>

          <TldrSummary
            points={[
              'Two listing types: Reviewed (fully assessed across five dimensions) and Listed (verified basics).',
              'We do not rank agencies, name a single best, or crown category leaders. We list every agency neutrally and let you compare on documented results.',
              'Every profile is re-verified quarterly and carries a last-verified date.',
              'We are independent: every agency is held to the same criteria and none receives a recommendation.',
              'New submissions pay an evaluation fee that covers our research time, not the outcome. Rejected agencies are refunded.',
            ]}
          />

          {/* Reviewed vs Listed */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; REVIEWED VS LISTED
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Reviewed agencies</strong> have been through a full
                editorial assessment across the five dimensions below. No numeric score is assigned, and
                no agency is crowned: the assessment informs our neutral profile notes, not a ranking.
              </p>
              <p>
                <strong className="text-white">Listed agencies</strong> have passed verification, which
                means we have confirmed they are a real, active agency with demonstrable cybersecurity work,
                a working website, and accurate company information. A listing is not
                an endorsement; it is a verified record.
              </p>
              <p>
                We do not assign numeric scores, name a single best, or crown category leaders, because a
                precise number or a crown implies a certainty our assessment does not have. We would rather
                show you each agency&apos;s documented strengths and let you compare for your own needs.
              </p>
            </div>
          </section>

          {/* Assessment dimensions */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; HOW WE ASSESS AGENCIES
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We assess agencies across the five dimensions below to write accurate, neutral profiles. We
              do not turn this into a ranking or crown a leader. Assessments are reviewed quarterly and
              revised when an agency&apos;s circumstances materially change (acquisitions, rebrands, major
              client wins or losses).
            </p>
            <div className="space-y-5">
              {criteria.map((c) => (
                <div key={c.name} className="border-l-4 border-white pl-5">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-lg font-black text-white uppercase">{c.name}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm">{c.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed mt-6">
              This assessment informs our neutral profile notes only. We do not name a single best agency,
              crown category leaders, or publish &quot;Top Pick&quot; labels for anyone, and nothing here is
              for sale, at any price, to anyone.
            </p>
          </section>

          {/* Listing criteria */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; WHAT GETS AN AGENCY LISTED
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>To qualify for a listing, an agency must have:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>Demonstrable cybersecurity client work: named clients, published case studies, or verifiable references</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>At least two years of operation as an agency</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>A working website and a verifiable LinkedIn company presence</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>At least one service in the categories this directory covers</span></li>
              </ul>
              <p>
                We decline submissions that cannot demonstrate cybersecurity experience, misrepresent
                clients or results, or fail basic verification. We also remove listings: agencies that shut
                down, merge away, or whose data we can no longer verify are pulled from the directory, and
                removals are noted in our public changelog.
              </p>
            </div>
          </section>

          {/* Verification */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; VERIFICATION CADENCE
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Directory data rots. Agencies move, rebrand, merge, and change their service mix, and most
                directories never notice. Our process:
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span><strong className="text-white">On intake:</strong> website, LinkedIn, location, founding year, services, and client claims are verified against primary sources before a profile goes live</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span><strong className="text-white">Quarterly:</strong> every profile is re-checked for dead links, moved offices, rebrands, and acquisitions</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span><strong className="text-white">Continuously:</strong> corrections reported by agencies or readers are verified and applied, and material changes are recorded in the public changelog</span></li>
              </ul>
              <p>
                Profiles carry a last-verified date. If you spot something wrong, email{' '}
                <a href="mailto:robbie@contentvisit.com" className="text-white underline hover:text-gray-300">
                  robbie@contentvisit.com
                </a>{' '}
                and we will check it.
              </p>
            </div>
          </section>

          {/* Independence */}
          <section className="bg-gray-950 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; INDEPENDENCE
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We do not recommend, rank, or crown any agency. Every agency is assessed against the same
                five dimensions and listed neutrally, and the comparison is left to you. There is no Best
                Overall, no category leader, and no &quot;Top Pick&quot; to buy or to earn.
              </p>
              <p>
                Verify our claims independently: every reviewed agency profile links to third-party
                platforms like Clutch, G2, and LinkedIn precisely so you can check our work.
              </p>
            </div>
          </section>

          {/* Paid evaluation */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; SUBMISSIONS AND PAID EVALUATION
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We encourage agencies with genuine cybersecurity experience to{' '}
                <Link href="/submit-agency" className="text-white underline hover:text-gray-300">
                  submit for evaluation
                </Link>
                . Submissions carry a fee because evaluation is real work: researching your client base,
                verifying your claims and profiles, assessing you across the dimensions above, and
                maintaining your data quarterly after you are live.
              </p>
              <p>
                <strong className="text-white">The fee buys the evaluation, not the outcome.</strong>{' '}
                Paying does not guarantee a listing, does not influence your assessment, and does not buy a
                recommendation, ranking, or favourable editorial language, because we do not rank or
                recommend agencies. Agencies we decline receive a full refund and a short explanation of
                why.
              </p>
              <p>
                See current tiers and what each includes on the{' '}
                <Link href="/submit-agency" className="text-white underline hover:text-gray-300">
                  listing page
                </Link>
                .
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/submit-agency"
              className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]"
            >
              SUBMIT YOUR AGENCY FOR EVALUATION &#9654;
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
