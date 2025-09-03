'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from '@/lib/translations'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { blogPosts, getFeaturedPosts } from '@/lib/blog-data'
import { format } from 'date-fns'
import { ko, enUS } from 'date-fns/locale'

export function BlogSection() {
  const t = useTranslations('blog')
  const locale = useLocale() as 'en' | 'ko'
  
  // Get the 3 most recent featured posts, or just the 3 most recent posts
  const featuredPosts = getFeaturedPosts().slice(0, 3)
  const displayPosts = featuredPosts.length > 0 
    ? featuredPosts 
    : blogPosts.slice(0, 3)
  
  const dateLocale = locale === 'ko' ? ko : enUS

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => {
            const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy', { locale: dateLocale })
            
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover-lift flex flex-col"
              >
                <span className="text-xs font-semibold text-primary uppercase">
                  {t(`categories.${post.category}`)}
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-3 line-clamp-2">
                  {post.title[locale]}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {post.excerpt[locale]}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author.name}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formattedDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readingTime} {t('post.readingTime')}
                  </span>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80"
                  >
                    {t('readMore')}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/blog`}
            className="btn-primary"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}