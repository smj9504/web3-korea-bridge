'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Container, Section } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { Eye, Target } from 'lucide-react'

export function VisionMission() {
  const t = useTranslations('about.vision')

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <Section padding="lg">
      <Container>
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description', { defaultValue: 'Web3-Korea Bridge의 비전과 미션을 소개합니다.' })}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">
                  {t('visionTitle', { defaultValue: '비전' })}
                </h3>
              </div>
              <p className="text-lg text-blue-800 leading-relaxed">
                {t('vision')}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 h-full bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mr-4">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900">
                  {t('missionTitle', { defaultValue: '미션' })}
                </h3>
              </div>
              <p className="text-lg text-emerald-800 leading-relaxed">
                {t('mission')}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Additional Mission Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: t('commitment1.title', { defaultValue: '전문성' }),
                description: t('commitment1.desc', { defaultValue: '15년간의 대기업 경험과 전문 지식' })
              },
              {
                title: t('commitment2.title', { defaultValue: '신뢰성' }),
                description: t('commitment2.desc', { defaultValue: '투명하고 정직한 비즈니스 파트너십' })
              },
              {
                title: t('commitment3.title', { defaultValue: '혁신성' }),
                description: t('commitment3.desc', { defaultValue: 'Web3 시대의 새로운 비즈니스 모델 창조' })
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <h4 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}