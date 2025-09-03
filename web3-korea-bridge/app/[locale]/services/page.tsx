import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { MainLayout } from '@/components/layout/main-layout'
import { ServicesHero } from '@/components/services/services-hero'
import { ServiceCategories } from '@/components/services/service-categories'
import { ServiceProcess } from '@/components/services/service-process'
import { ServicesFAQ } from '@/components/services/services-faq'
import { ServicesContact } from '@/components/services/services-contact'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  
  return {
    title: t('title') + ' | Web3-Korea Bridge',
    description: t('subtitle'),
    keywords: 'Web3, Korea, Services, Market Entry, Partnership, Business Development, Legal Support, Marketing, Investment, 한국, 서비스, 시장진출, 파트너십, 비즈니스개발',
    openGraph: {
      title: t('title') + ' | Web3-Korea Bridge',
      description: t('subtitle'),
      images: ['/og-services.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') + ' | Web3-Korea Bridge',
      description: t('subtitle'),
      images: ['/og-services.png'],
    }
  }
}

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <ServicesHero />
        
        {/* Service Categories Section */}
        <ServiceCategories />
        
        {/* Service Process Section */}
        <ServiceProcess />
        
        {/* FAQ Section */}
        <ServicesFAQ />
        
        {/* Contact CTA Section */}
        <ServicesContact />
      </div>
    </MainLayout>
  )
}