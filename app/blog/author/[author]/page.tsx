import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllAuthors, getPostsByAuthor, slugify } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

interface Props {
  params: Promise<{ author: string }>;
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({ author: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { author: authorSlug } = await params;
  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === authorSlug);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  const title = `Articles by ${author.name} | Cybersecurity Marketing Blog`;
  const description = `Browse all ${author.postCount} ${author.postCount === 1 ? 'article' : 'articles'} by ${author.name} on cybersecurity marketing, SEO, AI visibility, and growth strategies.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.cybersecuritymarketingagencies.com/blog/author/${authorSlug}`,
      images: [
        {
          url: `https://www.cybersecuritymarketingagencies.com/api/placeholder/author-${authorSlug}/og-image?title=${encodeURIComponent(`Articles by ${author.name}`)}`,
          width: 1200,
          height: 630,
          alt: `Articles by ${author.name}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.cybersecuritymarketingagencies.com/blog/author/${authorSlug}`,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { author: authorSlug } = await params;
  const authors = getAllAuthors();
  const author = authors.find((a) => a.slug === authorSlug);

  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(authorSlug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
        name: author.name,
        item: `https://www.cybersecuritymarketingagencies.com/blog/author/${authorSlug}`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Articles by ${author.name}`,
    description: `All articles written by ${author.name} on cybersecurity marketing.`,
    url: `https://www.cybersecuritymarketingagencies.com/blog/author/${authorSlug}`,
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
            name: author.name,
          },
          url: `https://www.cybersecuritymarketingagencies.com/blog/${post.slug}`,
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <SiteNav />

      {/* Breadcrumb */}
      <div className="bg-gray-900 border-b-2 border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-4 text-sm font-mono">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              HOME
            </Link>
            <span className="text-gray-600">■</span>
            <Link href="/blog" className="text-white hover:text-gray-300 transition-colors">
              BLOG
            </Link>
            <span className="text-gray-600">■</span>
            <span className="text-gray-400">{author.name.toUpperCase()}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b-8 border-white bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block border-4 border-white bg-black px-6 py-3 mb-6">
            <span className="text-white font-mono text-sm uppercase">
              ■ AUTHOR
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            {author.name}
          </h1>
          {author.bio && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {author.bio}
            </p>
          )}
          <div className="inline-block border-4 border-white bg-black px-6 py-3">
            <span className="text-white font-mono text-lg">
              {author.postCount} {author.postCount === 1 ? 'ARTICLE' : 'ARTICLES'} PUBLISHED
            </span>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-black text-white mb-4 uppercase">
              No Articles Yet
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              This author hasn&apos;t published any articles yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block bg-white border-4 border-white text-black px-8 py-4 font-black hover:bg-gray-200 transition-all uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            ◄ All Articles
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
