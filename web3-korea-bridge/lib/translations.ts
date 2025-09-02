// Simple translation system without next-intl
import koMessages from '@/messages/ko.json'
import enMessages from '@/messages/en.json'

type Messages = typeof koMessages

let currentLocale = 'ko'

export function setLocale(locale: 'ko' | 'en') {
  currentLocale = locale
}

export function getLocale() {
  return currentLocale
}

export function useTranslations(namespace: keyof Messages) {
  const messages = currentLocale === 'ko' ? koMessages : enMessages
  const namespaceMessages = messages[namespace] as Record<string, unknown>
  
  return (key: string): string => {
    if (!namespaceMessages) return key
    
    // Handle nested keys like 'cta.primary'
    const keys = key.split('.')
    let value: unknown = namespaceMessages
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }
}

export function useLocale() {
  return currentLocale
}