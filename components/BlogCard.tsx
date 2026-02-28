import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/types/blog';

interface BlogCardProps {
  post: BlogPostMeta;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const coverImageUrl = post.coverImage ||
    `/api/placeholder/${post.slug}/og-image?title=${encodeURIComponent(post.title)}`;

  return (
    <article className="bg-gray-900 border-4 border-white overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] transition-all relative">
      {post.featured && (
        <div className="absolute top-4 right-4 z-10 bg-gray-800 border-2 border-white text-white px-3 py-1 text-xs font-black uppercase">
          Featured
        </div>
      )}

      {/* Cover Image */}
      <div className="relative w-full h-48 bg-black border-b-4 border-white">
        <Image
          src={coverImageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400 mb-3">
            <time dateTime={post.publishedDate} className="text-white">
              {formattedDate}
            </time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span className="text-gray-300">{post.readingTime} min read</span>
              </>
            )}
            <span>•</span>
            <Link
              href={`/blog/author/${slugify(post.author)}`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {post.author}
            </Link>
          </div>

        <h2 className="text-xl font-black text-white mb-3 uppercase leading-tight hover:text-gray-300 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
      </div>

        {post.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${slugify(tag)}`}
                  className="bg-gray-800 border-2 border-white/40 text-gray-300 px-2 py-1 text-xs font-bold hover:border-white hover:text-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
              {post.tags.length > 3 && (
                <span className="text-gray-400 text-xs py-1 font-bold">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="block w-full text-center bg-white border-4 border-white text-black px-4 py-3 font-black hover:bg-gray-200 transition-all uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          ■ Read Article
        </Link>
      </div>
    </article>
  );
}
