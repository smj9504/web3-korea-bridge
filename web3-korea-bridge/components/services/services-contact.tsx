'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  MessageCircle, 
  Calendar, 
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react'

export function ServicesContact() {
  const t = useTranslations('services.contact')
  const contact = useTranslations('contact')

  const contactMethods = [
    {
      icon: MessageCircle,
      title: t('methods.consultation.title'),
      description: t('methods.consultation.description'),
      action: t('methods.consultation.action'),
      href: '#consultation',
      variant: 'default' as const
    },
    {
      icon: Calendar,
      title: t('methods.meeting.title'),
      description: t('methods.meeting.description'),
      action: t('methods.meeting.action'),
      href: '#schedule',
      variant: 'secondary' as const
    },
    {
      icon: Mail,
      title: t('methods.email.title'),
      description: t('methods.email.description'),
      action: t('methods.email.action'),
      href: 'mailto:info@web3-korea-bridge.com',
      variant: 'outline' as const
    }
  ]

  const benefits = [
    t('benefits.freeConsultation'),
    t('benefits.customizedStrategy'),
    t('benefits.expertiseAccess'),
    t('benefits.quickResponse')
  ]

  const businessInfo = [
    {
      icon: Phone,
      label: contact('info.phone'),
      value: '+82-2-1234-5678'
    },
    {
      icon: Mail,
      label: contact('info.email'),
      value: 'info@web3-korea-bridge.com'
    },
    {
      icon: MapPin,
      label: contact('info.address'),
      value: 'Seoul, South Korea'
    },
    {
      icon: Clock,
      label: t('businessHours'),
      value: t('businessHoursValue')
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {t('howToStart.title')}
              </h3>
              <p className="text-muted-foreground mb-8">
                {t('howToStart.description')}
              </p>
            </div>

            {/* Contact Method Cards */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <method.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {method.title}
                          </h4>
                          <p className="text-muted-foreground mb-4">
                            {method.description}
                          </p>
                          <a href={method.href}>
                            <Button 
                              variant={method.variant}
                              size="sm"
                              className="group/btn"
                            >
                              {method.action}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6"
            >
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                {t('benefits.title')}
              </h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Business Info & Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Business Information */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">
                  {contact('info.title')}
                </h3>
                <div className="space-y-4">
                  {businessInfo.map((info, index) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {info.label}
                        </div>
                        <div className="font-medium">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold mb-6 text-center">
                  {t('quickStats.title')}
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">24시간</div>
                    <div className="text-sm opacity-90">{t('quickStats.responseTime')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">무료</div>
                    <div className="text-sm opacity-90">{t('quickStats.consultation')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">15년+</div>
                    <div className="text-sm opacity-90">{t('quickStats.experience')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">95%+</div>
                    <div className="text-sm opacity-90">{t('quickStats.successRate')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="border-2 border-dashed border-primary/50 bg-primary/5">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold mb-4">
                  {t('readyToStart.title')}
                </h4>
                <p className="text-muted-foreground mb-6">
                  {t('readyToStart.description')}
                </p>
                <Button  className="w-full group">
                  {t('readyToStart.button')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}