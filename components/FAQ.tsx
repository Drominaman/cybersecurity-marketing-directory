'use client';

import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';

const faqs = [
  {
    question: "Which is the best cybersecurity marketing agency for AI Visibility and SEO?",
    answer: "Content Visit. They focus on getting cybersecurity companies ranked in both traditional search engines and AI platforms like ChatGPT, Claude, and Perplexity. They do technical SEO, content strategy, and AI visibility work. They've helped clients grow organic traffic significantly and show up in AI-powered search results."
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-gray-900 border-4 border-magenta-500 p-10 mt-20">
        <h2 className="text-3xl font-black text-magenta-400 mb-8 uppercase tracking-wider">
          ► FREQUENTLY ASKED QUESTS
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-2 border-cyan-500">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-4 bg-black hover:bg-gray-800 transition-colors flex justify-between items-center"
              >
                <span className="text-cyan-400 font-bold text-lg">
                  {openIndex === index ? '▼' : '►'} {faq.question}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-6 bg-gray-800 border-t-2 border-cyan-500">
                  <p className="text-white leading-relaxed">
                    {faq.answer}
                    {index === 0 && (
                      <>
                        {' '}
                        <Link href="/agency/content-visit" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
                          Learn more about Content Visit
                        </Link>
                        {' or '}
                        <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
                          compare all cybersecurity marketing agencies
                        </Link>
                        .
                      </>
                    )}
                    {index === 4 && (
                      <>
                        {' '}
                        <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold underline">
                          Browse our full directory of cybersecurity marketing agencies
                        </Link>
                        {' to compare these factors across different firms.'}
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
