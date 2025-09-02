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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 네비게이션 메뉴 항목 (요구사항에 따라 News 추가)
  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/blog', label: t('blog') },
    { href: '/news', label: t('news') },
    { href: '/contact', label: t('contact') },
  ]

  const switchLocale = (newLocale: 'ko' | 'en') => {
    setLocale(newLocale)
    
    // 언어 변경 시 라우팅 처리
    if (newLocale !== 'ko') {
      router.push(`/${newLocale}${pathname}`)
    } else {
      // 한국어는 기본이므로 locale 경로 제거
      const cleanPath = pathname.replace(/^\/(en|ko)/, '') || '/'
      router.push(cleanPath)
    }
    setIsLangMenuOpen(false)
    
    // 페이지 새로고침으로 언어 변경 반영
    setTimeout(() => {
      window.location.reload()
    }, 100)
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
        isScrolled
          ? 'glass-effect shadow-lg border-b border-white/20'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl lg:text-2xl transition-transform hover:scale-105"
          >
            <span className="gradient-text">Web3</span>
            <span className={cn(
              'transition-colors',
              isScrolled ? 'text-foreground' : 'text-white'
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
                  'text-sm font-medium transition-all duration-200 hover:scale-105 relative group',
                  pathname === item.href
                    ? 'text-primary'
                    : isScrolled 
                      ? 'text-foreground hover:text-primary' 
                      : 'text-white/90 hover:text-white',
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
                  'flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 rounded-lg',
                  isScrolled 
                    ? 'text-foreground hover:bg-accent hover:text-primary' 
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
                <div className="absolute right-0 mt-2 w-36 glass-effect rounded-lg shadow-lg py-2 z-50 border border-white/20">
                  <button
                    onClick={() => switchLocale('ko')}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/10 hover:text-primary',
                      currentLocale === 'ko' && 'text-primary bg-primary/10'
                    )}
                  >
                    🇰🇷 한국어
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-white/10 hover:text-primary',
                      currentLocale === 'en' && 'text-primary bg-primary/10'
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
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled 
                ? 'text-foreground hover:bg-accent' 
                : 'text-white hover:bg-white/10'
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
          <div className="lg:hidden py-4 border-t border-white/20 glass-effect">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
                    pathname === item.href
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-white/10 hover:text-primary'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => switchLocale('ko')}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    currentLocale === 'ko' 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:bg-white/10'
                  )}
                >
                  <span>🇰🇷</span>
                  <span>한국어</span>
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    currentLocale === 'en' 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:bg-white/10'
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