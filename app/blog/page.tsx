import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Cybersecurity Marketing Tips & Insights | Blog',
  description: 'Expert cybersecurity marketing tips, SEO strategies, AI visibility guides, and industry insights. Learn how to market your security company effectively.',
  keywords: [
    'cybersecurity marketing tips',
    'security company marketing',
    'cybersecurity SEO',
    'AI visibility marketing',
    'B2B security marketing',
    'cybersecurity content marketing',
  ],
  openGraph: {
    title: 'Cybersecurity Marketing Tips & Insights | Blog',
    description: 'Expert cybersecurity marketing tips, SEO strategies, AI visibility guides, and industry insights.',
    type: 'website',
    url: 'https://www.cybersecuritymarketingagencies.com/blog',
  },
  alternates: {
    canonical: 'https://www.cybersecuritymarketingagencies.com/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Cybersecurity Marketing Tips & Insights',
    description: 'Expert cybersecurity marketing tips, SEO strategies, AI visibility guides, and industry insights.',
    url: 'https://www.cybersecuritymarketingagencies.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Cybersecurity Marketing Agencies',
      url: 'https://www.cybersecuritymarketingagencies.com',
    },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedDate,
      author: {
        '@type': 'Organization',
        name: post.author,
      },
      url: `https://www.cybersecuritymarketingagencies.com/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Header */}
      <header className="border-b-4 border-cyan-500 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-black text-cyan-400 hover:text-magenta-400 transition-colors">
              ◄ BACK TO DIRECTORY
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-8 border-magenta-500 bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 mb-6 uppercase tracking-tight">
            Cybersecurity Marketing Tips
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Expert insights on SEO, AI visibility, content marketing, and growth strategies for cybersecurity companies.
          </p>
          <div className="inline-block border-4 border-cyan-500 bg-black px-6 py-3">
            <span className="text-cyan-400 font-mono text-lg">
              {posts.length} ARTICLES LOADED
            </span>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      {tags.length > 0 && (
        <section className="border-b-4 border-cyan-500 bg-gray-900/50 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">► TOPICS:</span>
              {tags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-900/50 border-2 border-cyan-500/50 text-cyan-300 px-3 py-1 text-xs font-bold hover:border-magenta-500 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-black text-cyan-400 mb-4 uppercase">
              Coming Soon
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              We&apos;re working on expert cybersecurity marketing content. Check back soon for tips, guides, and industry insights.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="border-t-4 border-cyan-500 bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-cyan-400 mb-4 uppercase">
            Need Help With Your Cybersecurity Marketing?
          </h2>
          <p className="text-gray-300 mb-6">
            Browse our directory to find the perfect agency for your security company.
          </p>
          <Link
            href="/"
            className="inline-block bg-magenta-600 border-4 border-magenta-400 text-white px-8 py-4 font-black hover:bg-magenta-500 transition-all uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            ► Browse Agencies
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-cyan-500 bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Cybersecurity Marketing Agencies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
