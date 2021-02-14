import { defaultLocale, LocaleCode, locales } from '../localization';

const useLocaleMessages = (localeCode?: LocaleCode) => {
  const localeMessages = locales[localeCode ?? defaultLocale].messages;

  return localeMessages;
};

export default useLocaleMessages;
