import { LocaleCode } from '../localization';

export interface Settings {
  wallpaperEngineFolder?: string;
  recordedVideosFolder?: string;
  vkAccessToken?: string;
  locale: LocaleCode;
}
