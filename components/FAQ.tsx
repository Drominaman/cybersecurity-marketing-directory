import Link from 'next/link';
import { homepageFaqs } from '@/lib/faqs';

export { homepageFaqs };

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
