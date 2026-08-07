import Link from 'next/link';
import TldrSummary from '@/components/TldrSummary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { SCORING_DIMENSIONS } from '@/lib/scoring';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology - How We Score and Rank Cybersecurity Marketing Agencies',
  description:
    'How our agency rankings work: a published five-dimension rubric with exact weights and scoring bands, per-channel leaders, quarterly verification, and a strict rule that paid placement never affects scores or rankings.',
  alternates: {
    canonical: 'https://cybersecuritymarketingagencies.com/methodology',
  },
};

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
              HOW WE SCORE AND RANK AGENCIES
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl">
              A ranking is only worth trusting if you can check the working. This page publishes our
              full scoring rubric: the five dimensions, their exact weights, and the band an agency
              must hit for each score. Every rating on this site can be audited against the evidence
              on the agency&apos;s own profile.
            </p>
            <p className="mt-4 text-gray-500 text-xs font-mono uppercase tracking-wider">Last updated: August 2026</p>
          </div>

          <TldrSummary
            points={[
              'Every reviewed agency gets a score out of 5.0 from five weighted dimensions: verified client feedback (30%), documented results (25%), cybersecurity focus (20%), service breadth (15%), and market presence (10%).',
              'The highest-scoring agency offering a service is named our pick for that channel. There is no single Best Overall: leaders are per channel.',
              'Scores are earned from documented, checkable evidence. They cannot be bought: paid placement never affects a score, badge, or ranking.',
              'Every profile shows its score breakdown, so you can audit each rating against the evidence.',
              'Every profile is re-verified quarterly and carries a last-verified date.',
              'New submissions pay an evaluation fee that covers our research time, not the outcome. Rejected agencies are refunded.',
            ]}
          />

          {/* Scoring rubric */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; THE SCORING RUBRIC
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Each reviewed agency is scored 1 to 5 on five dimensions. The overall rating is the
              weighted average, shown to one decimal place. The weights and bands below are the
              whole system: there is no hidden adjustment, and an agency can raise its score only by
              documenting more, never by paying.
            </p>
            <div className="space-y-8">
              {SCORING_DIMENSIONS.map((d) => (
                <div key={d.key} className="border-l-4 border-white pl-5">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-lg font-black text-white uppercase">{d.name}</h3>
                    <span className="font-mono text-sm text-gray-400">{Math.round(d.weight * 100)}%</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm mb-3">{d.scoredFrom}</p>
                  <ul className="space-y-1">
                    {d.bands.map((b) => (
                      <li key={b.score} className="flex gap-3 text-sm text-gray-400">
                        <span className="font-mono text-white shrink-0">{b.score} =</span>
                        <span>{b.means}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed mt-6">
              Scores rest on evidence we can verify: published case studies, named clients, reviews
              on independent platforms, and public records. Where an agency has not documented
              something, the score reflects that absence. That is deliberate. It is the same
              standard for everyone, and any agency can improve its score by publishing verifiable
              evidence and telling us.
            </p>
          </section>

          {/* Per-channel leaders */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; PER-CHANNEL LEADERS, NOT ONE CROWN
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We do not name a single Best Overall agency, because the right agency depends on the
                channel you need. Instead, for each service channel (SEO, AI visibility, content
                marketing, PPC, PR, lead generation), the highest-scoring agency that delivers that
                service as a core offering is named our pick for the channel and carries a
                &quot;Best for&quot; badge. Core offering means the channel is one of the agency&apos;s
                three primary services: an agency does not win a channel it only offers at the margin
                of its practice, however high its overall score.
              </p>
              <p>
                Channel picks are recomputed whenever scores change: after quarterly re-verification,
                or when an agency documents new evidence. A pick is a conclusion from the rubric
                above, never a purchase.
              </p>
            </div>
          </section>

          {/* Reviewed vs Listed */}
          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; REVIEWED VS LISTED
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Reviewed agencies</strong> have been through the full
                scoring rubric above and carry a rating with a published breakdown.
              </p>
              <p>
                <strong className="text-white">Listed agencies</strong> have passed verification, which
                means we have confirmed they are a real, active agency with demonstrable cybersecurity
                work, a working website, and accurate company information, but have not yet been fully
                scored. A listing is a verified record; a rating is an assessment.
              </p>
            </div>
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
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span><strong className="text-white">Quarterly:</strong> every profile is re-checked for dead links, moved offices, rebrands, and acquisitions, and scores are re-run where the evidence has changed</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span><strong className="text-white">Continuously:</strong> corrections reported by agencies or readers are verified and applied, and material changes are recorded in the public changelog</span></li>
              </ul>
              <p>
                Profiles carry a last-verified date. If you spot something wrong,{' '}
                <Link href="/contact?reason=correction" className="text-white underline hover:text-gray-300">
                  contact us
                </Link>{' '}
                and we will check it.
              </p>
            </div>
          </section>

          {/* Rankings integrity */}
          <section className="bg-gray-950 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; RANKINGS INTEGRITY
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Scores, badges, and channel picks are editorial conclusions from the published rubric
                and are not for sale at any price. Every agency is scored against the same bands from
                the same kinds of evidence. The one paid option, a{' '}
                <Link href="#featured" className="text-white underline hover:text-gray-300">Featured</Link>{' '}
                placement, is always labelled and buys position only: it never affects a score, a badge,
                a channel pick, or how any other agency is presented.
              </p>
              <p>
                Verify our work independently: every reviewed agency profile links to third-party
                platforms like Clutch, G2, and LinkedIn, and shows the score breakdown behind its
                rating, precisely so you can check each number against the evidence.
              </p>
            </div>
          </section>

          {/* Featured listings */}
          <section id="featured" className="bg-gray-900 border-4 border-yellow-300 p-10 mb-10 scroll-mt-24">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; FEATURED LISTINGS
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Some listings are <strong className="text-white">Featured</strong>. A featured listing
                is a <strong className="text-white">paid placement</strong>: an agency pays to be shown
                at the top of the directory, with a richer profile, and it carries a{' '}
                <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-gray-400">Sponsored</span>{' '}
                label wherever it appears.
              </p>
              <p className="text-white font-bold">What a featured placement does not buy:</p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-3"><span className="text-yellow-300">&#9632;</span><span>It does not buy a score, a badge, a channel pick, or any editorial endorsement. Featured means a labelled placement, not best.</span></li>
                <li className="flex gap-3"><span className="text-yellow-300">&#9632;</span><span>It does not change how any <em>other</em> agency is scored, described, or ranked.</span></li>
                <li className="flex gap-3"><span className="text-yellow-300">&#9632;</span><span>It does not change our assessment or the facts on the featured agency&apos;s own profile, which are verified and scored the same way as everyone else&apos;s.</span></li>
              </ul>
              <p>
                A featured placement is the only paid position on the site, and it is always labelled.
                Everything outside the Featured label is editorial and is not for sale. To ask about a
                featured placement,{' '}
                <Link href="/contact?reason=featured-listing" className="text-white underline hover:text-gray-300">
                  contact us
                </Link>.
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
                verifying your claims and profiles, scoring you against the rubric above, and
                maintaining your data quarterly after you are live.
              </p>
              <p>
                <strong className="text-white">The fee buys the evaluation, not the outcome.</strong>{' '}
                Paying does not guarantee a listing, does not influence your score, and does not buy a
                badge, a channel pick, or favourable editorial language. Rankings are earned under the
                published rubric, never sold. Agencies we decline receive a full refund and a short
                explanation of why.
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
