'use client'

import { PortfolioCase } from '@/lib/portfolio-data'
import { PortfolioCard } from './portfolio-card'
import { useLocale } from 'next-intl'

interface PortfolioGridProps {
  cases: PortfolioCase[]
}

export function PortfolioGrid({ cases }: PortfolioGridProps) {
  const locale = useLocale() as 'ko' | 'en'

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseStudy, index) => (
            <PortfolioCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}