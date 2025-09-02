'use client'

import React from 'react'
import { useTranslations } from '@/lib/translations'
import { motion } from 'framer-motion'

export function AboutSection() {
  const t = useTranslations('about')

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('values.title')}</h3>
              <div className="space-y-4">
                <div className="card p-4">
                  <h4 className="font-semibold mb-2">{t('values.trust.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('values.trust.description')}</p>
                </div>
                <div className="card p-4">
                  <h4 className="font-semibold mb-2">{t('values.network.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('values.network.description')}</p>
                </div>
                <div className="card p-4">
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