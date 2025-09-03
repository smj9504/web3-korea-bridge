'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Container, Section } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { Shield, Network, Wrench, Zap } from 'lucide-react'

export function CoreValues() {
  const t = useTranslations('about.values')

  const values = [
    {
      icon: Shield,
      title: t('trust.title'),
      description: t('trust.description'),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Network,
      title: t('network.title'),
      description: t('network.description'),
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100'
    },
    {
      icon: Wrench,
      title: t('solution.title'),
      description: t('solution.description'),
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Zap,
      title: t('innovation.title', { defaultValue: '혁신성 (Innovation)' }),
      description: t('innovation.description', { defaultValue: 'Web3 시대에 맞는 혁신적인 솔루션 제공' }),
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100'
    }
  ]

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
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description', { defaultValue: 'Web3-Korea Bridge를 이끄는 핵심 가치들입니다.' })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className={`p-6 h-full bg-gradient-to-br ${value.bgColor} border-0 shadow-md hover:shadow-xl transition-all duration-300`}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-flex items-center justify-center w-16 h-16 ${value.iconBg} rounded-full mb-4`}
                  >
                    <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent from-gray-900 to-gray-700">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Core Values Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {t('commitment.title', { defaultValue: '우리의 약속' })}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('commitment.description', { defaultValue: '이러한 핵심 가치를 바탕으로 Web3-Korea Bridge는 고객과 파트너에게 최고의 서비스를 제공하며, 함께 성장하는 동반자가 되겠습니다. 우리는 단순한 서비스 제공을 넘어서 진정한 파트너십을 통해 모든 이해관계자들과 함께 성공을 만들어 나가겠습니다.' })}
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}