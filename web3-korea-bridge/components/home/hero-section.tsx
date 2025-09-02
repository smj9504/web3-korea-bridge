'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from '@/lib/translations'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-web3-blue/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-web3-navy-light/20 rounded-full filter blur-3xl animate-float animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            {t('title')}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            {t('subtitle')}
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/contact`}
              className="group px-8 py-4 bg-white text-web3-navy font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
            >
              <span>{t('cta.primary')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href={`/${locale}/services`}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-web3-navy transition-all duration-300"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-white animate-bounce" />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}