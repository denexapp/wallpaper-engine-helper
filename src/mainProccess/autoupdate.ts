import { app, autoUpdater, ipcMain } from 'electron'
import electronIsDev from 'electron-is-dev'

const autoupdate = () => {
  if (!electronIsDev && process.argv[1] !== '--squirrel-firstrun') {
    const server = 'https://wallpaper.denexapp.me'
    const url = `${server}/update/${process.platform}/${app.getVersion()}`

    autoUpdater.setFeedURL({ url })

    setTimeout(() => {
      autoUpdater.checkForUpdates()
      setInterval(() => {
        autoUpdater.checkForUpdates()
      }, 180_000)
    }, 20_000)
  }

  ipcMain.on('get-version', event => {
    event.reply('get-version', app.getVersion())
  })

  ipcMain.on('restart-to-update', () => {
    autoUpdater.quitAndInstall()
  })
}

export default autoupdate
