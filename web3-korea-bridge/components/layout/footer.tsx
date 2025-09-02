'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from '@/lib/translations'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="bg-web3-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-web3-blue to-white" />
              <span className="text-xl font-bold">{t('company')}</span>
            </div>
            <p className="text-sm text-gray-300">
              {t('tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-web3-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-web3-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-web3-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('links.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}/about`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/services`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {t('links.services')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/portfolio`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {t('links.portfolio')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/blog`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {t('links.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('services.title')}</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">
                {t('services.partnership')}
              </li>
              <li className="text-sm text-gray-300">
                {t('services.consulting')}
              </li>
              <li className="text-sm text-gray-300">
                {t('services.event')}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t('links.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@web3koreabridge.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+82 2-1234-5678</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Seoul, South Korea</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              {t('copyright')}
            </p>
            <div className="flex space-x-6">
              <Link 
                href={`/${locale}/privacy`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link 
                href={`/${locale}/terms`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}