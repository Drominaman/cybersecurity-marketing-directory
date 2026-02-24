import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav className="bg-black border-b-4 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="text-sm font-mono text-white hover:text-gray-400 transition-colors">
          ■ CYBERSEC.DIR v1.0
        </Link>
        <div className="flex items-center gap-4 text-sm font-mono">
          <Link
            href="/blog"
            className="text-gray-300 hover:text-white transition-colors"
          >
            BLOG
          </Link>
          <Link
            href="/best-cybersecurity-marketing-agency"
            className="text-gray-300 hover:text-white transition-colors"
          >
            BEST AGENCY
          </Link>
          <Link
            href="/compare"
            className="text-gray-300 hover:text-white transition-colors"
          >
            COMPARE
          </Link>
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition-colors border-2 border-white hover:border-gray-400 px-3 py-1"
          >
            DIRECTORY
          </Link>
        </div>
      </div>
    </nav>
  );
}
