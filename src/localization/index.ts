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
  | 'mainArchiveNumber'
  | 'mainDescription'
  | 'mainPostText'
  | 'mainFolderName'
  | 'mainVideoName'
  | 'mainVideoDescription'
  | 'mainArchiveName'

type Copy = 
  | 'copySuccess'
  | 'copyFail'

type Instruction = 
  | 'instructionSubscriptions'
  | 'instructionRecentApproved'
  | 'instructionMostPopularToday'
  | 'instructionSubreddit'
  | 'instructionDiscordChannel'
  | 'instructionSteamDiscussionsShowcase'

type StepsToPost = 
  | 'stepsToPostVideo'
  | 'stepsToPostArchive'
  | 'stepsToPostPost'

type WallpaperType = 
  | 'wallpaperTypeApplication'
  | 'wallpaperTypeScene'
  | 'wallpaperTypeVideo'
  | 'wallpaperTypeWeb'

export type MessageKey = Main | Copy | Instruction | WallpaperType | StepsToPost

type Context<K extends string> = { [Key in K]: string }

export type Messages = {
  main: Context<Main>
  copy: Context<Copy>
  instruction: Context<Instruction>
  wallpaperType: Context<WallpaperType>
  stepsToPost: Context<StepsToPost>
}

export const prepareMessages = (messages: Messages): Record<MessageKey, string> => ({
  ...messages.main,
  ...messages.copy,
  ...messages.instruction,
  ...messages.wallpaperType,
  ...messages.stepsToPost
})
