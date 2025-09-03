'use client'

import React, { useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from '@/lib/translations'
import { motion, useAnimation, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles, Globe, Zap } from 'lucide-react'

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const controls = useAnimation()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  const handleScrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleScrollDown()
    }
  }, [handleScrollDown])

  const containerVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        staggerChildren: shouldReduceMotion ? 0.05 : 0.2,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  }), [shouldReduceMotion])

  const itemVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 10 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.3 : 0.8,
      }
    }
  }), [shouldReduceMotion])

  const titleVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 15 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.3 : 1,
      }
    }
  }), [shouldReduceMotion])

  const scrollIndicatorVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 5 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        delay: shouldReduceMotion ? 0.5 : 2, 
        duration: shouldReduceMotion ? 0.3 : 1,
      }
    }
  }), [shouldReduceMotion])

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section"
      role="banner"
      aria-label="Hero Section"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Large floating orbs with improved positioning and animations */}
        <motion.div 
          className="absolute top-1/4 left-1/12 w-64 h-64 md:w-80 md:h-80 bg-blue-500/10 rounded-full filter blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/12 w-72 h-72 md:w-96 md:h-96 bg-indigo-500/10 rounded-full filter blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Smaller accent orbs */}
        <motion.div 
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/15 rounded-full filter blur-2xl"
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Decorative icons */}
        <motion.div
          className="absolute top-20 right-20 text-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-16 text-white/10"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Globe className="w-12 h-12" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container-default relative z-10 text-white text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-5xl mx-auto"
        >
          {/* Enhanced Main Title with gradient text */}
          <motion.h1 
            variants={titleVariants}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text block" aria-label="웹쓰리 코리아 브릿지">
              Web3-Korea Bridge
            </span>
            <motion.span 
              className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/90 mt-2"
              variants={itemVariants}
            >
              {t('title')}
            </motion.span>
          </motion.h1>
          
          {/* Enhanced Subtitle with better typography */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl mb-4 text-white/90 font-medium max-w-4xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
          
          {/* Enhanced Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            {t('description')}
          </motion.p>

          {/* Enhanced CTA Buttons with better styling */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href={`/${locale}/contact`}
              className="group btn-primary-enhanced px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 min-w-[200px]"
            >
              <span>{t('cta.primary')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href={`/${locale}/services`}
              className="group px-8 py-4 text-lg bg-transparent border-2 border-white/80 text-white font-semibold rounded-lg hover:bg-white hover:text-slate-800 hover:border-white hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[200px] flex items-center justify-center space-x-2"
            >
              <Zap className="h-5 w-5 group-hover:text-blue-600 transition-colors" />
              <span>{t('cta.secondary')}</span>
            </Link>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap justify-center items-center gap-4 text-white/80"
          >
            <div className="trust-indicator">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">15년 삼성전자 경력</span>
            </div>
            <div className="trust-indicator">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-sm font-medium">PEF M&A 전문가</span>
            </div>
            <div className="trust-indicator">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-sm font-medium">Web3 비즈니스 파트너</span>
            </div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            variants={scrollIndicatorVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 cursor-pointer"
            onClick={handleScrollDown}
            role="button"
            aria-label="스크롤하여 다음 섹션 보기"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <div className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors group">
              <span className="text-sm font-medium">Scroll Down</span>
              <ChevronDown className="h-8 w-8 animate-bounce group-hover:animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Decorative Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}