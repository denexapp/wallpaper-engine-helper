// do prefix keys with context name
// it helps to keep keys unique across the project

type Main =
  | 'mainHeader'
  | 'mainPostBundling'
  | 'mainHowTo'
  | 'mainWallpaperName'
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

export type MessageKey = Main | Copy | Instruction

type Context<K extends string> = { [Key in K]: string }

export type Messages = {
  main: Context<Main>
  copy: Context<Copy>
  instruction: Context<Instruction>
}

export const prepareMessages = (messages: Messages): Record<MessageKey, string> => ({
  ...messages.main,
  ...messages.copy,
  ...messages.instruction
})
