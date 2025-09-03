'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Container, Section } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Award, Building2, TrendingUp, Users2 } from 'lucide-react'
import Image from 'next/image'

export function FounderIntro() {
  const t = useTranslations('about.founder')

  const achievements = [
    {
      icon: Building2,
      title: t('achievements.corporate', { defaultValue: '대기업 경험' }),
      description: t('achievements.corporateDesc', { defaultValue: '삼성전자 15년 글로벌 재무/전략' })
    },
    {
      icon: TrendingUp,
      title: t('achievements.finance', { defaultValue: 'M&A 전문성' }),
      description: t('achievements.financeDesc', { defaultValue: 'PEF M&A 딜 성사 전문가' })
    },
    {
      icon: Award,
      title: t('achievements.expertise', { defaultValue: '의사결정 구조' }),
      description: t('achievements.expertiseDesc', { defaultValue: '대기업 의사결정 프로세스 전문가' })
    },
    {
      icon: Users2,
      title: t('achievements.analysis', { defaultValue: '재무 분석' }),
      description: t('achievements.analysisDesc', { defaultValue: '복잡한 재무 흐름 분석 전문가' })
    }
  ]

  return (
    <Section padding="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle', { defaultValue: '경험과 전문성을 바탕으로 Web3 기업들의 성공을 이끌어갑니다.' })}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="text-center mb-8">
                {/* Placeholder for founder image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Users2 className="w-16 h-16 text-primary" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('name')}
                  </h3>
                  <Badge variant="secondary" className="mb-4">
                    {t('role')}
                  </Badge>
                </div>
                
                <p className="text-lg font-semibold text-blue-800 mb-6">
                  {t('description')}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {t('experienceTitle', { defaultValue: '주요 경력' })}
                </h4>
                {(t.raw('experience') as string[] || []).map((exp: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{exp}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">
              {t('achievementsTitle', { defaultValue: '전문 분야' })}
            </h3>
            
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="group"
              >
                <Card className="p-6 bg-white hover:shadow-md transition-all duration-300 border-l-4 border-l-primary">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl text-primary mb-4">"</div>
              <blockquote className="text-xl font-medium text-gray-800 italic mb-6 leading-relaxed">
                {t('quote', { defaultValue: '15년간의 대기업 경험과 M&A 전문성을 바탕으로, Web3 기업들이 한국 시장에서 성공할 수 있도록 최선을 다하겠습니다. 함께 새로운 미래를 만들어 나가겠습니다.' })}
              </blockquote>
              <div className="text-primary font-semibold">
                - {t('name')} {t('role')}
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}