'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Container, Section } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle, Target, Rocket } from 'lucide-react'

export function CompanyHistory() {
  const t = useTranslations('about.history')

  const milestones = [
    {
      year: '2024',
      quarter: 'Q1',
      title: t('milestone1.title', { defaultValue: '회사 설립' }),
      description: t('milestone1.desc', { defaultValue: 'Web3-Korea Bridge 설립 및 서비스 개시' }),
      icon: Rocket,
      status: 'completed',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      year: '2024',
      quarter: 'Q2',
      title: t('milestone2.title', { defaultValue: '첫 파트너십 성사' }),
      description: t('milestone2.desc', { defaultValue: '글로벌 Web3 기업과 한국 대기업 간 첫 파트너십 중개 성공' }),
      icon: CheckCircle,
      status: 'completed',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      year: '2024',
      quarter: 'Q3',
      title: t('milestone3.title', { defaultValue: '서비스 확장' }),
      description: t('milestone3.desc', { defaultValue: '운영 컨설팅 및 이벤트 마케팅 서비스 론칭' }),
      icon: Target,
      status: 'completed',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      year: '2024',
      quarter: 'Q4',
      title: t('milestone4.title', { defaultValue: '네트워크 확장' }),
      description: t('milestone4.desc', { defaultValue: '50+ 파트너사와의 네트워크 구축 및 다양한 성공 사례 창출' }),
      icon: CheckCircle,
      status: 'in-progress',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      year: '2025',
      quarter: 'Q1',
      title: t('milestone5.title', { defaultValue: '해외 진출' }),
      description: t('milestone5.desc', { defaultValue: '동남아시아 및 북미 지역으로 서비스 확장 계획' }),
      icon: Target,
      status: 'planned',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{t('status.completed', { defaultValue: '완료' })}</Badge>
      case 'in-progress':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">{t('status.inProgress', { defaultValue: '진행중' })}</Badge>
      case 'planned':
        return <Badge variant="outline">{t('status.planned', { defaultValue: '예정' })}</Badge>
      default:
        return null
    }
  }

  return (
    <Section background="muted" padding="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title', { defaultValue: '회사 연혁' })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle', { defaultValue: 'Web3-Korea Bridge의 성장 여정과 주요 성과를 소개합니다.' })}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-gray-300 transform md:-translate-x-px"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${milestone.color} border-4 border-white shadow-lg`}
                  />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <Card className={`p-6 ${milestone.bgColor} ${milestone.borderColor} border shadow-md hover:shadow-lg transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-white rounded-lg shadow-sm`}>
                          <milestone.icon className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-bold text-gray-700">
                              {milestone.year}
                            </span>
                            <span className="text-xs px-2 py-1 bg-white/50 rounded text-gray-600">
                              {milestone.quarter}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {milestone.title}
                          </h3>
                        </div>
                      </div>
                      {getStatusBadge(milestone.status)}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {milestone.description}
                    </p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-blue-50 border-primary/20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t('future.title', { defaultValue: '미래 비전' })}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('future.description', { defaultValue: 'Web3-Korea Bridge는 앞으로도 지속적인 성장을 통해 글로벌 Web3 기업들의 아시아 진출 허브로 자리잡고자 합니다. 더 많은 성공 사례를 만들어 Web3 생태계 발전에 기여하겠습니다.' })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">100+</div>
                  <div className="text-sm text-gray-600">{t('goals.partners', { defaultValue: '파트너사' })}</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">10+</div>
                  <div className="text-sm text-gray-600">{t('goals.countries', { defaultValue: '진출 국가' })}</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">1B+</div>
                  <div className="text-sm text-gray-600">{t('goals.deals', { defaultValue: '딜 규모' })}</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}