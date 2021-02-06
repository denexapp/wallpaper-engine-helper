import { useMemo } from 'react'
import { defaultLocale, Locale, locales, prepareMessages } from '../localization'

const useLocaleMessages = (locale?: Locale) => {
  const localeMessages = useMemo(() => {
    const localeMessages = locales[locale ?? defaultLocale]
    return prepareMessages(localeMessages)
  }, [locale])

  return localeMessages
}

export default useLocaleMessages
