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
    <article className="bg-gray-900 border-4 border-cyan-500 overflow-hidden hover:border-magenta-500 hover:shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] transition-all relative">
      {post.featured && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-900/40 border-2 border-yellow-600/60 text-yellow-300 px-3 py-1 text-xs font-black uppercase">
          Featured
        </div>
      )}

      {/* Cover Image */}
      <div className="relative w-full h-48 bg-black border-b-4 border-cyan-500">
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
            <time dateTime={post.publishedDate} className="text-cyan-400">
              {formattedDate}
            </time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span className="text-magenta-400">{post.readingTime} min read</span>
              </>
            )}
          </div>

        <h2 className="text-xl font-black text-cyan-400 mb-3 uppercase leading-tight hover:text-magenta-400 transition-colors">
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
                  className="bg-blue-900 border-2 border-cyan-500 text-cyan-300 px-2 py-1 text-xs font-bold hover:border-magenta-500 hover:text-magenta-400 transition-colors"
                >
                  {tag}
                </Link>
              ))}
              {post.tags.length > 3 && (
                <span className="text-green-400 text-xs py-1 font-bold">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="block w-full text-center bg-cyan-600 border-4 border-cyan-400 text-white px-4 py-3 font-black hover:bg-cyan-500 transition-all uppercase text-xs tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          ► Read Article
        </Link>
      </div>
    </article>
  );
}
