import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  OpenDialogOptions,
  safeStorage,
} from 'electron';
import electronSettings from 'electron-settings';
import { JsonDecoder } from 'ts.data.json';
import { defaultLocale, LocaleCode } from '../../common/localization';
import { Settings } from '../../common/types/Settings';

const settingsPrefix = 'settings';
const vkAccessTokenPrefix = 'vkAccessToken';

const settingsDecoder = JsonDecoder.failover<Settings>(
  { locale: defaultLocale, recordedVideosFolder: app.getPath('videos') },
  JsonDecoder.object(
    {
      wallpaperEngineFolder: JsonDecoder.optional(JsonDecoder.string),
      locale: JsonDecoder.failover(
        defaultLocale,
        JsonDecoder.oneOf(
          [JsonDecoder.isExactly('en-US'), JsonDecoder.isExactly('ru-RU')],
          'locale'
        )
      ),
      recordedVideosFolder: JsonDecoder.failover(
        app.getPath('videos'),
        JsonDecoder.string
      ),
    },
    'settingsDecoder'
  )
);

const vkAccessTokenDecoder = JsonDecoder.optional(
  JsonDecoder.string.map((value) =>
    safeStorage.decryptString(Buffer.from(value, 'latin1'))
  )
);

export const getSettings = async (): Promise<Settings> => {
  const settingsObject = await electronSettings.get(settingsPrefix);
  return settingsDecoder.decodeToPromise(settingsObject);
};

export const setSettingsField = async <T extends keyof Settings>(
  fieldName: T,
  value: Exclude<Settings[T], undefined>
): Promise<void> => {
  await electronSettings.set(`${settingsPrefix}.${fieldName}`, value);
};

export const getVkAccessToken = async (): Promise<string | undefined> => {
  const undecodedToken = await electronSettings.get(vkAccessTokenPrefix);
  return vkAccessTokenDecoder.decodeToPromise(undecodedToken);
};

export const setVKAccessToken = async (accessToken: string) => {
  await electronSettings.set(
    vkAccessTokenPrefix,
    safeStorage.encryptString(accessToken).toString('latin1')
  );
};

export const deleteVKAccessToken = async () => {
  await electronSettings.unset(vkAccessTokenPrefix);
};

const settings = () => {
  ipcMain.on('settings-get', async (event, showErrorDialogOnError: boolean) => {
    try {
      const result = await getSettings();
      event.reply('settings-get-success', result);
    } catch {
      event.reply('settings-get-fail');
      if (showErrorDialogOnError) {
        dialog
          .showMessageBox({
            type: 'error',
            message: "The app can't get settings",
          })
          .then(() => app.quit())
          .catch(() => app.quit());
      }
    }
  });

  ipcMain.on('settings-set-wallpaper-engine-folder', async (event) => {
    try {
      const mainWindow = BrowserWindow.fromWebContents(event.sender);
      const properties: OpenDialogOptions = {
        properties: ['openDirectory'],
      };

      const promise =
        mainWindow === null
          ? dialog.showOpenDialog(properties)
          : dialog.showOpenDialog(mainWindow, properties);

      const [path] = (await promise).filePaths;

      if (path !== undefined) {
        await setSettingsField('wallpaperEngineFolder', path);
        event.reply('settings-set-wallpaper-engine-folder-success', true);
      } else {
        event.reply('settings-set-wallpaper-engine-folder-success', false);
      }
    } catch {
      event.reply('settings-set-wallpaper-engine-folder-fail');
    }
  });

  ipcMain.on('settings-set-recorded-videos-folder', async (event) => {
    try {
      const mainWindow = BrowserWindow.fromWebContents(event.sender);
      const properties: OpenDialogOptions = {
        properties: ['openDirectory'],
      };

      const promise =
        mainWindow === null
          ? dialog.showOpenDialog(properties)
          : dialog.showOpenDialog(mainWindow, properties);

      const [path] = (await promise).filePaths;

      if (path !== undefined) {
        await setSettingsField('recordedVideosFolder', path);
        event.reply('settings-set-recorded-videos-folder-success', true);
      } else {
        event.reply('settings-set-recorded-videos-folder-success', false);
      }
    } catch {
      event.reply('settings-set-recorded-videos-folder-fail');
    }
  });

  ipcMain.on('settings-set-locale', async (event, localeCode: LocaleCode) => {
    try {
      await setSettingsField('locale', localeCode);
      event.reply('settings-set-locale-success', localeCode);
    } catch {
      event.reply('settings-set-locale-fail');
    }
  });

  ipcMain.on('settings-window-show', async (event) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender);
    if (mainWindow !== null) {
      mainWindow.show();
      event.reply('settings-window-show-success');
    } else {
      event.reply('settings-window-show-fail');
      dialog
        .showMessageBox({
          type: 'error',
          message: "The app can't show the main window",
        })
        .then(() => app.quit())
        .catch(() => app.quit());
    }
  });

  ipcMain.on('settings-set-vk-access-token', async (event, accessToken) => {
    try {
      await setVKAccessToken(accessToken);
      event.reply('settings-set-vk-token-success');
    } catch {
      event.reply('settings-set-vk-token-fail');
    }
  });
};

export default settings;
