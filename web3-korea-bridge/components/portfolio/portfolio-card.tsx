'use client'

import { motion } from 'framer-motion'
import { PortfolioCase } from '@/lib/portfolio-data'
import { Calendar, Award, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface PortfolioCardProps {
  caseStudy: PortfolioCase
  locale: 'ko' | 'en'
  index: number
}

const categoryColors: Record<string, string> = {
  'market-entry': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'partnership': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'investment': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  'legal': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  'marketing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
}

const categoryLabels = {
  'market-entry': { ko: '시장 진출', en: 'Market Entry' },
  'partnership': { ko: '파트너십', en: 'Partnership' },
  'investment': { ko: '투자 유치', en: 'Investment' },
  'legal': { ko: '법률 지원', en: 'Legal Support' },
  'marketing': { ko: '마케팅', en: 'Marketing' },
}

export function PortfolioCard({ caseStudy, locale, index }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${caseStudy.featured ? 'border-primary border-2' : ''}`}>
        <CardContent className="p-6">
          {/* Featured Badge */}
          {caseStudy.featured && (
            <Badge className="mb-4 bg-primary text-white">
              {locale === 'ko' ? '주요 사례' : 'Featured'}
            </Badge>
          )}

          {/* Category Badge */}
          <Badge variant="secondary" className={`mb-4 ${categoryColors[caseStudy.project.category]}`}>
            {categoryLabels[caseStudy.project.category][locale]}
          </Badge>

          {/* Client Name */}
          <h3 className="text-xl font-bold mb-2">
            {caseStudy.client.anonymous 
              ? (locale === 'ko' ? '비공개 클라이언트' : 'Confidential Client')
              : caseStudy.client.name
            }
          </h3>

          {/* Project Title */}
          <h4 className="text-lg font-semibold text-muted-foreground mb-4">
            {caseStudy.project.title[locale]}
          </h4>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{caseStudy.project.duration}</span>
          </div>

          {/* Primary Result */}
          <div className="mb-4 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
            <div className="flex items-start gap-2">
              <Award className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-primary">
                  {caseStudy.results.primary[locale]}
                </p>
                {/* Metrics */}
                {caseStudy.results.metrics && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseStudy.results.metrics.map((metric, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Story Brief */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {caseStudy.story.brief[locale]}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {caseStudy.story.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}