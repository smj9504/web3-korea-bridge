'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { BlogPost } from '@/lib/blog-data';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const locale = useLocale() as 'en' | 'ko';
  const t = useTranslations('blog');
  
  const dateLocale = locale === 'ko' ? ko : enUS;
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy', { locale: dateLocale });

  const categoryColors: Record<BlogPost['category'], string> = {
    web3: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    blockchain: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'korea-market': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    regulation: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    technology: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    partnership: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <Link href={`/${locale}/blog/${post.slug}`}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/30 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-primary text-primary-foreground">
                  {t('filters.featured')}
                </Badge>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className={categoryColors[post.category]}>
                  {t(`categories.${post.category}`)}
                </Badge>
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title[locale]}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt[locale]}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTime} {t('post.readingTime')}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <Link href={`/${locale}/blog/${post.slug}`} className="flex flex-col h-full">
        <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/30 transition-colors" />
          {post.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground">
                {t('filters.featured')}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className={categoryColors[post.category]}>
              {t(`categories.${post.category}`)}
            </Badge>
            {post.tags.slice(0, 1).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title[locale]}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
            {post.excerpt[locale]}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="truncate max-w-[100px]">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime} {t('post.readingTime')}</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </Card>
  );
}