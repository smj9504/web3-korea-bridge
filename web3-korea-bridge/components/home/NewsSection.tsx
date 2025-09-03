'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import NewsCard from '@/components/news/NewsCard';
import { getFeaturedNews, getUrgentNews } from '@/lib/news-data';
import { ArrowRight, Newspaper } from 'lucide-react';

interface NewsSectionProps {
  locale: string;
}

export default function NewsSection({ locale }: NewsSectionProps) {
  const t = useTranslations();
  const isKorean = locale === 'ko';
  
  // Get latest featured news
  const featuredNews = getFeaturedNews().slice(0, 3);
  const urgentNews = getUrgentNews().slice(0, 1);

  if (featuredNews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isKorean ? '최신 뉴스' : 'Latest News'}
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isKorean 
                ? 'Web3 Korea Bridge의 최신 소식과 업계 동향'
                : 'Latest updates from Web3 Korea Bridge and industry trends'}
            </p>
          </div>
          
          <Link
            href={`/${locale}/news`}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            {isKorean ? '모든 뉴스 보기' : 'View All News'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Urgent News Alert */}
        {urgentNews.length > 0 && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full animate-pulse">
                {isKorean ? '속보' : 'Breaking'}
              </span>
              <div className="flex-1">
                <Link 
                  href={`/${locale}/news/${urgentNews[0].slug}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {urgentNews[0].title[isKorean ? 'ko' : 'en']}
                </Link>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {urgentNews[0].excerpt[isKorean ? 'ko' : 'en']}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredNews.map((article) => (
            <NewsCard key={article.id} article={article} locale={locale} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            {isKorean ? '모든 뉴스 보기' : 'View All News'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            {isKorean ? '최신 소식을 받아보세요' : 'Stay Updated'}
          </h3>
          <p className="text-lg opacity-90 mb-6">
            {isKorean 
              ? '뉴스레터를 구독하고 Web3 업계의 최신 동향을 놓치지 마세요'
              : 'Subscribe to our newsletter and never miss the latest Web3 trends'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={isKorean ? '이메일 주소' : 'Email address'}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              {isKorean ? '구독하기' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}