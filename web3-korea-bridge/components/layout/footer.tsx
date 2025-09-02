'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from '@/lib/translations'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Navigation links matching Header
  const navLinks = [
    { href: '/', label: t('links.home') },
    { href: '/about', label: t('links.about') },
    { href: '/services', label: t('links.services') },
    { href: '/portfolio', label: t('links.portfolio') },
    { href: '/blog', label: t('links.blog') },
    { href: '/contact', label: t('links.contact') }
  ]

  const servicesList = [
    t('services.partnership'),
    t('services.consulting'),
    t('services.event')
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'Github' }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform" >
                  <span className="text-white font-bold text-lg">W3</span>
                </div>
                <div className="flex flex-col">
                  <span className="gradient-text font-bold text-xl">Web3</span>
                  <span className="text-white font-medium text-sm">Korea Bridge</span>
                </div>
              </Link>
              <p className="text-slate-300 leading-relaxed">
                {t('tagline')}
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 hover:scale-105 transition-all duration-200 border border-slate-700/50 hover:border-primary/30"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2">
              {t('links.title')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white hover:text-primary transition-all duration-200 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2">
              {t('services.title')}
            </h3>
            <ul className="space-y-3">
              {servicesList.map((service, index) => (
                <li key={index} className="text-slate-300 flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-2">
              {t('contact.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-slate-300">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <a href="mailto:info@web3koreabridge.com" className="hover:text-primary transition-colors">
                    info@web3koreabridge.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-slate-300">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Phone</p>
                  <a href="tel:+82212345678" className="hover:text-primary transition-colors">
                    +82 2-1234-5678
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-400 mb-1">Location</p>
                  <span>Seoul, South Korea</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-center md:text-left">
              {t('copyright')}
            </p>
            
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-primary transition-colors text-sm"
              >
                {t('privacy')}
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-primary transition-colors text-sm"
              >
                {t('terms')}
              </Link>
              <span className="text-slate-600">•</span>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-1 text-slate-400 hover:text-primary transition-all duration-200 hover:scale-105 group"
                aria-label="Scroll to top"
              >
                <span className="text-sm">Top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}