'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface ContactHeroProps {
  locale: string;
}

export default function ContactHero({ locale }: ContactHeroProps) {
  const t = useTranslations('contact');

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 h-10"></div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Mail className="w-5 h-5" />
              <span className="text-sm">info@web3koreabridge.com</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Phone className="w-5 h-5" />
              <span className="text-sm">+82-2-1234-5678</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Seoul, Korea</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Mon-Fri 9AM-6PM KST</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}