import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta } from '@/types/blog';

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
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
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
