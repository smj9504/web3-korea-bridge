import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://web3-korea-bridge.vercel.app'),
  title: {
    default: 'Web3-Korea Bridge | Connect Web3 to Korea',
    template: '%s | Web3-Korea Bridge'
  },
  description: '해외 Web3 기업의 한국 진출, 성공의 가장 빠른 길',
  keywords: 'Web3, Korea, Blockchain, Partnership, Consulting, 블록체인, 한국진출',
  authors: [{ name: 'Web3-Korea Bridge' }],
  creator: 'Web3-Korea Bridge',
  publisher: 'Web3-Korea Bridge',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: 'https://web3-korea-bridge.vercel.app',
    siteName: 'Web3-Korea Bridge',
    title: 'Web3-Korea Bridge | Connect Web3 to Korea',
    description: '해외 Web3 기업의 한국 진출 파트너',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web3-Korea Bridge'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3-Korea Bridge',
    description: '해외 Web3 기업의 한국 진출 파트너',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="ko"
      suppressHydrationWarning
      className={`${inter.variable} font-sans`}
      style={{ colorScheme: 'light' }}
    >
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={`${inter.className} min-h-screen bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}