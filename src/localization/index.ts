// do prefix keys with context name
// it helps to keep keys unique across the project

type Main =
  | 'mainHeader'
  | 'mainPostBundling'
  | 'mainHowTo'
  | 'mainStepsToPost'
  | 'mainWallpaperName'
  | 'mainWallpaperType'
  | 'mainWallpaperLink'
  | 'mainDescription'
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

type Settings =
  | 'settingsTitle'
  | 'settingsClose'
  | 'settingsWallpaperEngineFolderLabel'
  | 'settingsWallpaperEngineFolderSelected'
  | 'settingsWallpaperEngineFolderSelectionError'
  | 'settingsGettingError'
  | 'settingsGotten'

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
  ...messages.settings
})
