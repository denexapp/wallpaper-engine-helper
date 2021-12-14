import { defaultLocale, LocaleCode, locales } from '../../common/localization';

const useLocaleMessages = (localeCode?: LocaleCode) => {
  const localeMessages = locales[localeCode ?? defaultLocale].messages;

  return localeMessages;
};

export default useLocaleMessages;
