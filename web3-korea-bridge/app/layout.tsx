import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web3-Korea Bridge | Connect Web3 to Korea',
  description: '해외 Web3 기업의 한국 진출, 성공의 가장 빠른 길',
  keywords: 'Web3, Korea, Blockchain, Partnership, Consulting, 블록체인, 한국진출',
  openGraph: {
    title: 'Web3-Korea Bridge',
    description: '해외 Web3 기업의 한국 진출 파트너',
    images: ['/og-image.png'],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({
  children
}: RootLayoutProps) {

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}