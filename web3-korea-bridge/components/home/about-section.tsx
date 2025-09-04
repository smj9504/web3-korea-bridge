'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function AboutSection() {
  const t = useTranslations('about')

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            {/* Founder Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-blue-600/10 border-2 border-primary/20 flex items-center justify-center">
                {/* Founder Avatar Placeholder */}
                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Founder Info */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('founder.title')}</h2>
              <h3 className="text-xl font-semibold mb-2">{t('founder.description')}</h3>
              <ul className="space-y-3 mt-6">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{t(`founder.experience.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('values.title')}</h3>
              <div className="space-y-3">
                <div className="card p-3 lg:p-4">
                  <h4 className="font-semibold mb-2">{t('values.trust.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('values.trust.description')}</p>
                </div>
                <div className="card p-3 lg:p-4">
                  <h4 className="font-semibold mb-2">{t('values.network.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('values.network.description')}</p>
                </div>
                <div className="card p-3 lg:p-4">
                  <h4 className="font-semibold mb-2">{t('values.solution.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('values.solution.description')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}