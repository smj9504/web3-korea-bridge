'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, Users, Trophy } from 'lucide-react'

export function PortfolioHero() {
  const t = useTranslations('portfolio')

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Briefcase className="w-6 h-6" />
              <span className="text-2xl font-bold">50+</span>
              <span className="text-sm">{t('stats.projects')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
              <span className="text-2xl font-bold">100억원+</span>
              <span className="text-sm">{t('stats.investment')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Users className="w-6 h-6" />
              <span className="text-2xl font-bold">30+</span>
              <span className="text-sm">{t('stats.partnerships')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Trophy className="w-6 h-6" />
              <span className="text-2xl font-bold">95%</span>
              <span className="text-sm">{t('stats.successRate')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}