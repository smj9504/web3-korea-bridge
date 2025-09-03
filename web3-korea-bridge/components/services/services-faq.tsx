'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export function ServicesFAQ() {
  const t = useTranslations('services.faq')
  const [openItems, setOpenItems] = useState<string[]>(['general-1']) // First item open by default

  const faqs: FAQItem[] = [
    {
      id: 'general-1',
      question: t('general.q1.question'),
      answer: t('general.q1.answer'),
      category: 'general'
    },
    {
      id: 'general-2',
      question: t('general.q2.question'),
      answer: t('general.q2.answer'),
      category: 'general'
    },
    {
      id: 'general-3',
      question: t('general.q3.question'),
      answer: t('general.q3.answer'),
      category: 'general'
    },
    {
      id: 'process-1',
      question: t('process.q1.question'),
      answer: t('process.q1.answer'),
      category: 'process'
    },
    {
      id: 'process-2',
      question: t('process.q2.question'),
      answer: t('process.q2.answer'),
      category: 'process'
    },
    {
      id: 'process-3',
      question: t('process.q3.question'),
      answer: t('process.q3.answer'),
      category: 'process'
    },
    {
      id: 'pricing-1',
      question: t('pricing.q1.question'),
      answer: t('pricing.q1.answer'),
      category: 'pricing'
    },
    {
      id: 'pricing-2',
      question: t('pricing.q2.question'),
      answer: t('pricing.q2.answer'),
      category: 'pricing'
    },
    {
      id: 'pricing-3',
      question: t('pricing.q3.question'),
      answer: t('pricing.q3.answer'),
      category: 'pricing'
    },
    {
      id: 'legal-1',
      question: t('legal.q1.question'),
      answer: t('legal.q1.answer'),
      category: 'legal'
    },
    {
      id: 'legal-2',
      question: t('legal.q2.question'),
      answer: t('legal.q2.answer'),
      category: 'legal'
    },
    {
      id: 'legal-3',
      question: t('legal.q3.question'),
      answer: t('legal.q3.answer'),
      category: 'legal'
    }
  ]

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const categories = [
    { id: 'general', label: t('categories.general'), icon: HelpCircle },
    { id: 'process', label: t('categories.process'), icon: HelpCircle },
    { id: 'pricing', label: t('categories.pricing'), icon: HelpCircle },
    { id: 'legal', label: t('categories.legal'), icon: HelpCircle }
  ]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFaqs = selectedCategory 
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" size="lg" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {t('categories.all')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => {
                const isOpen = openItems.includes(faq.id)
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="border-2 hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-0">
                        {/* Question Header */}
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full p-6 text-left flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                        >
                          <h3 className="text-lg font-semibold pr-4 group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            {isOpen ? (
                              <Minus className="h-5 w-5 text-primary" />
                            ) : (
                              <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                          </motion.div>
                        </button>

                        {/* Answer Content */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-0">
                                <div className="w-full h-px bg-border mb-4" />
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                {t('stillHaveQuestions.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('stillHaveQuestions.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('stillHaveQuestions.contact')}
                </a>
                <a 
                  href="mailto:info@web3-korea-bridge.com" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  {t('stillHaveQuestions.email')}
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}