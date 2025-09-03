'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ContactCTAProps {
  locale: string;
}

export default function ContactCTA({ locale }: ContactCTAProps) {
  const t = useTranslations('contact.cta');

  const stats = [
    {
      icon: Clock,
      value: '24h',
      label: t('stats.response'),
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Calendar,
      value: '30min',
      label: t('stats.consultation'),
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Users,
      value: '50+',
      label: t('stats.partners'),
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: Target,
      value: '95%',
      label: t('stats.success'),
      color: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-4 top-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute -right-4 bottom-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700"
              onClick={() => {
                const contactForm = document.getElementById('contact-form');
                contactForm?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('primaryButton')}
            </Button>
            
            <Link href={`/${locale}/services`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                {t('secondaryButton')}
              </Button>
            </Link>
          </motion.div>

          {/* Office Hours Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-white/80 text-sm">
              {t('officeHours')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}