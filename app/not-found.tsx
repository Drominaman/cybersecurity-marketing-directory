import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SiteNav />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="text-9xl font-black text-white mb-6">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wider">
            PAGE NOT FOUND
          </h1>
          <p className="text-gray-400 font-mono mb-2">
            ■ ERROR: REQUESTED RESOURCE DOES NOT EXIST
          </p>
          <p className="text-gray-500 mb-10">
            The page you&apos;re looking for has been moved, deleted, or never existed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white text-black px-8 py-4 font-black hover:bg-gray-200 transition-all uppercase tracking-wide border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              ■ DIRECTORY HOME
            </Link>
            <Link
              href="/blog"
              className="bg-black text-white px-8 py-4 font-black hover:bg-gray-900 transition-all uppercase tracking-wide border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              ■ BLOG
            </Link>
            <Link
              href="/best-for/seo"
              className="bg-black text-white px-8 py-4 font-black hover:bg-gray-900 transition-all uppercase tracking-wide border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              ■ BROWSE SERVICES
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
