import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { MainLayout } from '@/components/layout/main-layout'
import { AboutHero } from '@/components/about/about-hero'
import { VisionMission } from '@/components/about/vision-mission'
import { CoreValues } from '@/components/about/core-values'
import { FounderIntro } from '@/components/about/founder-intro'
import { CompanyHistory } from '@/components/about/company-history'
import { Partnerships } from '@/components/about/partnerships'

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  
  return {
    title: t('title') + ' | Web3-Korea Bridge',
    description: t('subtitle'),
    keywords: 'Web3, Korea, Bridge, About, Company, Founder, Partnership, Blockchain, 한국, 회사소개, 창업자, 파트너십',
    openGraph: {
      title: t('title') + ' | Web3-Korea Bridge',
      description: t('subtitle'),
      images: ['/og-about.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') + ' | Web3-Korea Bridge',
      description: t('subtitle'),
      images: ['/og-about.png'],
    }
  }
}

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <AboutHero />
        
        {/* Vision & Mission Section */}
        <VisionMission />
        
        {/* Core Values Section */}
        <CoreValues />
        
        {/* Founder Introduction Section */}
        <FounderIntro />
        
        {/* Company History Section */}
        <CompanyHistory />
        
        {/* Partnerships Section */}
        <Partnerships />
      </div>
    </MainLayout>
  )
}