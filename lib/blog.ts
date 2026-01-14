import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta, Author, TagMeta } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));

  const posts = files.map(filename => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      author: data.author || 'Cybersecurity Marketing Agencies',
      publishedDate: data.publishedDate,
      updatedDate: data.updatedDate,
      tags: data.tags || [],
      featured: data.featured || false,
      coverImage: data.coverImage,
      readingTime: calculateReadingTime(content),
    } as BlogPostMeta;
  });

  return posts.sort((a, b) =>
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    author: data.author || 'Cybersecurity Marketing Agencies',
    publishedDate: data.publishedDate,
    updatedDate: data.updatedDate,
    tags: data.tags || [],
    featured: data.featured || false,
    coverImage: data.coverImage,
    readingTime: calculateReadingTime(content),
    metaDescription: data.metaDescription || data.excerpt,
    keywords: data.keywords || data.tags || [],
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''));
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPosts().filter(post => post.featured);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter(post =>
    post.tags.some(t => slugify(t) === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

// Helper function to create URL-safe slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get all authors with metadata
export function getAllAuthors(): Author[] {
  const posts = getAllPosts();
  const authorMap = new Map<string, number>();

  posts.forEach(post => {
    const current = authorMap.get(post.author) || 0;
    authorMap.set(post.author, current + 1);
  });

  return Array.from(authorMap.entries()).map(([name, count]) => ({
    name,
    slug: slugify(name),
    bio: '', // Can be enhanced later with author metadata
    postCount: count,
  }));
}

// Get posts by author
export function getPostsByAuthor(authorSlug: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter(post => slugify(post.author) === authorSlug);
}

// Get tag metadata with post counts
export function getTagsWithCounts(): TagMeta[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({
      name,
      slug: slugify(name),
      postCount: count,
    }))
    .sort((a, b) => b.postCount - a.postCount);
}

// Get related posts (more sophisticated version)
export function getRelatedPosts(currentPost: BlogPostMeta, limit = 3): BlogPostMeta[] {
  const allPosts = getAllPosts().filter(p => p.slug !== currentPost.slug);

  // Score posts by tag overlap
  const scored = allPosts.map(post => {
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    return { post, score: commonTags.length };
  });

  return scored
    .filter(item => item.score > 0) // Only posts with at least one common tag
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

// Search posts by query
export function searchPosts(query: string): BlogPostMeta[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllPosts().filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
