import AgencySearch from '@/components/AgencySearch';
import AuthorByline from '@/components/AuthorByline';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';
import { getAllAgencies } from '@/lib/agencies';

export default function Home() {
  const allAgencies = getAllAgencies();

  const allServices = Array.from(
    new Set(allAgencies.flatMap(a => a.services))
  ).sort();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cybersecurity Marketing Agencies Directory",
    "description": "The ultimate directory of specialized cybersecurity marketing agencies offering SEO, AI Visibility, content marketing, PPC, PR, and demand generation services for security companies.",
    "numberOfItems": allAgencies.length,
    "itemListElement": allAgencies.map((agency, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": agency.name,
        "description": agency.description,
        "url": agency.website,
        ...(agency.rating && {
          "review": {
            "@type": "Review",
            "author": {
              "@type": "Organization",
              "name": "Cybersecurity Marketing Agencies"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": agency.rating,
              "bestRating": "5"
            }
          }
        })
      }
    }))
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cybersecurity Marketing Agencies",
    "url": "https://www.cybersecuritymarketingagencies.com",
    "description": "The ultimate directory of specialized cybersecurity marketing agencies. Find the best cybersecurity marketing agencies for AI Visibility, SEO, content marketing, and PR.",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".text-white"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="min-h-screen bg-black">
        <SiteNav />

        {/* Hero Header */}
        <header className="bg-gray-950 border-b-8 border-white relative">
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)'}}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-wider mb-4">
              CYBERSECURITY MARKETING AGENCIES 2026
            </h1>
            <div className="flex items-center gap-4 text-white font-mono">
              <span>&#9632;</span>
              <p className="text-base md:text-lg">
                The ultimate directory of specialized cybersecurity marketing agencies
              </p>
            </div>
            <AuthorByline variant="full" lastUpdated="February 2026" />
          </div>
        </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Introduction Section - Keyword Rich */}
        <div className="mb-12 bg-gray-900 border-4 border-white p-8">
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
            &#9632; Find the Best Cybersecurity Marketing Agencies
          </h2>
          <div className="text-white space-y-4 text-lg leading-relaxed">
            <p>
              This is a directory of cybersecurity marketing agencies for 2026. Whether you&apos;re looking for a cybersecurity marketing company, firm, or full-service agency, we&apos;ve got you covered. The cybersecurity market is projected to reach{' '}
              <a href="https://cybersecurityventures.com/cybersecurity-market-report/" target="_blank" rel="noopener" className="underline hover:text-gray-300">$10.5 trillion in annual cybercrime costs by 2025</a> according to Cybersecurity Ventures, making effective cybersecurity marketing services critical for security vendors. If you run a cybersecurity startup, MSSP, or enterprise security vendor, you need a marketing partner who gets your space.
            </p>
            <p>
              Marketing security products is hard. You&apos;re dealing with complex tech, long sales cycles, and technical buyers. Every cyber security marketing agency in this directory has been vetted through{' '}
              <a href="https://clutch.co/agencies/digital-marketing/cybersecurity" target="_blank" rel="noopener" className="underline hover:text-gray-300">third-party review platforms like Clutch</a>,{' '}
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener" className="underline hover:text-gray-300">LinkedIn company profiles</a>, and documented client results.
            </p>
            <p className="text-white font-bold">
              &#9632; Browse the directory below and find the right partner for your security company.
            </p>
          </div>
        </div>

        {/* Best Agency CTA */}
        <div className="mb-12 bg-gray-900 border-4 border-white p-8 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-wider">
                &#9733; WHO IS THE BEST CYBERSECURITY MARKETING AGENCY?
              </h2>
              <p className="text-white text-base">
                Read our comprehensive guide comparing the top agencies for AI Visibility, SEO, and content marketing
              </p>
            </div>
            <Link
              href="/best-cybersecurity-marketing-agency"
              className="bg-white text-black px-8 py-4 font-black uppercase tracking-wider border-4 border-gray-200 hover:bg-gray-200 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] whitespace-nowrap"
            >
              VIEW GUIDE →
            </Link>
          </div>
        </div>

        {/* Client Island: Search/Filter + Agency Grid */}
        <AgencySearch agencies={allAgencies} allServices={allServices} />

        {/* Comparison Table */}
        {allAgencies.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-wider">
              &#9632; STATS COMPARISON
            </h2>
            <p className="text-white mb-4 font-mono">
              COMPARE ALL AGENCIES SIDE-BY-SIDE
            </p>
            <p className="text-gray-300 mb-10">
              Compare all cybersecurity marketing agencies side-by-side.
            </p>
            <ComparisonTable agencies={allAgencies} />
          </div>
        )}

        {/* SEO Content Section */}
        <div className="mt-20 prose prose-lg max-w-none">
          <div className="bg-gray-900 border-4 border-white p-10">
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">
              &#9632; How to Choose the Best Cybersecurity Marketing Agencies
            </h2>
            <div className="text-white space-y-6 text-base">
              <p>
                Picking the right cybersecurity marketing agency matters. Whether you call it a cybersecurity marketing company, a cyber security marketing firm, or a marketing services provider - the key is finding a partner with real security industry experience. The sales cycles are long, the products are technical, and you need someone who&apos;s worked in this space before. Here&apos;s what to look for:
              </p>

              <h3 className="text-xl font-black text-white mt-8 mb-4 uppercase tracking-wider border-b-2 border-white pb-2">
                → WHAT TO LOOK FOR
              </h3>

              <ul className="space-y-3 list-none pl-0">
                <li className="text-gray-300">
                  <strong className="text-white">&#9632; Industry Experience:</strong> Agencies with proven cybersecurity marketing experience.
                  They must understand technical specs, compliance requirements, and buyer personas.
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">&#9632; Service Range:</strong> Verify they offer the capabilities you need:
                  SEO, content, PPC, PR, or full-service programmes.
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">&#9632; Track Record:</strong> Review their results with other security companies.
                  Look for concrete outcomes: lead volume, traffic growth, pipeline impact.
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">&#9632; Technical Depth:</strong> Must translate complex security concepts into messages
                  that resonate with both technical and business buyers.
                </li>
                <li className="text-gray-300">
                  <strong className="text-white">&#9632; Budget Fit:</strong> Different agencies serve different company stages.
                  Match their pricing and engagement model to your budget and growth goals.
                </li>
              </ul>

              <h3 className="text-xl font-black text-white mt-8 mb-4 uppercase tracking-wider border-b-2 border-white pb-2">
                → CORE SERVICES TO EXPECT
              </h3>

              <ul className="space-y-2 list-none pl-0 border-l-4 border-white pl-6">
                <li className="text-gray-300">&#9632; <Link href="/blog/cybersecurity-seo-agency" className="underline hover:text-gray-400">Search Engine Optimization (SEO)</Link> for security keywords</li>
                <li className="text-gray-300">&#9632; <Link href="/blog/cybersecurity-content-marketing-agency" className="underline hover:text-gray-400">Content marketing</Link> and thought leadership programmes</li>
                <li className="text-gray-300">&#9632; Pay-per-click (PPC) advertising on Google and LinkedIn</li>
                <li className="text-gray-300">&#9632; Public relations and media campaigns</li>
                <li className="text-gray-300">&#9632; Account-based marketing (ABM) for enterprise accounts</li>
                <li className="text-gray-300">&#9632; Social media management</li>
                <li className="text-gray-300">&#9632; Website design and development</li>
                <li className="text-gray-300">&#9632; Marketing automation and lead nurture</li>
              </ul>

              <p className="mt-8 text-white font-semibold border-t-2 border-white pt-6">
                <span className="text-white">&#9632;</span> Every agency here has worked with security companies. Compare them, check their case studies, and pick the one that fits your budget and needs.
              </p>
            </div>
          </div>
        </div>

        {/* Service Links for SEO */}
        <div className="bg-gray-900 border-4 border-white p-10 mt-20">
          <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">
            &#9632; BROWSE BY SERVICE
          </h2>
          <p className="text-gray-300 mb-6">
            Find the best cybersecurity marketing agency for your specific needs.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/best-for/seo"
              className="bg-black border-2 border-white/20 p-4 hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; BEST FOR SEO
              </div>
              <div className="text-gray-400 text-sm mt-1">Search engine optimization experts</div>
            </Link>

            <Link
              href="/best-for/ai-visibility"
              className="bg-black border-2 border-white/20 p-4 hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; BEST FOR AI VISIBILITY
              </div>
              <div className="text-gray-400 text-sm mt-1">AI search and GEO specialists</div>
            </Link>

            <Link
              href="/best-for/content-marketing"
              className="bg-black border-2 border-white/20 p-4 hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; BEST FOR CONTENT
              </div>
              <div className="text-gray-400 text-sm mt-1">Content marketing specialists</div>
            </Link>

            <Link
              href="/best-for/pr-media-relations"
              className="bg-black border-2 border-white/20 p-4 hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; BEST FOR PR
              </div>
              <div className="text-gray-400 text-sm mt-1">Media relations and PR experts</div>
            </Link>

            <Link
              href="/best-for/lead-generation"
              className="bg-black border-2 border-white/20 p-4 hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; BEST FOR LEAD GEN
              </div>
              <div className="text-gray-400 text-sm mt-1">Demand generation specialists</div>
            </Link>

            <Link
              href="/best-for/ppc"
              className="bg-black border-2 border-white/20 p-4 hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; BEST FOR PPC
              </div>
              <div className="text-gray-400 text-sm mt-1">Paid advertising experts</div>
            </Link>
          </div>
        </div>

        {/* Location Links for GEO SEO */}
        <div className="bg-gray-900 border-4 border-white p-10 mt-20">
          <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">
            &#9632; BROWSE BY REGION
          </h2>
          <p className="text-gray-300 mb-6">
            Filter by region if you want an agency that knows your local market.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/location/usa"
              className="bg-black border-2 border-white/20 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; UNITED STATES
              </div>
              <div className="text-gray-400 text-sm mt-1">View US agencies</div>
            </Link>

            <Link
              href="/location/europe"
              className="bg-black border-2 border-white/20 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; EUROPE
              </div>
              <div className="text-gray-400 text-sm mt-1">View European agencies</div>
            </Link>

            <Link
              href="/location/uk"
              className="bg-black border-2 border-white/20 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; UNITED KINGDOM
              </div>
              <div className="text-gray-400 text-sm mt-1">View UK agencies</div>
            </Link>
          </div>
        </div>

        {/* Audience/Niche Links */}
        <div className="bg-gray-900 border-4 border-white p-10 mt-20">
          <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">
            &#9632; BROWSE BY AUDIENCE
          </h2>
          <p className="text-gray-300 mb-6">
            Find the right cybersecurity marketing agency for your company type.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/best-for-audience/startups"
              className="bg-black border-2 border-white/20 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; STARTUPS
              </div>
              <div className="text-gray-400 text-sm mt-1">Agencies for early-stage cyber companies</div>
            </Link>

            <Link
              href="/best-for-audience/enterprise"
              className="bg-black border-2 border-white/20 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; ENTERPRISE
              </div>
              <div className="text-gray-400 text-sm mt-1">Agencies for Fortune 500 security vendors</div>
            </Link>

            <Link
              href="/best-for-audience/mssp"
              className="bg-black border-2 border-white/20 p-4 text-center hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] group"
            >
              <div className="text-white font-black text-lg group-hover:text-gray-300">
                &#9632; MSSPs
              </div>
              <div className="text-gray-400 text-sm mt-1">Agencies for managed security providers</div>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </main>

        <SiteFooter />
      </div>
    </>
  );
}
