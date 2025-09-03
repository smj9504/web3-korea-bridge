'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/BlogCard';
import { blogPosts, getFeaturedPosts } from '@/lib/blog-data';
import { ArrowRight } from 'lucide-react';

export function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale();
  
  // Get the 3 most recent featured posts, or just the 3 most recent posts
  const featuredPosts = getFeaturedPosts().slice(0, 3);
  const displayPosts = featuredPosts.length > 0 
    ? featuredPosts 
    : blogPosts.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/blog`}>
            <Button size="lg" className="group">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}