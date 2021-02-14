// do prefix keys with context name
// it helps to keep keys unique across the project

import { Messages } from './messages';
import enUsMessages from './messages/en-US';
import ruRuMessages from './messages/ru-RU';

export type LocaleCode = 'en-US' | 'ru-RU';

type Locale = {
  messages: Messages;
  name: string;
};

export const locales: {
  [key in LocaleCode]: Locale;
} = {
  'en-US': { messages: enUsMessages, name: 'English' },
  'ru-RU': { messages: ruRuMessages, name: 'Русский' },
} as const;

export type MessageKey = keyof Messages;

export const defaultLocale: LocaleCode = 'en-US';
