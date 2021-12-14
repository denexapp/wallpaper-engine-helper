import { Err, JsonDecoder } from 'ts.data.json';
import { WallpaperType } from '../../common/utils/wallpaperTypes';

interface SelectedWallpaperConfig {
  file: string;
}

interface UserConfig {
  version: 2;
  general: {
    browser: {
      lastselectedmonitor: string;
    };
    wallpaperconfig: {
      selectedwallpapers: {
        [monitor: string]: SelectedWallpaperConfig;
      };
    };
  };
}

export interface Config {
  [username: string]: UserConfig;
}

export interface Package {
  dependency?: string;
  preset?: Record<string, unknown>;
  type?: WallpaperType;
  workshopId?: number;
  file: string;
}

const selectedWallpaperConfigDecoder = JsonDecoder.object<SelectedWallpaperConfig>(
  {
    file: JsonDecoder.string,
  },
  'SelectedWallpaperConfig'
);

const userConfigDecoder = JsonDecoder.object<UserConfig>(
  {
    version: JsonDecoder.isExactly(2),
    general: JsonDecoder.object(
      {
        browser: JsonDecoder.object(
          {
            lastselectedmonitor: JsonDecoder.string,
          },
          'browser'
        ),
        wallpaperconfig: JsonDecoder.object(
          {
            selectedwallpapers: JsonDecoder.dictionary(
              selectedWallpaperConfigDecoder,
              'selectedwallpaper'
            ),
          },
          'wallpaperconfig'
        ),
      },
      'general'
    ),
  },
  'UserConfig'
);
const configDictionaryDecoder: JsonDecoder.Decoder<Config> = JsonDecoder.dictionary<UserConfig>(
  userConfigDecoder,
  'Config'
);

export const configDecoder: JsonDecoder.Decoder<Config> = new JsonDecoder.Decoder(
  (json: unknown) => {
    const result = JsonDecoder.dictionary<string | UserConfig>(
      JsonDecoder.oneOf<string | UserConfig>(
        [JsonDecoder.string, userConfigDecoder],
        'configDecoder'
      ),
      'configDecoder'
    ).decode(json);
    if (!result.isOk()) {
      return new Err('value is not an object');
    }
    const {
      _installdirectory: installDirectory,
      '?installdirectory': installDirectoryNew,
      ...valueWithoutInstallDirectory
    } = result.value;
    return configDictionaryDecoder.decode(valueWithoutInstallDirectory);
  }
);

const wallpaperTypeDecoder: JsonDecoder.Decoder<WallpaperType> = new JsonDecoder.Decoder(
  (json: unknown) => {
    const result = JsonDecoder.string.decode(json);
    if (!result.isOk()) {
      return new Err('Value is not a string');
    }
    const value = result.value.toLowerCase();
    return JsonDecoder.oneOf<WallpaperType>(
      [
        JsonDecoder.isExactly('application'),
        JsonDecoder.isExactly('video'),
        JsonDecoder.isExactly('scene'),
        JsonDecoder.isExactly('web'),
      ],
      'WallpaperType'
    ).decode(value);
  }
);

export const packageDecoder = JsonDecoder.object<Package>(
  {
    dependency: JsonDecoder.optional(JsonDecoder.string),
    preset: JsonDecoder.optional(JsonDecoder.object({}, 'preset')),
    type: JsonDecoder.optional(wallpaperTypeDecoder),
    workshopId: JsonDecoder.optional(JsonDecoder.number),
    file: JsonDecoder.string,
  },
  'Package'
);
