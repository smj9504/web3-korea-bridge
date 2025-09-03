'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, ArrowRight, AlertCircle, TrendingUp } from 'lucide-react';
import { NewsArticle } from '@/lib/news-data';

interface FeaturedNewsCardProps {
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

export default function FeaturedNewsCard({ article, locale }: FeaturedNewsCardProps) {
  const isKorean = locale === 'ko';
  const labels = categoryLabels[isKorean ? 'ko' : 'en'];

  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Featured Badge */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
        <TrendingUp className="w-4 h-4" />
        {isKorean ? '주요 뉴스' : 'Featured'}
      </div>

      {/* Urgent Badge */}
      {article.urgent && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg animate-pulse">
          <AlertCircle className="w-4 h-4" />
          {isKorean ? '속보' : 'Breaking'}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="relative h-64 md:h-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={article.thumbnail}
              alt={article.title[locale === 'ko' ? 'ko' : 'en']}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 flex flex-col justify-between">
          {/* Header with Date and Category */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishedAt} className="font-medium">
                  {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                </time>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColors[article.category]}`}>
                {labels[article.category]}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              <Link href={`/${locale}/news/${article.slug}`}>
                {article.title[locale === 'ko' ? 'ko' : 'en']}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {article.excerpt[locale === 'ko' ? 'ko' : 'en']}
            </p>

            {/* Source */}
            {article.source && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="font-medium">{isKorean ? '출처' : 'Source'}:</span> {article.source}
              </div>
            )}
          </div>

          {/* Read More Link */}
          <Link
            href={`/${locale}/news/${article.slug}`}
            className="inline-flex items-center gap-2 text-base font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
          >
            {isKorean ? '전체 기사 읽기' : 'Read full article'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}