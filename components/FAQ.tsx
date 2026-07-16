import Link from 'next/link';

export const homepageFaqs = [
  {
    question: "Which is the best cybersecurity marketing agency?",
    answer: "There is no single best cybersecurity marketing agency, and we do not crown one. The right choice depends on your primary channel, stage, and budget, so we list agencies neutrally and let you compare them on documented results. Different agencies focus on different channels: Hop AI and others on PPC, Team Lewis and specialist firms on enterprise PR, Everclear on positioning, Merritt Group and Highwire on thought leadership, Envy on demand generation, Content Visit on SEO and AI visibility. Compare the listings yourself. We do not assign numeric scores. See our methodology page for how we assess agencies."
  },
  {
    question: "Which is the best cybersecurity marketing agency for AI Visibility and SEO?",
    answer: "We do not crown a leader for AI Visibility and SEO - we leave the comparison to you. Several agencies are active here: Content Visit offers GEO (Generative Engine Optimisation) alongside traditional SEO across ChatGPT, Claude, Perplexity, and Gemini; Hop AI offers GEO through its proprietary GEO Forge tooling, particularly alongside paid media. Compare the listings and their documented work yourself."
  },
  {
    question: "Which agency should I hire for cybersecurity marketing?",
    answer: "The right agency depends on your needs, and we name no single leader. For PPC and paid advertising, agencies like Hop AI; for global enterprise PR, Team Lewis; for positioning and messaging, Everclear; for SEO, content, and AI visibility, Content Visit and others. Browse the directory and compare the listings for your specific requirements."
  },
  {
    question: "What do cybersecurity marketing agencies do?",
    answer: "They market security products and services. Unlike general marketing agencies, they actually understand how to talk about security tech. They know how to reach CISOs and IT decision-makers. Services include SEO, content marketing, PPC, PR, and demand gen - all built for the security space."
  },
  {
    question: "How much do cybersecurity marketing agencies cost?",
    answer: "Most charge $5,000 to $15,000 per month on retainer. It depends on what you need, agency size, and location. Some do project-based pricing. Enterprise agencies can run $20,000+ per month for full programs."
  },
  {
    question: "Why hire a cybersecurity-specific marketing agency?",
    answer: "Because they get the industry. They understand technical features, compliance stuff, and how to actually reach security buyers. They know the terminology and the long sales cycles. A general agency will struggle with this - security marketing is different."
  },
  {
    question: "What should I look for in cybersecurity marketing agencies?",
    answer: "Check if they've worked with other security companies. Look at their case studies and actual results. Make sure they understand your tech and target market (SMB vs Enterprise). See if they know the channels that work - LinkedIn, trade pubs, conferences. Best ones also know AI Visibility and modern SEO."
  },
  {
    question: "How long does it take to see results from cybersecurity marketing agencies?",
    answer: "SEO and content take 3-6 months to show results. PPC can generate leads in weeks. PR and thought leadership take 6-12 months to build momentum. Most agencies want a 6-month minimum commitment because it takes time."
  },
  {
    question: "Do cybersecurity marketing agencies work with startups?",
    answer: "Yes. Some specialize in early-stage security companies and offer flexible pricing. If you're a startup, find one with experience launching security products who gets the startup world and has realistic expectations about timeline and budget."
  }
];

const faqs = homepageFaqs;

export default function FAQ() {
  return (
    <>
      <div className="bg-gray-900 border-4 border-white p-10 mt-20">
        <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-wider">
          ■ FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="border-2 border-white group">
              <summary className="w-full text-left p-4 bg-black hover:bg-gray-800 transition-colors cursor-pointer list-none flex justify-between items-center [&::-webkit-details-marker]:hidden">
                <span className="text-white font-bold text-lg">
                  <span className="group-open:hidden">■</span>
                  <span className="hidden group-open:inline">▼</span>
                  {' '}{faq.question}
                </span>
              </summary>
              <div className="p-6 bg-gray-800 border-t-2 border-white">
                <p className="text-white leading-relaxed">
                  {faq.answer}
                  {index === 0 && (
                    <>
                      {' '}
                      <Link href="/best-cybersecurity-marketing-agency" className="text-gray-300 hover:text-white font-bold underline">
                        Read our complete guide on the best cybersecurity marketing agencies
                      </Link>
                      {' or '}
                      <Link href="/" className="text-gray-300 hover:text-white font-bold underline">
                        browse the full directory to compare agencies
                      </Link>
                      .
                    </>
                  )}
                  {index === 6 && (
                    <>
                      {' '}
                      <Link href="/" className="text-gray-300 hover:text-white font-bold underline">
                        Browse our full directory of cybersecurity marketing agencies
                      </Link>
                      {' to compare these factors across different firms.'}
                    </>
                  )}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
