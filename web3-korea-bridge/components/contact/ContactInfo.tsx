'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Twitter,
  Linkedin,
  Send
} from 'lucide-react';

interface ContactInfoProps {
  locale: string;
}

export default function ContactInfo({ locale }: ContactInfoProps) {
  const t = useTranslations('contact.info');

  const contactMethods = [
    {
      icon: Mail,
      label: t('email'),
      value: 'info@web3koreabridge.com',
      href: 'mailto:info@web3koreabridge.com',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+82-2-1234-5678',
      href: 'tel:+8221234567',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: MapPin,
      label: t('address'),
      value: t('addressValue'),
      href: '#',
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      icon: Clock,
      label: t('businessHours'),
      value: t('businessHoursValue'),
      href: '#',
      color: 'text-orange-600 dark:text-orange-400',
    },
  ];

  const socialLinks = [
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/web3koreabridge',
      color: 'hover:text-blue-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/web3koreabridge',
      color: 'hover:text-blue-600',
    },
    {
      icon: Send,
      label: 'Telegram',
      href: 'https://t.me/web3koreabridge',
      color: 'hover:text-blue-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Contact Information Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${method.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {method.label}
                  </p>
                  {method.href !== '#' ? (
                    <a 
                      href={method.href}
                      className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">
                      {method.value}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Response Promise */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg mb-2">{t('quickResponse.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('quickResponse.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h3 className="text-lg font-semibold mb-4">{t('followUs')}</h3>
        <div className="flex gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all hover:scale-110 ${social.color}`}
                aria-label={social.label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
}