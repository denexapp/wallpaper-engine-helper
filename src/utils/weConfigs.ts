import { Err, JsonDecoder } from 'ts.data.json'
import { WallpaperType } from './wallpaperTypes'

interface SelectedWallpaperConfig {
  file: string
}

interface UserConfig {
  version: 1
  general: {
    browser: {
      lastselectedmonitor: string
    }
    wallpaperconfig: {
      selectedwallpaper: {
        [monitor: string]: SelectedWallpaperConfig
      }
    }
  }
}

export interface Config {
  [username: string]: UserConfig
}

export interface Package {
  dependency?: string
  preset?: object
  type?: WallpaperType
  workshopId?: number
}

const selectedWallpaperConfigDecoder = JsonDecoder.object<SelectedWallpaperConfig>(
  {
    file: JsonDecoder.string
  },
  'SelectedWallpaperConfig'
)

const userConfigDecoder = JsonDecoder.object<UserConfig>(
  {
    version: JsonDecoder.isExactly(1),
    general: JsonDecoder.object(
      {
        browser: JsonDecoder.object(
          {
            lastselectedmonitor: JsonDecoder.string
          },
          'browser'
        ),
        wallpaperconfig: JsonDecoder.object(
          {
            selectedwallpaper: JsonDecoder.dictionary(
              selectedWallpaperConfigDecoder,
              'selectedwallpaper'
            )
          },
          'wallpaperconfig'
        )
      },
      'general'
    )
  },
  'UserConfig'
)
export const configDecoder: JsonDecoder.Decoder<Config> = JsonDecoder.dictionary<UserConfig>(
  userConfigDecoder,
  'Config'
)

const wallpaperTypeDecoder: JsonDecoder.Decoder<WallpaperType> = new JsonDecoder.Decoder(
  (json: unknown) => {
    const result = JsonDecoder.string.decode(json)
    if (!result.isOk()) {
      return new Err('Value is not a string')
    }
    const value = result.value.toLowerCase()
    return JsonDecoder.oneOf<WallpaperType>(
      [
        JsonDecoder.isExactly('application'),
        JsonDecoder.isExactly('video'),
        JsonDecoder.isExactly('scene'),
        JsonDecoder.isExactly('web')
      ],
      'WallpaperType'
    ).decode(value)
  }
)

export const packageDecoder = JsonDecoder.object<Package>(
  {
    dependency: JsonDecoder.optional(JsonDecoder.string),
    preset: JsonDecoder.optional(JsonDecoder.object({}, 'preset')),
    type: JsonDecoder.optional(wallpaperTypeDecoder),
    workshopId: JsonDecoder.optional(JsonDecoder.number)
  },
  'Package'
)
