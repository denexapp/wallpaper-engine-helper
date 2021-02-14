import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import { WallpaperInfo } from '../../mainProccess/currentWallpaper';
import { WallpaperType } from '../../utils/wallpaperTypes';

export interface State {
  link: string;
  name: string;
  type: WallpaperType;
  folder: string | null;
}

export const getCurrentWallpaper = createAsyncThunk(
  'wallpaperInfo/current-wallpaper',
  (wallpaperEngineFolder: string) =>
    new Promise<WallpaperInfo>((resolve, reject) => {
      ipcRenderer.once('current-wallpaper-success', (_event, wallpaperInfo) => {
        resolve(wallpaperInfo);
      });
      ipcRenderer.once('current-wallpaper-fail', () => reject());
      ipcRenderer.send('current-wallpaper', wallpaperEngineFolder);
    })
);

const initialState: State = {
  link: '',
  name: '',
  type: 'scene',
  folder: null,
};

const wallpaperInfo = createSlice({
  name: 'wallpaperInfo',
  initialState,
  reducers: {
    setLink(state, action: PayloadAction<string>) {
      state.link = action.payload;
      state.folder = null;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
      state.folder = null;
    },
    setType(state, action: PayloadAction<WallpaperType>) {
      state.type = action.payload;
      state.folder = null;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getCurrentWallpaper.fulfilled, (state, action) => {
      const { link, name, type, folder } = action.payload;
      state.link = link;
      state.name = name;
      state.type = type;
      state.folder = folder;
    }),
});

export const { setLink, setName, setType } = wallpaperInfo.actions;

export default wallpaperInfo;
