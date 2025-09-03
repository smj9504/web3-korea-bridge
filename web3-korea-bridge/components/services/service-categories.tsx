'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Building2, 
  Handshake, 
  Megaphone, 
  Code, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

interface ServiceCategory {
  id: string
  icon: React.ComponentType<any>
  title: string
  description: string
  features: string[]
  process: string[]
  duration: string
  whyChooseUs: string[]
}

export function ServiceCategories() {
  const t = useTranslations('services.categories')
  const common = useTranslations('common')

  const services: ServiceCategory[] = [
    {
      id: 'market-entry',
      icon: TrendingUp,
      title: t('marketEntry.title'),
      description: t('marketEntry.description'),
      features: t.raw('marketEntry.features') as string[],
      process: t.raw('marketEntry.process') as string[],
      duration: t('marketEntry.duration'),
      whyChooseUs: t.raw('marketEntry.whyChooseUs') as string[]
    },
    {
      id: 'legal-setup',
      icon: Building2,
      title: t('legalSetup.title'),
      description: t('legalSetup.description'),
      features: t.raw('legalSetup.features') as string[],
      process: t.raw('legalSetup.process') as string[],
      duration: t('legalSetup.duration'),
      whyChooseUs: t.raw('legalSetup.whyChooseUs') as string[]
    },
    {
      id: 'business-dev',
      icon: Handshake,
      title: t('businessDev.title'),
      description: t('businessDev.description'),
      features: t.raw('businessDev.features') as string[],
      process: t.raw('businessDev.process') as string[],
      duration: t('businessDev.duration'),
      whyChooseUs: t.raw('businessDev.whyChooseUs') as string[]
    },
    {
      id: 'marketing-pr',
      icon: Megaphone,
      title: t('marketingPR.title'),
      description: t('marketingPR.description'),
      features: t.raw('marketingPR.features') as string[],
      process: t.raw('marketingPR.process') as string[],
      duration: t('marketingPR.duration'),
      whyChooseUs: t.raw('marketingPR.whyChooseUs') as string[]
    },
    {
      id: 'tech-support',
      icon: Code,
      title: t('techSupport.title'),
      description: t('techSupport.description'),
      features: t.raw('techSupport.features') as string[],
      process: t.raw('techSupport.process') as string[],
      duration: t('techSupport.duration'),
      whyChooseUs: t.raw('techSupport.whyChooseUs') as string[]
    },
    {
      id: 'investment',
      icon: DollarSign,
      title: t('investment.title'),
      description: t('investment.description'),
      features: t.raw('investment.features') as string[],
      process: t.raw('investment.process') as string[],
      duration: t('investment.duration'),
      whyChooseUs: t.raw('investment.whyChooseUs') as string[]
    }
  ]

  return (
    <section className="py-24 bg-background">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="h-full group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary/20"
                animate
                hover="lift"
                variant="elevated"
              >
                <CardHeader className="pb-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  {/* Title & Description */}
                  <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center">
                      <Star className="h-4 w-4 text-primary mr-2" />
                      {t('keyFeatures')}
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium">{t('estimatedDuration')}:</span>
                    <span className="ml-1">{service.duration}</span>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    {t('learnMore')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('cta.description')}
            </p>
            <Button size="lg" className="group">
              {t('cta.button')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}