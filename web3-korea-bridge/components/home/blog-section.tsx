'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from '@/lib/translations'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'

export function BlogSection() {
  const t = useTranslations('blog')
  const locale = useLocale()

  // Mock data - will be replaced with actual data from database
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Korean Web3 Regulations',
      excerpt: 'A comprehensive guide to navigating the regulatory landscape in Korea',
      author: 'Admin',
      date: '2024-01-15',
      category: 'Regulation'
    },
    {
      id: 2,
      title: 'Top 10 Korean Enterprises Embracing Blockchain',
      excerpt: 'Major corporations leading the Web3 transformation in Korea',
      author: 'Admin',
      date: '2024-01-10',
      category: 'Industry'
    },
    {
      id: 3,
      title: 'Success Stories: Global Web3 Companies in Korea',
      excerpt: 'Case studies of successful market entries and partnerships',
      author: 'Admin',
      date: '2024-01-05',
      category: 'Case Study'
    },
  ]

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
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 hover-lift"
            >
              <span className="text-xs font-semibold text-primary uppercase">
                {post.category}
              </span>
              <h3 className="text-xl font-semibold mt-2 mb-3">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </span>
                </div>
              </div>
              <Link
                href={`/${locale}/blog/${post.id}`}
                className="inline-flex items-center text-primary hover:text-primary/80 mt-4"
              >
                {t('readMore')}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.article>
          ))}
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