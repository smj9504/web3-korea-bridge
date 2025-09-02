'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('ko')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/about', label: '회사소개' },
    { href: '/services', label: '서비스' },
    { href: '/portfolio', label: '포트폴리오' },
    { href: '/blog', label: '블로그' },
    { href: '/contact', label: '문의하기' },
  ]

  const switchLocale = (newLocale: string) => {
    setCurrentLang(newLocale)
    // 언어 변경 시에만 locale 경로 추가
    if (newLocale !== 'ko') {
      router.push(`/${newLocale}${pathname}`)
    } else {
      // 한국어는 기본이므로 locale 경로 제거
      const cleanPath = pathname.replace(/^\/(en|ko)/, '') || '/'
      router.push(cleanPath)
    }
    setIsLangMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <span className="text-primary">Web3</span>
            <span className="text-gray-900">Korea Bridge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-gray-700'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang === 'ko' ? 'KO' : 'EN'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => switchLocale('ko')}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100',
                      currentLang === 'ko' && 'bg-primary/10 text-primary'
                    )}
                  >
                    한국어
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100',
                      currentLang === 'en' && 'bg-primary/10 text-primary'
                    )}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              무료 상담
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
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
          <div className="lg:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-gray-700'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => switchLocale('ko')}
                  className={cn(
                    'text-sm font-medium',
                    currentLang === 'ko' ? 'text-primary' : 'text-gray-700'
                  )}
                >
                  한국어
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'text-sm font-medium',
                    currentLang === 'en' ? 'text-primary' : 'text-gray-700'
                  )}
                >
                  English
                </button>
              </div>
              
              <Link
                href="/contact"
                className="mt-4 block w-full px-4 py-2 bg-primary text-white rounded-md text-sm font-medium text-center hover:bg-primary/90 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                무료 상담
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}