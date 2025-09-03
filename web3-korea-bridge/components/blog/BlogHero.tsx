'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Users, Star } from 'lucide-react'

export function BlogHero() {
  const t = useTranslations('blog')

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
            <div className="mb-6 h-16"></div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Blog Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-6 h-6" />
              <span className="text-2xl font-bold">50+</span>
              <span className="text-sm">{t('stats.articles')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
              <span className="text-2xl font-bold">10K+</span>
              <span className="text-sm">{t('stats.readers')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Users className="w-6 h-6" />
              <span className="text-2xl font-bold">500+</span>
              <span className="text-sm">{t('stats.community')}</span>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Star className="w-6 h-6" />
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-sm">{t('stats.rating')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}