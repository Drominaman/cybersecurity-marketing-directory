import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getPostsByTag, getAllTags, slugify } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({ tag: slugify(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    };
  }

  const tagName = posts[0]?.tags.find(t => slugify(t) === tag) || tag;
  const title = `${tagName} Articles | Cybersecurity Marketing Blog`;
  const description = `Browse all ${posts.length} articles about ${tagName} in our cybersecurity marketing blog. Expert insights on SEO, content marketing, and growth strategies.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.cybersecuritymarketingagencies.com/blog/tag/${tag}`,
      images: [
        {
          url: `https://www.cybersecuritymarketingagencies.com/api/placeholder/tag-${tag}/og-image?title=${encodeURIComponent(tagName)}`,
          width: 1200,
          height: 630,
          alt: `${tagName} Articles`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.cybersecuritymarketingagencies.com/blog/tag/${tag}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  const tagName = posts[0]?.tags.find(t => slugify(t) === tag) || tag;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tagName} Articles`,
    description: `Articles about ${tagName} in cybersecurity marketing`,
    url: `https://www.cybersecuritymarketingagencies.com/blog/tag/${tag}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.cybersecuritymarketingagencies.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://www.cybersecuritymarketingagencies.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: tagName,
          item: `https://www.cybersecuritymarketingagencies.com/blog/tag/${tag}`,
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedDate,
          author: {
            '@type': 'Organization',
            name: post.author,
          },
          url: `https://www.cybersecuritymarketingagencies.com/blog/${post.slug}`,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Script
        id="tag-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Header */}
      <header className="border-b-4 border-cyan-500 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <nav className="flex items-center gap-4 text-sm font-mono">
            <Link href="/" className="text-cyan-400 hover:text-magenta-400 transition-colors">
              HOME
            </Link>
            <span className="text-gray-600">►</span>
            <Link href="/blog" className="text-cyan-400 hover:text-magenta-400 transition-colors">
              BLOG
            </Link>
            <span className="text-gray-600">►</span>
            <span className="text-gray-400">{tagName}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-8 border-magenta-500 bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block border-4 border-cyan-500 bg-black px-6 py-3 mb-6">
            <span className="text-cyan-400 font-mono text-sm uppercase">
              ► TAG
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 mb-6 uppercase tracking-tight">
            {tagName}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} about {tagName} in cybersecurity marketing.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block bg-cyan-600 border-4 border-cyan-400 text-white px-8 py-4 font-black hover:bg-cyan-500 transition-all uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            ◄ All Articles
          </Link>
        </div>
      </main>

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
