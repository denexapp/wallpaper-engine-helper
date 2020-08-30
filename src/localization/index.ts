// do prefix keys with context name
// it helps to keep keys unique across the project

type Main =
  | 'mainHeader'
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

export type MessageKey = Main | Copy

type Context<K extends string> = { [Key in K]: string }

export type Messages = {
  main: Context<Main>
  copy: Context<Copy>
}

export const prepareMessages = (messages: Messages): Record<MessageKey, string> => ({
  ...messages.main,
  ...messages.copy,
})
