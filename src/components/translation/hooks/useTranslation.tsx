import { useRouter } from 'next/router'

import { en, LocaleType, uk, ru } from '@/components/translation'

export const useTranslation = () => {
  const { locale, defaultLocale } = useRouter()

  const translations: Record<string, LocaleType> = {
    en,
    uk,
    ru,
  }

  const t: LocaleType = locale !== undefined ? translations[locale] : en

  return { t, locale, defaultLocale }
}
