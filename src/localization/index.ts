// do prefix keys with context name
// it helps to keep keys unique across the project

import enUsMessages from './messages/en-US'
import ruRuMessages from './messages/ru-RU'

type Main =
  | 'mainHeader'
  | 'mainHowTo'
  | 'mainStepsToPost'
  | 'mainPostText'
  | 'mainFolderName'
  | 'mainVideoName'
  | 'mainVideoDescription'
  | 'mainArchiveName'
  | 'mainAbout'
  | 'mainSettings'

type Copy = 'copySuccess' | 'copyFail'

type Instruction =
  | 'instructionSubscriptions'
  | 'instructionRecentApproved'
  | 'instructionMostPopularToday'
  | 'instructionSubreddit'
  | 'instructionDiscordChannel'
  | 'instructionSteamDiscussionsShowcase'

type StepsToPost = 'stepsToPostVideo' | 'stepsToPostArchive' | 'stepsToPostPost'

type WallpaperType =
  | 'wallpaperTypeApplication'
  | 'wallpaperTypeScene'
  | 'wallpaperTypeVideo'
  | 'wallpaperTypeWeb'

type Version =
  | 'versionVersion'
  | 'versionNewVersionDownloaded'
  | 'versionRestartToUpdate'

type Pages = 'pagesAuthenticationError'

type User =
  | 'userSignIn'
  | 'userSignOut'
  | 'userSigningIn'
  | 'userSigningOut'
  | 'userAuthenticationError'
  | 'userSigningOutError'
  | 'userSignedIn'
  | 'userSignedOut'
// | 'userLoadingData'
// | 'userDataError'
// | 'userDataErrorToast'
// | 'userDataTryAgain'

type Documents =
  | 'documentsRequestError'
  | 'documentsRequestSuccess'
  | 'documentsArchiveNumberLabel'
  | 'documentsHint'

type Settings =
  | 'settingsTitle'
  | 'settingsClose'
  | 'settingsWallpaperEngineFolderLabel'
  | 'settingsWallpaperEngineFolderSelected'
  | 'settingsWallpaperEngineFolderSelectionError'
  | 'settingsGettingError'
  | 'settingsGotten'
  | 'settingsLocaleLabel'
  | 'settingsLocaleSelectionError'

type WallpaperInfo =
  | 'wallpaperInfoHeader'
  | 'wallpaperInfoName'
  | 'wallpaperInfoType'
  | 'wallpaperInfoLink'
  | 'wallpaperInfoHint'
  | 'wallpaperInfoGettingError'
  | 'wallpaperInfoGotten'

type Post = 'postHeader' | 'postDescriptionLabel'

export type MessageKey =
  | Main
  | Copy
  | Instruction
  | WallpaperType
  | StepsToPost
  | Version
  | Pages
  | User
  | Documents
  | Settings
  | WallpaperInfo
  | Post

type Context<K extends string> = { [Key in K]: string }

export type Messages = {
  main: Context<Main>
  copy: Context<Copy>
  instruction: Context<Instruction>
  wallpaperType: Context<WallpaperType>
  stepsToPost: Context<StepsToPost>
  version: Context<Version>
  pages: Context<Pages>
  user: Context<User>
  documents: Context<Documents>
  settings: Context<Settings>
  wallpaperInfo: Context<WallpaperInfo>
  post: Context<Post>
}

export const prepareMessages = (
  messages: Messages
): Record<MessageKey, string> => ({
  ...messages.main,
  ...messages.copy,
  ...messages.instruction,
  ...messages.wallpaperType,
  ...messages.stepsToPost,
  ...messages.version,
  ...messages.pages,
  ...messages.user,
  ...messages.documents,
  ...messages.settings,
  ...messages.wallpaperInfo,
  ...messages.post
})

export type LocaleCode = 'en-US' | 'ru-RU'

type Locale = {
  messages: Messages
  name: string
}

export const locales: {
  [key in LocaleCode]: Locale
} = {
  'en-US': { messages: enUsMessages, name: 'English' },
  'ru-RU': { messages: ruRuMessages, name: 'Русский' }
} as const

export const defaultLocale: LocaleCode = 'en-US'
