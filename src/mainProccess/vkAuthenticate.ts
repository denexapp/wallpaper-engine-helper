import { BrowserWindow, shell, session } from 'electron'
import environment from './environment'

const VK_AUTHORIZE_URL = 'https://oauth.vk.com/authorize'
const VK_REDIRECT_URL = 'https://oauth.vk.com/blank.html'

const vkAuthenticate = () => {
  const state = Math.floor(Math.random() * 10000).toString(10)

  const query = new URLSearchParams(
    Object.entries({
      state,
      response_type: 'token',
      client_id: environment.vkAppId,
      scope: (
        16 + // video
        8192 + // wall
        65536 + // offline
        131072 + // docs
        0
      ).toString(10),
      display: 'mobile',
      redirect_uri: VK_REDIRECT_URL
    })
  )

  const vkurl = `${VK_AUTHORIZE_URL}?${query}`

  const browserSession = session.fromPartition('vkAuthenticate')

  const window = new BrowserWindow({
    show: false,
    width: 540,
    height: 710,
    webPreferences: { partition: 'vkAuthenticate' }
  })

  window.removeMenu()

  window.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  window.on('ready-to-show', () => {
    window.show()
  })

  window.loadURL(vkurl)

  return new Promise<{
    accessToken: string | null
  }>((resolve, reject) => {
    window.on('closed', async () => {
      resolve({ accessToken: null })
      await browserSession.clearStorageData()
    })

    window.webContents.on('did-navigate', (event, stringUrl) => {
      const url = new URL(stringUrl)
      const { hash } = url
      const urlWithoutHash = url.toString().slice(0, -hash.length)
      const hashSymbol = hash.slice(0, 1)
      const hashWithoutSymbol = hash.slice(1)

      if (urlWithoutHash !== VK_REDIRECT_URL || hashSymbol !== '#') {
        return // Wrong page, no need to react
      }

      const params = new URLSearchParams(hashWithoutSymbol)
      const accessToken = params.get('access_token')
      const userIdString = params.get('user_id')
      const responseState = params.get('state')
      const errorReason = params.get('error_reason')

      if (errorReason === 'user_denied') {
        // User pressed the cancel button
        resolve({ accessToken: null })
      }
      
      if (
        accessToken === null ||
        accessToken === undefined ||
        userIdString === null ||
        userIdString === undefined ||
        responseState !== state
      ) {
        reject()
        window.destroy()
        return
      }

      resolve({ accessToken })

      window.destroy()
    })
  })
}

export default vkAuthenticate
