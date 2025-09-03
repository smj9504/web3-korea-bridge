import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { blogPosts, BlogPost, searchPosts } from '@/lib/blog-data';
import { BlogPageClient } from './BlogPageClient';

const POSTS_PER_PAGE = 9;

// ISR - Revalidate every hour for better performance
export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { q = '', category = 'all', sort = 'latest', page = '1' } = await searchParams;
  
  const currentPage = parseInt(page) || 1;
  
  // Get all unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category))) as BlogPost['category'][];
  
  // Filter and sort posts on server
  let filteredPosts = [...blogPosts];
  
  // Search filter
  if (q) {
    filteredPosts = searchPosts(q, locale as 'en' | 'ko');
  }
  
  // Category filter
  if (category !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }
  
  // Sort
  switch (sort) {
    case 'featured':
      filteredPosts = filteredPosts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
    case 'popular':
      filteredPosts = filteredPosts.sort((a, b) => b.readingTime - a.readingTime);
      break;
    case 'latest':
    default:
      filteredPosts = filteredPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }
  
  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);
  
  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <BlogPageClient
      locale={locale as 'en' | 'ko'}
      initialData={{
        posts: paginatedPosts,
        categories,
        featuredPost,
        totalPages,
        searchQuery: q,
        activeCategory: category as BlogPost['category'] | 'all',
        sortBy: sort as 'latest' | 'popular' | 'featured',
        currentPage,
        totalItems: filteredPosts.length
      }}
    />
  );
}