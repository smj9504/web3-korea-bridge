import { getRequestConfig } from 'next-intl/server'

const locales = ['ko', 'en'] as const
const defaultLocale = 'ko'

export default getRequestConfig(async ({ locale }) => {
  // Use default locale if none provided
  const currentLocale = locale || defaultLocale
  
  // Validate locale and fallback to default if invalid
  if (!locales.includes(currentLocale as any)) {
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default
    }
  }

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  }
})