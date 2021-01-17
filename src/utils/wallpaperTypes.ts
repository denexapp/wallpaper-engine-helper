import { MessageKey } from '../localization'

export type WallpaperType = 'scene' | 'web' | 'application' | 'video'

type WallpaperTypeDescription = {
  messageId: MessageKey
  postText: string
  resolutions: boolean
}

export const wallpaperTypeDescriptions: {
  [key in WallpaperType]: WallpaperTypeDescription
} = {
  application: {
    messageId: 'wallpaperTypeApplication',
    postText: 'приложение',
    resolutions: false
  },
  scene: {
    messageId: 'wallpaperTypeScene',
    postText: 'сцена',
    resolutions: false
  },
  video: {
    messageId: 'wallpaperTypeVideo',
    postText: 'видео',
    resolutions: true
  },
  web: {
    messageId: 'wallpaperTypeWeb',
    postText: 'веб',
    resolutions: false
  }
}
