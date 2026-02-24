import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-gray-950 border-t-8 border-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">■ BROWSE</h3>
            <div className="space-y-2 text-sm font-mono">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">Directory</Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/best-cybersecurity-marketing-agency" className="block text-gray-400 hover:text-white transition-colors">Best Agency Guide</Link>
              <Link href="/submit-agency" className="block text-gray-400 hover:text-white transition-colors">Submit Agency</Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">■ BY SERVICE</h3>
            <div className="space-y-2 text-sm font-mono">
              <Link href="/best-for/seo" className="block text-gray-400 hover:text-white transition-colors">SEO</Link>
              <Link href="/best-for/ai-visibility" className="block text-gray-400 hover:text-white transition-colors">AI Visibility</Link>
              <Link href="/best-for/content-marketing" className="block text-gray-400 hover:text-white transition-colors">Content Marketing</Link>
              <Link href="/best-for/pr-media-relations" className="block text-gray-400 hover:text-white transition-colors">PR & Media</Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">■ BY REGION</h3>
            <div className="space-y-2 text-sm font-mono">
              <Link href="/location/usa" className="block text-gray-400 hover:text-white transition-colors">United States</Link>
              <Link href="/location/europe" className="block text-gray-400 hover:text-white transition-colors">Europe</Link>
              <Link href="/location/uk" className="block text-gray-400 hover:text-white transition-colors">United Kingdom</Link>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-gray-800 pt-6">
          <p className="text-gray-500 font-mono text-sm mb-2">
            ■ GAME OVER ■
          </p>
          <p className="text-gray-600 text-xs uppercase tracking-wider font-bold">
            &copy; {new Date().getFullYear()} CYBERSEC.DIR // INSERT COIN TO CONTINUE
          </p>
        </div>
      </div>
    </footer>
  );
}
