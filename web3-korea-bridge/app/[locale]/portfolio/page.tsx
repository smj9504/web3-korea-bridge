import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/main-layout'
import { PortfolioHero } from '@/components/portfolio/portfolio-hero'
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid'
import { getPortfolioCases } from '@/lib/portfolio-data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function PortfolioPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio' })
  const cases = getPortfolioCases()
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <PortfolioHero />
      
      {/* Portfolio Grid */}
      <PortfolioGrid cases={cases} />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 group"
              leftIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            >
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  )
}