import NewsPageClient from './NewsPageClient';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// ISR - Revalidate every 30 minutes for news
export const revalidate = 1800;

interface NewsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  
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

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  
  return <NewsPageClient locale={locale} />;
}