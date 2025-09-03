'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MessageSquare, 
  Search, 
  Target, 
  Rocket, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

interface ProcessStep {
  id: number
  icon: React.ComponentType<any>
  title: string
  description: string
  details: string[]
  duration: string
}

export function ServiceProcess() {
  const t = useTranslations('services.process')

  const steps: ProcessStep[] = [
    {
      id: 1,
      icon: MessageSquare,
      title: t('consultation.title'),
      description: t('consultation.description'),
      details: t.raw('consultation.details') as string[],
      duration: t('consultation.duration')
    },
    {
      id: 2,
      icon: Search,
      title: t('analysis.title'),
      description: t('analysis.description'),
      details: t.raw('analysis.details') as string[],
      duration: t('analysis.duration')
    },
    {
      id: 3,
      icon: Target,
      title: t('strategy.title'),
      description: t('strategy.description'),
      details: t.raw('strategy.details') as string[],
      duration: t('strategy.duration')
    },
    {
      id: 4,
      icon: Rocket,
      title: t('execution.title'),
      description: t('execution.description'),
      details: t.raw('execution.details') as string[],
      duration: t('execution.duration')
    },
    {
      id: 5,
      icon: Users,
      title: t('partnership.title'),
      description: t('partnership.description'),
      details: t.raw('partnership.details') as string[],
      duration: t('partnership.duration')
    },
    {
      id: 6,
      icon: TrendingUp,
      title: t('growth.title'),
      description: t('growth.description'),
      details: t.raw('growth.details') as string[],
      duration: t('growth.duration')
    }
  ]

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" size="lg" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/50 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-6 gap-8 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  {/* Step Number & Icon */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-background">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-2 border-background">
                      <span className="text-xs font-bold text-secondary-foreground">
                        {step.id}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <Card className="w-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {detail}
                          </div>
                        ))}
                      </div>
                      <Badge variant="outline" size="sm">
                        {step.duration}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <step.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-background">
                      <span className="text-xs font-bold text-secondary-foreground">
                        {step.id}
                      </span>
                    </div>
                  </div>
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-primary/30 mx-auto mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <Badge variant="outline" size="sm">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {step.description}
                      </p>
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {t('summary.title')}
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                {t('summary.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="secondary" size="lg">
                  {t('summary.totalDuration')}
                </Badge>
                <Badge variant="outline" size="lg">
                  {t('summary.successRate')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}