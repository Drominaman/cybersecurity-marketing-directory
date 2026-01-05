export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  readingTime?: number;
  metaDescription: string;
  keywords: string[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  readingTime?: number;
}
