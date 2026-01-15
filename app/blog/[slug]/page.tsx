import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug, getAllPosts, slugify } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImageUrl = post.coverImage ||
    `https://www.cybersecuritymarketingagencies.com/api/placeholder/${slug}/og-image?title=${encodeURIComponent(post.title)}`;

  return {
    title: `${post.title} | Cybersecurity Marketing Tips`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate || post.publishedDate,
      authors: [post.author],
      url: `https://www.cybersecuritymarketingagencies.com/blog/${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://www.cybersecuritymarketingagencies.com/blog/${post.slug}`,
    },
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl md:text-4xl font-black text-cyan-400 mb-6 mt-10 uppercase" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-black text-cyan-400 mb-4 mt-8 uppercase" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-black text-magenta-400 mb-3 mt-6 uppercase" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-300 mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-none space-y-2 mb-6 ml-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 ml-4 text-gray-300" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-300 flex items-start gap-2">
      <span className="text-cyan-400 mt-1">►</span>
      <span {...props} />
    </li>
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-magenta-400 hover:text-cyan-400 underline transition-colors" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-magenta-500 pl-4 my-6 italic text-gray-400" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-800 border border-cyan-500/30 px-2 py-1 text-sm font-mono text-cyan-300" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-900 border-2 border-cyan-500 p-4 overflow-x-auto mb-6 font-mono text-sm" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-cyan-400 font-bold" {...props} />
  ),
  hr: () => (
    <hr className="border-t-2 border-cyan-500/30 my-8" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-8">
      <img
        className="w-full border-2 border-cyan-500/50 shadow-lg"
        loading="lazy"
        {...props}
      />
      {props.alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .filter(p => p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: {
      '@type': 'ImageObject',
      url: post.coverImage || `https://www.cybersecuritymarketingagencies.com/api/placeholder/${post.slug}/og-image?title=${encodeURIComponent(post.title)}`,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cybersecurity Marketing Agencies',
      url: 'https://www.cybersecuritymarketingagencies.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.cybersecuritymarketingagencies.com/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  };

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
        name: post.title,
        item: `https://www.cybersecuritymarketingagencies.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <span className="text-gray-400 truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono mb-6">
            <time dateTime={post.publishedDate} className="text-cyan-400">
              {formattedDate}
            </time>
            {post.readingTime && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-magenta-400">{post.readingTime} min read</span>
              </>
            )}
            <span className="text-gray-600">•</span>
            <Link
              href={`/blog/author/${slugify(post.author)}`}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              {post.author}
            </Link>
            {post.updatedDate && post.updatedDate !== post.publishedDate && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-yellow-400 text-xs">
                  Updated: {new Date(post.updatedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-cyan-400 mb-6 uppercase leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-400 mb-6">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog/tag/${slugify(tag)}`}
                  className="bg-blue-900 border-2 border-cyan-500 text-cyan-300 px-3 py-1 text-xs font-bold hover:border-magenta-500 hover:text-magenta-400 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="border-4 border-cyan-500 bg-gray-900 p-6 md:p-10 mb-10">
          <div className="prose prose-invert max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-4 border-magenta-500 bg-gray-900/50 p-6 mb-10">
            <h2 className="text-xl font-black text-magenta-400 mb-6 uppercase">
              ► Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block bg-black border-2 border-cyan-500/50 p-4 hover:border-cyan-400 transition-colors"
                >
                  <h3 className="text-sm font-bold text-cyan-400 mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {related.readingTime} min read
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block bg-cyan-600 border-4 border-cyan-400 text-white px-8 py-4 font-black hover:bg-cyan-500 transition-all uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            ◄ Back to All Articles
          </Link>
        </div>
      </article>

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
