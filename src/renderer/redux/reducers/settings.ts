import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LocaleCode } from '../../../common/localization';
import { Settings } from '../../../common/types/Settings';

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
      window.electron.ipcRenderer.once(
        'settings-get-success',
        (settings: Settings) => {
          resolve(settings);
        }
      );
      window.electron.ipcRenderer.once('settings-get-fail', () => reject());
      window.electron.ipcRenderer.settingsGet(showWindow);
    });

    const settings = await getSettingsPromise;

    if (showWindow) {
      const showWindowPromise = new Promise<void>((resolve, reject) => {
        window.electron.ipcRenderer.once('settings-window-show-success', () =>
          resolve()
        );
        window.electron.ipcRenderer.once('settings-window-show-fail', () =>
          reject()
        );
        window.electron.ipcRenderer.settingsWindowShow();
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
      window.electron.ipcRenderer.once(
        'settings-set-wallpaper-engine-folder-success',
        (set: boolean) => {
          resolve(set);
        }
      );
      window.electron.ipcRenderer.once(
        'settings-set-wallpaper-engine-folder-fail',
        () => reject()
      );
      window.electron.ipcRenderer.settingsSetWallpaperEngineFolder();
    })
);

export const settingsRecordedVideosFolder = createAsyncThunk(
  'settings/settingsRecordedVideosFolder',
  () =>
    new Promise<boolean>((resolve, reject) => {
      window.electron.ipcRenderer.once(
        'settings-set-recorded-videos-folder-success',
        (set: boolean) => {
          resolve(set);
        }
      );
      window.electron.ipcRenderer.once(
        'settings-set-recorded-videos-folder-fail',
        () => reject()
      );
      window.electron.ipcRenderer.settingsSetRecordedVideosFolder();
    })
);

export const settingsLocale = createAsyncThunk(
  'settings/locale',
  (localeCode: LocaleCode) =>
    new Promise<LocaleCode>((resolve, reject) => {
      window.electron.ipcRenderer.once(
        'settings-set-locale-success',
        (returnedLocaleCode: LocaleCode) => {
          resolve(returnedLocaleCode);
        }
      );
      window.electron.ipcRenderer.once('settings-set-locale-fail', () =>
        reject()
      );
      window.electron.ipcRenderer.settingsSetLocale(localeCode);
    })
);

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
