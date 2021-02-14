import { app, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import electronIsDev from 'electron-is-dev';

const autoupdate = () => {
  if (!electronIsDev) {
    setTimeout(() => {
      setInterval(() => {
        autoUpdater.checkForUpdatesAndNotify();
      }, 180_000);
    }, 20_000);
  }

  ipcMain.on('get-version', (event) => {
    event.reply('get-version', app.getVersion());
  });

  ipcMain.on('restart-to-update', () => {
    autoUpdater.quitAndInstall();
  });
};

export default autoupdate;
