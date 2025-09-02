'use client'

import React from 'react'
import { useTranslations } from '@/lib/translations'
import { motion } from 'framer-motion'

export function PortfolioSection() {
  const t = useTranslations('portfolio')

  // Mock data - will be replaced with actual data from database
  const portfolioItems = [
    {
      id: 1,
      title: 'Global DeFi Platform Korea Launch',
      category: 'partnership',
      description: 'Successfully launched a major DeFi platform in Korea with strategic partnerships',
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: 'NFT Marketplace Localization',
      category: 'consulting',
      description: 'Complete localization and market entry strategy for leading NFT marketplace',
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      title: 'Korea Blockchain Week 2024',
      category: 'event',
      description: 'Organized major blockchain conference with 1000+ attendees',
      image: '/api/placeholder/400/300'
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden hover-lift"
            >
              <div className="h-48 bg-gradient-web3" />
              <div className="p-6">
                <span className="text-xs font-semibold text-primary uppercase">
                  {t(`category.${item.category}`)}
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}