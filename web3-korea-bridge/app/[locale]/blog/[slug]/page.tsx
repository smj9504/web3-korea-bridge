import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, blogPosts } from '@/lib/blog-data';
import { BlogDetailClient } from './BlogDetailClient';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: post.title.en,
    description: post.excerpt.en,
    openGraph: {
      title: post.title.en,
      description: post.excerpt.en,
      images: [post.thumbnail],
    },
  };
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <BlogDetailClient 
      post={post} 
      relatedPosts={relatedPosts}
      locale={locale as 'en' | 'ko'}
    />
  );
}