import Link from 'next/link';
import type { Metadata } from 'next';
import TldrSummary from '@/components/TldrSummary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { agencyOfTheYear as award } from '@/lib/awards';
import { assessmentCriteria } from '@/lib/criteria';
import { breadcrumbSchema } from '@/lib/seo';

const pageUrl = `https://cybersecuritymarketingagencies.com${award.path}`;

export const metadata: Metadata = {
  title: `${award.name} ${award.year}`,
  description: `An annual award for cybersecurity marketing agencies. Free to enter, judged by an outside panel on documented ${award.year} work. Nominations close ${award.closes}.`,
  alternates: { canonical: pageUrl },
};

const nominateHref = '/contact?reason=award-nomination';

const schema = [
  breadcrumbSchema([
    { label: 'Home', url: '/' },
    { label: `Agency of the Year ${award.year}`, url: award.path },
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${award.name} ${award.year}`,
    url: pageUrl,
    description: `Rules, dates and judging for the ${award.name} award ${award.year}.`,
    dateModified: '2026-11-23',
  },
];

export default function AgencyOfTheYearPage() {
  const { winner, finalists, panel } = award;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteNav />
      <main id="main-content" className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8 font-mono text-xs uppercase tracking-wider">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              HOME
            </Link>
            <span className="text-gray-600 mx-2">&gt;</span>
            <span className="text-white">AGENCY OF THE YEAR {award.year}</span>
          </nav>

          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              {award.name} {award.year}
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl">
              An annual award for the cybersecurity marketing agency with the strongest documented
              work in {award.year}. Entry is free. An outside panel judges every entry on the same
              five dimensions we use to assess agencies in the directory.
            </p>
            <p className="mt-4 text-gray-500 text-xs font-mono uppercase tracking-wider">
              Last updated: {award.lastUpdated}
            </p>
          </div>

          <TldrSummary
            points={[
              `Nominations are open from ${award.opens} to ${award.closes}. Entry is free.`,
              'Any agency with cybersecurity client work can be nominated, whether or not it is listed in the directory.',
              `An outside panel judges entries on work delivered in ${award.workPeriod}. Nobody at this directory scores entries or chooses the winner.`,
              'This directory is run by the team behind Content Visit. Content Visit is eligible and is judged by the same panel as every other entry.',
              'A listing, a Featured placement or sponsorship has no effect on eligibility or judging.',
              `The winner is announced in ${award.announcement}.`,
            ]}
          />

          {winner && (
            <section className="bg-gray-900 border-4 border-white p-10 mb-10">
              <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
                &#9632; THE {award.year} WINNER
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  The {award.year} {award.name} is{' '}
                  {winner.slug ? (
                    <Link
                      href={`/agency/${winner.slug}`}
                      className="text-white underline hover:text-gray-300"
                    >
                      {winner.agency}
                    </Link>
                  ) : (
                    winner.agency
                  )}
                  . The panel announced its result in {winner.announced}.
                </p>
                {finalists.length > 0 && <p>Finalists: {finalists.join(', ')}.</p>}
                {winner.agency === 'Content Visit' && (
                  <p>
                    Content Visit runs this directory. The result is the outside panel&apos;s and
                    was published as the panel delivered it.
                  </p>
                )}
              </div>
            </section>
          )}

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; A DISCLOSURE FIRST
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                This directory is run by the team behind{' '}
                <Link href="/agency/content-visit" className="text-white underline hover:text-gray-300">
                  Content Visit
                </Link>
                , an agency listed here. Content Visit is eligible for this award. We chose to allow
                that, so the rules are written to keep our own entry honest.
              </p>
              <ul className="space-y-2 ml-1">
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>Content Visit enters through the same nomination form as every other agency.</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>The outside panel judges its entry. We do not score entries, break ties or change the panel&apos;s result.</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>The directory gives Content Visit no help with its entry that other entrants do not get.</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>If Content Visit wins, this page says so next to this disclosure.</span></li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; WHAT THE PANEL LOOKS AT
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The panel looks at work an agency delivered for cybersecurity clients in{' '}
              {award.workPeriod}. Each entry is judged on the five dimensions in our{' '}
              <Link href="/methodology" className="text-white underline hover:text-gray-300">
                methodology
              </Link>
              . The descriptions below are the methodology&apos;s wording. For the award, the panel
              applies them, not us.
            </p>
            <div className="space-y-5">
              {assessmentCriteria.map((c) => (
                <div key={c.name}>
                  <h3 className="text-lg font-black text-white uppercase mb-1">{c.name}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{c.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed mt-6">
              Judges score entries privately and the scores are not published. The winner and the
              finalists are named on this page.
            </p>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; WHO CAN ENTER
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <ul className="space-y-2 ml-1">
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>The agency has cybersecurity client work it can name or document.</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>It has operated as an agency for at least two years.</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>It has a working website and a LinkedIn company page.</span></li>
                <li className="flex gap-3"><span className="text-white">&#9632;</span><span>It offers at least one marketing service the directory covers.</span></li>
              </ul>
              <p>
                An agency does not need a listing in the directory. Agencies can enter themselves, and
                clients or colleagues can nominate an agency. The panel may ask a nominated agency for
                evidence before judging.
              </p>
            </div>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; WHAT IT COSTS
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Nothing. There is no entry fee, no judging fee and no fee to use the title if you win.
              </p>
              <p>
                A paid listing, a Featured placement or sponsorship does not change who is eligible,
                how an entry is judged or who wins. We do not tell the panel which agencies pay us.
              </p>
            </div>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; THE PANEL
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Judging is by an outside panel. No member has a commercial tie to an entrant, to Content
                Visit or to this directory. Each judge declares any past or present work for an entrant
                and does not score that entrant.
              </p>
              {panel.length > 0 ? (
                <ul className="space-y-2 ml-1">
                  {panel.map((p) => (
                    <li key={p.name} className="flex gap-3">
                      <span className="text-white">&#9632;</span>
                      <span>
                        {p.name}, {p.role}, {p.organisation}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>The panel members are named on this page before nominations close.</p>
              )}
            </div>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; DATES
            </h2>
            <ul className="space-y-2 ml-1 text-gray-300 leading-relaxed">
              <li className="flex gap-3"><span className="text-white">&#9632;</span><span>{award.opens}: nominations open</span></li>
              <li className="flex gap-3"><span className="text-white">&#9632;</span><span>{award.closes}: nominations close</span></li>
              <li className="flex gap-3"><span className="text-white">&#9632;</span><span>{award.judging}: judging</span></li>
              <li className="flex gap-3"><span className="text-white">&#9632;</span><span>{award.announcement}: winner and finalists announced on this page</span></li>
            </ul>
          </section>

          <section className="bg-gray-900 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; THE TITLE
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                The winner may use the title {award.name} {award.year} and link to this page. There is no
                prize money. Winning does not change how the agency is listed or ordered in the
                directory. This award is run by this directory and is not connected to any other awards
                programme.
              </p>
            </div>
          </section>

          <section className="bg-gray-950 border-4 border-white p-10 mb-10">
            <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
              &#9632; HOW TO NOMINATE
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Use the contact form and choose Agency of the Year nomination. Send the agency&apos;s
                name and website. Add the cybersecurity clients it worked for in {award.year} and the
                results you can point to, with links to case studies or reviews where they exist.
              </p>
              <p>
                Nominations that arrive after {award.closes} cannot be judged this year.
              </p>
            </div>
          </section>

          <div className="text-center">
            <Link
              href={nominateHref}
              className="bg-white text-black px-12 py-5 font-black hover:bg-gray-200 transition-all inline-flex items-center gap-2 uppercase tracking-wide text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]"
            >
              NOMINATE AN AGENCY &#9654;
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
