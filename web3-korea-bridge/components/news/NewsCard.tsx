'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import { NewsArticle } from '@/lib/news-data';

interface NewsCardProps {
  article: NewsArticle;
  locale: string;
}

const categoryColors = {
  company: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  industry: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  partnership: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  event: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  regulation: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

const categoryLabels = {
  en: {
    company: 'Company News',
    industry: 'Industry',
    partnership: 'Partnership',
    event: 'Event',
    regulation: 'Regulation',
  },
  ko: {
    company: '회사 소식',
    industry: '업계 동향',
    partnership: '파트너십',
    event: '이벤트',
    regulation: '규제',
  },
};

export default function NewsCard({ article, locale }: NewsCardProps) {
  const isKorean = locale === 'ko';
  const labels = categoryLabels[isKorean ? 'ko' : 'en'];

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Urgent Badge */}
      {article.urgent && (
        <div className="bg-red-500 text-white px-3 py-1 text-sm font-semibold flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {isKorean ? '속보' : 'Breaking'}
        </div>
      )}

      {/* Thumbnail */}
      {article.thumbnail && (
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={article.thumbnail}
            alt={article.title[locale === 'ko' ? 'ko' : 'en']}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5">
        {/* Header with Date and Category */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <time dateTime={article.publishedAt}>
              {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
            </time>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
            {labels[article.category]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <Link href={`/${locale}/news/${article.slug}`}>
            {article.title[locale === 'ko' ? 'ko' : 'en']}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {article.excerpt[locale === 'ko' ? 'ko' : 'en']}
        </p>

        {/* Source */}
        {article.source && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {isKorean ? '출처' : 'Source'}: {article.source}
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={`/${locale}/news/${article.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          {isKorean ? '자세히 보기' : 'Read more'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}