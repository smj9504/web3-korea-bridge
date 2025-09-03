'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout/main-layout';
import NewsCard from '@/components/news/NewsCard';
import { getNewsBySlug, getRelatedNews } from '@/lib/news-data';
import { 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook,
  Link as LinkIcon,
  AlertCircle,
  TrendingUp,
  Newspaper
} from 'lucide-react';
import { useState } from 'react';

interface NewsDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
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

export default function NewsDetailPage({ params: { locale, slug } }: NewsDetailPageProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);
  const isKorean = locale === 'ko';
  
  const article = getNewsBySlug(slug);
  const relatedNews = article ? getRelatedNews(slug, 3) : [];
  
  if (!article) {
    notFound();
  }

  const labels = categoryLabels[isKorean ? 'ko' : 'en'];

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = article.title[isKorean ? 'ko' : 'en'];
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6 text-gray-300">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {isKorean ? '홈' : 'Home'}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/news`} className="hover:text-white transition-colors">
                {isKorean ? '뉴스' : 'News'}
              </Link>
              <span>/</span>
              <span className="text-white">{labels[article.category]}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${categoryColors[article.category]}`}>
                {labels[article.category]}
              </span>
              {article.featured && (
                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isKorean ? '주요 뉴스' : 'Featured'}
                </span>
              )}
              {article.urgent && (
                <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  {isKorean ? '속보' : 'Breaking'}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {article.title[isKorean ? 'ko' : 'en']}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={article.publishedAt} className="font-medium">
                  {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                </time>
              </div>
              {article.source && (
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  <span className="font-medium">{article.source}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-2">
              {/* Featured Image */}
              {article.thumbnail && (
                <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={article.thumbnail}
                    alt={article.title[isKorean ? 'ko' : 'en']}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              <div className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                {article.excerpt[isKorean ? 'ko' : 'en']}
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{ 
                    __html: article.content[isKorean ? 'ko' : 'en']
                      .split('\n')
                      .map(line => {
                        if (line.startsWith('## ')) {
                          return `<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">${line.substring(3)}</h2>`;
                        }
                        if (line.startsWith('### ')) {
                          return `<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">${line.substring(4)}</h3>`;
                        }
                        if (line.startsWith('- ')) {
                          return `<li class="ml-6 mb-2">${line.substring(2)}</li>`;
                        }
                        if (line.trim() === '') {
                          return '<br />';
                        }
                        return `<p class="mb-4">${line}</p>`;
                      })
                      .join('')
                  }}
                />
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {isKorean ? '태그' : 'Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {isKorean ? '공유하기' : 'Share this article'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5" />
                    {copied ? (isKorean ? '복사됨!' : 'Copied!') : (isKorean ? '링크 복사' : 'Copy Link')}
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Back to News */}
                <Link
                  href={`/${locale}/news`}
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {isKorean ? '뉴스 목록으로' : 'Back to News'}
                </Link>

                {/* Related News */}
                {relatedNews.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      {isKorean ? '관련 뉴스' : 'Related News'}
                    </h3>
                    <div className="space-y-4">
                      {relatedNews.map((relatedArticle) => (
                        <div key={relatedArticle.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${categoryColors[relatedArticle.category]}`}>
                            {labels[relatedArticle.category]}
                          </span>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            <Link href={`/${locale}/news/${relatedArticle.slug}`}>
                              {relatedArticle.title[isKorean ? 'ko' : 'en']}
                            </Link>
                          </h4>
                          <time className="text-sm text-gray-500 dark:text-gray-400">
                            {format(new Date(relatedArticle.publishedAt), 'MMM dd, yyyy')}
                          </time>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter CTA */}
                <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    {isKorean ? '최신 소식 받기' : 'Stay Updated'}
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    {isKorean 
                      ? '뉴스레터를 구독하고 Web3 업계 소식을 받아보세요'
                      : 'Subscribe to our newsletter for the latest Web3 news'}
                  </p>
                  <Link
                    href="#newsletter"
                    className="inline-block px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {isKorean ? '구독하기' : 'Subscribe'}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}