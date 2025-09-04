'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <main className={cn('flex-1 relative', className)}>
        {children}
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-8 right-8 z-40 p-3 rounded-full transition-all duration-300 shadow-lg',
          'bg-primary text-primary-foreground hover:scale-110 hover:shadow-xl',
          'backdrop-blur-sm border border-white/20',
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  )
}

// Container wrapper component for consistent spacing
export function Container({ 
  children, 
  className,
  size = 'default'
}: { 
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full'
}) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-8xl',
    xl: 'max-w-9xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}

// Section wrapper with consistent spacing
export function Section({ 
  children, 
  className,
  background = 'default',
  padding = 'default'
}: { 
  children: React.ReactNode
  className?: string
  background?: 'default' | 'muted' | 'primary' | 'gradient'
  padding?: 'sm' | 'default' | 'lg' | 'xl' | 'none'
}) {
  const backgroundClasses = {
    default: '',
    muted: 'bg-muted/50',
    primary: 'bg-primary text-primary-foreground',
    gradient: 'bg-gradient-to-br from-primary/5 to-blue-50'
  }

  const paddingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    default: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32'
  }

  return (
    <section className={cn(
      paddingClasses[padding],
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  )
}

// Admin Layout (for future use)
export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar placeholder */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white shadow-sm">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
            <nav className="mt-5 flex-1" aria-label="Sidebar">
              {/* Navigation items will be added when needed */}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <Container>
                {children}
              </Container>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}