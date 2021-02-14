import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import { LocaleCode } from '../../localization';
import { Settings } from '../../mainProccess/settings';

export interface State {
  settings: Settings | null;
}

const initialState: State = {
  settings: null,
} as State;

export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (showWindow: boolean) => {
    const getSettingsPromise = new Promise<Settings>((resolve, reject) => {
      ipcRenderer.once('settings-get-success', (_event, settings) => {
        resolve(settings);
      });
      ipcRenderer.once('settings-get-fail', () => reject());
      ipcRenderer.send('settings-get', showWindow);
    });

    const settings = await getSettingsPromise;

    if (showWindow) {
      const showWindowPromise = new Promise<void>((resolve, reject) => {
        ipcRenderer.once('settings-window-show-success', () => resolve());
        ipcRenderer.once('settings-window-show-fail', () => reject());
        ipcRenderer.send('settings-window-show');
      });

      await showWindowPromise;
    }

    return settings;
  }
);

export const settingsWallpaperEngineFolder = createAsyncThunk(
  'settings/settingsWallpaperEngineFolder',
  () =>
    new Promise<boolean>((resolve, reject) => {
      ipcRenderer.once(
        'settings-set-wallpaper-engine-folder-success',
        (_event, set) => {
          resolve(set);
        }
      );
      ipcRenderer.once('settings-set-wallpaper-engine-folder-fail', () =>
        reject()
      );
      ipcRenderer.send('settings-set-wallpaper-engine-folder');
    })
);

export const settingsLocale = createAsyncThunk(
  'settings/locale',
  (localeCode: LocaleCode) =>
    new Promise<LocaleCode>((resolve, reject) => {
      ipcRenderer.once(
        'settings-set-locale-success',
        (_event, returnedLocaleCode) => {
          resolve(returnedLocaleCode);
        }
      );
      ipcRenderer.once('settings-set-locale-fail', () => reject());
      ipcRenderer.send('settings-set-locale', localeCode);
    })
);

// export const setSettings = createAsyncThunk(
//   'settings/setSettings',
//   (settings: PartialSettings) =>
//     new Promise<void>((resolve, reject) => {
//       ipcRenderer.once('settings-set-success', () => resolve())
//       ipcRenderer.once('settings-set-fail', () => reject())
//       ipcRenderer.send('settings-set')
//     })
// )

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(settingsLocale.fulfilled, (state, action) => {
        if (state.settings) {
          state.settings.locale = action.payload;
        }
      }),
});

export default settings;
