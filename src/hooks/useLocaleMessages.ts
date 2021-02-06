import { useMemo } from 'react'
import { defaultLocale, LocaleCode, locales, prepareMessages } from '../localization'

const useLocaleMessages = (localeCode?: LocaleCode) => {
  const localeMessages = useMemo(() => {
    const locale = locales[localeCode ?? defaultLocale]
    return prepareMessages(locale.messages)
  }, [localeCode])

  return localeMessages
}

export default useLocaleMessages
