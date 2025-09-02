import { getRequestConfig } from 'next-intl/server'

export const locales = ['ko', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ko'

export default getRequestConfig(async ({ locale }) => {
  // Use default locale if none provided
  const currentLocale = locale || defaultLocale
  
  // Validate locale
  if (!locales.includes(currentLocale as any)) {
    // Fallback to default locale instead of throwing error
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default
    }
  }

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default
  }
})