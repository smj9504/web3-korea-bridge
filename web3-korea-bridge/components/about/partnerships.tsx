'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Container, Section } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, Handshake, Globe, Award, Users, TrendingUp } from 'lucide-react'

export function Partnerships() {
  const t = useTranslations('about.partnerships')

  const partnerCategories = [
    {
      icon: Building2,
      title: t('enterprise.title', { defaultValue: '대기업 파트너' }),
      description: t('enterprise.description', { defaultValue: 'IT, 게임, 엔터테인먼트 분야의 주요 한국 대기업들' }),
      count: '20+',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      companies: [
        { name: 'IT 대기업', category: 'IT' },
        { name: '게임 회사', category: 'Gaming' },
        { name: '엔터테인먼트', category: 'Entertainment' }
      ]
    },
    {
      icon: Globe,
      title: t('web3.title', { defaultValue: 'Web3 기업' }),
      description: t('web3.description', { defaultValue: '블록체인, DeFi, NFT 분야의 글로벌 Web3 기업들' }),
      count: '30+',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      companies: [
        { name: 'DeFi 프로토콜', category: 'DeFi' },
        { name: 'NFT 플랫폼', category: 'NFT' },
        { name: '블록체인 인프라', category: 'Infrastructure' }
      ]
    },
    {
      icon: Users,
      title: t('institutional.title', { defaultValue: '기관 투자자' }),
      description: t('institutional.description', { defaultValue: 'VC, PEF, 패밀리오피스 등 투자 기관들' }),
      count: '15+',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      companies: [
        { name: 'VC 펀드', category: 'VC' },
        { name: 'PEF', category: 'Private Equity' },
        { name: '패밀리오피스', category: 'Family Office' }
      ]
    }
  ]

  const achievements = [
    {
      icon: Award,
      title: t('achievements.deals', { defaultValue: '성사된 딜' }),
      value: '25+',
      description: t('achievements.dealsDesc', { defaultValue: '성공적으로 중개한 파트너십' })
    },
    {
      icon: TrendingUp,
      title: t('achievements.value', { defaultValue: '총 딜 가치' }),
      value: '$500M+',
      description: t('achievements.valueDesc', { defaultValue: '누적 파트너십 규모' })
    },
    {
      icon: Handshake,
      title: t('achievements.satisfaction', { defaultValue: '고객 만족도' }),
      value: '98%',
      description: t('achievements.satisfactionDesc', { defaultValue: '파트너사 만족도' })
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
            {t('title', { defaultValue: '파트너십 네트워크' })}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle', { defaultValue: '신뢰할 수 있는 파트너들과 함께 Web3 생태계를 확장해 나가고 있습니다.' })}
          </p>
        </motion.div>

        {/* Partner Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {partnerCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className={`p-6 h-full bg-gradient-to-br ${category.bgColor} border-0 shadow-md hover:shadow-xl transition-all duration-300`}>
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-white/80 rounded-full mb-4 shadow-sm"
                  >
                    <category.icon className="w-8 h-8 text-gray-700" />
                  </motion.div>
                  
                  <div className="mb-4">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}>
                      {category.count}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {category.companies.map((company, compIndex) => (
                    <motion.div
                      key={compIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + compIndex * 0.1 }}
                      className="flex items-center justify-between p-2 bg-white/60 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-800">{company.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {company.category}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partnership Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <achievement.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{achievement.value}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">
              {t('process.title', { defaultValue: '파트너십 프로세스' })}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: t('process.step1', { defaultValue: '니즈 분석' }),
                  description: t('process.step1Desc', { defaultValue: '고객의 요구사항과 목표 분석' })
                },
                {
                  step: '02',
                  title: t('process.step2', { defaultValue: '파트너 매칭' }),
                  description: t('process.step2Desc', { defaultValue: '최적의 파트너 후보 선별' })
                },
                {
                  step: '03',
                  title: t('process.step3', { defaultValue: '협상 중재' }),
                  description: t('process.step3Desc', { defaultValue: '양측 간 협상 진행 및 중재' })
                },
                {
                  step: '04',
                  title: t('process.step4', { defaultValue: '성사 지원' }),
                  description: t('process.step4Desc', { defaultValue: '계약 체결 및 후속 관리' })
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      {step.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-primary/20"></div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary to-blue-600 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {t('cta.title', { defaultValue: '함께 파트너십을 만들어가세요' })}
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              {t('cta.description', { defaultValue: 'Web3-Korea Bridge와 함께 새로운 비즈니스 기회를 발견하고, 성공적인 파트너십을 구축하세요.' })}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {t('cta.button', { defaultValue: '파트너십 문의하기' })}
            </motion.button>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}