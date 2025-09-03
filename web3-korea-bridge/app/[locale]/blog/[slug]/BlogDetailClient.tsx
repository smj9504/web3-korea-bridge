'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import { BlogPost } from '@/lib/blog-data';
import { Container } from '@/components/layout/main-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogContent } from '@/components/blog/BlogContent';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogNewsletter } from '@/components/blog/BlogNewsletter';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: 'en' | 'ko';
}

export function BlogDetailClient({ post, relatedPosts, locale }: BlogDetailClientProps) {
  const t = useTranslations('blog');
  const currentLocale = useLocale() as 'en' | 'ko';
  
  const dateLocale = currentLocale === 'ko' ? ko : enUS;
  const formattedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy', { locale: dateLocale });

  const categoryColors: Record<BlogPost['category'], string> = {
    web3: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    blockchain: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'korea-market': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    regulation: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    technology: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    partnership: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent">
        <Container className="pt-24 lg:pt-28 pb-8">
          <Link href={`/${currentLocale}/blog`}>
            <Button variant="outline" size="sm" className="mb-6 border-gray-300 text-gray-700 hover:bg-gray-100" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              {t('post.backToBlog')}
            </Button>
          </Link>

          <div className="max-w-4xl">
            {/* Category and Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge variant="secondary" className={categoryColors[post.category]}>
                {t(`categories.${post.category}`)}
              </Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title[currentLocale]}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{post.author.name}</p>
                  <p className="text-sm">{post.author.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} {t('post.readingTime')}</span>
                </div>
              </div>

              <div className="ml-auto">
                <ShareButtons 
                  url={`/${currentLocale}/blog/${post.slug}`}
                  title={post.title[currentLocale]}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="max-w-4xl">
            <BlogContent content={post.content[currentLocale]} />
          </div>

          {/* Sidebar with Table of Contents */}
          <aside className="hidden lg:block">
            <TableOfContents content={post.content[currentLocale]} />
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t">
            <h2 className="text-2xl font-bold mb-8">{t('post.relatedPosts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-20">
          <BlogNewsletter />
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('cta.description')}
            </p>
            <Link href={`/${currentLocale}/contact`}>
              <Button size="lg">
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}