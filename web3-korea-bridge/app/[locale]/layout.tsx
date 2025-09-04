import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import type { Metadata } from 'next'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  const isKorean = locale === 'ko'
  
  return {
    title: isKorean 
      ? 'Web3-Korea Bridge | Web3 기업의 한국 진출 파트너' 
      : 'Web3-Korea Bridge | Connect Web3 to Korea',
    description: isKorean
      ? '해외 Web3 기업의 한국 진출, 성공의 가장 빠른 길. 블록체인, 파트너십, 컨설팅 서비스를 제공합니다.'
      : 'The fastest path to success for global Web3 companies entering Korea. Blockchain partnerships and consulting services.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ko': '/ko',
        'en': '/en',
        'x-default': '/ko'
      }
    },
    openGraph: {
      locale: isKorean ? 'ko_KR' : 'en_US',
      alternateLocale: isKorean ? 'en_US' : 'ko_KR'
    }
  }
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  
  // Validate locale
  if (!['en', 'ko'].includes(locale)) {
    notFound()
  }
  
  // Load messages directly based on locale
  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}