'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Container, Section } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Building2, Users, Globe } from 'lucide-react'

export function AboutHero() {
  const t = useTranslations('about')

  const stats = [
    {
      icon: Building2,
      value: '15+',
      label: t('hero.stats.experience', { defaultValue: '년 경험' })
    },
    {
      icon: Users,
      value: '50+',
      label: t('hero.stats.partners', { defaultValue: '파트너사' })
    },
    {
      icon: Globe,
      value: '100%',
      label: t('hero.stats.success', { defaultValue: '성공률' })
    }
  ]

  return (
    <Section background="gradient" padding="xl">
      <Container>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="mb-4">
              {t('badge', { defaultValue: '회사소개' })}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}