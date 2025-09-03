'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout/main-layout';
import NewsCard from '@/components/news/NewsCard';
import FeaturedNewsCard from '@/components/news/FeaturedNewsCard';
import CategoryFilter from '@/components/news/CategoryFilter';
import { getNewsArticles, getNewsByCategory, getFeaturedNews, getUrgentNews } from '@/lib/news-data';
import { NewsArticle } from '@/lib/news-data';
import { Newspaper, TrendingUp, Bell } from 'lucide-react';

interface NewsPageClientProps {
  locale: string;
}

export default function NewsPageClient({ locale }: NewsPageClientProps) {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState('all');
  const isKorean = locale === 'ko';

  // Get news data
  const allNews = getNewsArticles();
  const featuredNews = getFeaturedNews();
  const urgentNews = getUrgentNews();
  
  // Build categories with counts
  const categories = [
    { id: 'company', label: isKorean ? '회사 소식' : 'Company News', count: allNews.filter(n => n.category === 'company').length },
    { id: 'industry', label: isKorean ? '업계 동향' : 'Industry', count: allNews.filter(n => n.category === 'industry').length },
    { id: 'partnership', label: isKorean ? '파트너십' : 'Partnership', count: allNews.filter(n => n.category === 'partnership').length },
    { id: 'event', label: isKorean ? '이벤트' : 'Event', count: allNews.filter(n => n.category === 'event').length },
    { id: 'regulation', label: isKorean ? '규제' : 'Regulation', count: allNews.filter(n => n.category === 'regulation').length },
  ];

  // Filter news by category
  const displayedNews = activeCategory === 'all' 
    ? allNews 
    : getNewsByCategory(activeCategory);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Newspaper className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">{t('news.title')}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Urgent News Banner */}
      {urgentNews.length > 0 && (
        <section className="bg-red-50 border-l-4 border-red-500 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-red-600 animate-pulse" />
              <span className="font-semibold text-red-800">
                {t('news.breakingNews')}:
              </span>
              <span className="text-red-700">
                {isKorean ? urgentNews[0].title.ko : urgentNews[0].title.en}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            locale={locale}
          />
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && activeCategory === 'all' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">{t('news.featured')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.slice(0, 3).map((article) => (
                <FeaturedNewsCard
                  key={article.id}
                  article={article}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">
            {activeCategory === 'all' ? t('news.allNews') : t(`news.categories.${activeCategory}`)}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNews.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('news.newsletter.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('news.newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('news.newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              {t('news.newsletter.button')}
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}