'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations, useLocale, setLocale } from '@/lib/translations'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const currentLocale = useLocale()
  
  const t = useTranslations('nav')
  const tHero = useTranslations('hero')

  // Determine if current page should use dark text (black) or light text (white/light)
  // Use dark text on all pages when not scrolled or on specific pages
  const isDarkTextPage = pathname.includes('/about') || pathname.includes('/services') || pathname.includes('/blog') || pathname.includes('/contact')
  const isLightTextPage = !isDarkTextPage

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 네비게이션 메뉴 항목
  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/blog', label: t('blog') },
    // { href: '/news', label: t('news') }, // News 비활성화
    { href: '/contact', label: t('contact') },
  ]

  const switchLocale = (newLocale: 'ko' | 'en') => {
    setLocale(newLocale)
    
    // 언어 변경 시 라우팅 처리
    const currentPath = pathname.replace(/^\/(en|ko)/, '')
    const newPath = newLocale === 'ko' 
      ? currentPath || '/' 
      : `/${newLocale}${currentPath}`
    
    // Next.js 클라이언트 사이드 라우팅 사용 (새로고침 없이)
    router.push(newPath)
    setIsLangMenuOpen(false)
  }

  useEffect(() => {
    // 외부 클릭 시 드롭다운 메뉴 닫기
    const handleClickOutside = () => {
      if (isLangMenuOpen) {
        setIsLangMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isLangMenuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isDarkTextPage
          ? isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-white/80 backdrop-blur-sm'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-white/10 backdrop-blur-sm'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl lg:text-2xl transition-transform hover:scale-105"
          >
            <span className="font-bold text-blue-600">Web3</span>
            <span className={cn(
              "transition-colors duration-300",
              isDarkTextPage
                ? 'text-gray-800'
                : isScrolled
                  ? 'text-gray-800'
                  : 'text-white'
            )}>
              Korea Bridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:scale-105 relative group',
                  pathname === item.href
                    ? 'text-blue-600'
                    : isDarkTextPage
                      ? 'text-gray-700 hover:text-blue-600'
                      : isScrolled
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-white/90 hover:text-white'
                )}
              >
                {item.label}
                {/* Active indicator */}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
                {/* Hover indicator */}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLangMenuOpen(!isLangMenuOpen)
                }}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 rounded-lg',
                  isDarkTextPage
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                )}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLocale === 'ko' ? 'KO' : 'EN'}</span>
                <ChevronDown className={cn(
                  'w-3 h-3 transition-transform duration-200',
                  isLangMenuOpen && 'rotate-180'
                )} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <button
                    onClick={() => switchLocale('ko')}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-blue-600',
                      currentLocale === 'ko' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    )}
                  >
                    🇰🇷 한국어
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-blue-600',
                      currentLocale === 'en' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    )}
                  >
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="btn-primary transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {tHero('cta.primary')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-all duration-300',
              isDarkTextPage
                ? 'text-gray-700 hover:bg-gray-100'
                : isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
            )}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={cn(
            'lg:hidden py-4 border-t transition-colors duration-300',
            isDarkTextPage
              ? 'border-gray-200 bg-white'
              : isScrolled
                ? 'border-gray-200 bg-white'
                : 'border-white/20 bg-black/90 backdrop-blur-md'
          )}>
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg',
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : isDarkTextPage
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        : isScrolled
                          ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className={cn(
              'mt-4 pt-4 border-t transition-colors duration-300',
              isDarkTextPage
                ? 'border-gray-200'
                : isScrolled
                  ? 'border-gray-200'
                  : 'border-white/20'
            )}>
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => switchLocale('ko')}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300',
                    currentLocale === 'ko' 
                      ? 'text-primary bg-primary/10' 
                      : isDarkTextPage
                        ? 'text-gray-700 hover:bg-gray-100'
                        : isScrolled
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-white/90 hover:bg-white/10'
                  )}
                >
                  <span>🇰🇷</span>
                  <span>한국어</span>
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300',
                    currentLocale === 'en' 
                      ? 'text-primary bg-primary/10' 
                      : isDarkTextPage
                        ? 'text-gray-700 hover:bg-gray-100'
                        : isScrolled
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-white/90 hover:bg-white/10'
                  )}
                >
                  <span>🇺🇸</span>
                  <span>English</span>
                </button>
              </div>
              
              {/* Mobile CTA Button */}
              <Link
                href="/contact"
                className="block w-full btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {tHero('cta.primary')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}