'use client'

import React from 'react'
import { useTranslations } from '@/lib/translations'
import { motion } from 'framer-motion'
import { Handshake, Settings, Calendar } from 'lucide-react'

export function ServicesSection() {
  const t = useTranslations('services')

  const services = [
    {
      icon: Handshake,
      title: t('partnership.title'),
      description: t('partnership.description'),
      features: [
        t('partnership.features.0'),
        t('partnership.features.1'),
        t('partnership.features.2'),
        t('partnership.features.3'),
      ]
    },
    {
      icon: Settings,
      title: t('consulting.title'),
      description: t('consulting.description'),
      features: [
        t('consulting.features.0'),
        t('consulting.features.1'),
        t('consulting.features.2'),
        t('consulting.features.3'),
      ]
    },
    {
      icon: Calendar,
      title: t('event.title'),
      description: t('event.description'),
      features: [
        t('event.features.0'),
        t('event.features.1'),
        t('event.features.2'),
        t('event.features.3'),
      ]
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
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover-lift hover-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-web3 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}