import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getResolutionTypeFromResolution,
  ResolutionType,
  resolutionTypeDescriptions,
} from '../../utils/resolutionTypes';
import { WallpaperType } from '../../../common/utils/wallpaperTypes';
import { WallpaperInfo } from '../../../common/types/WallpaperInfo'

export interface State {
  link: string;
  name: string;
  type: WallpaperType;
  resolution: {
    type: ResolutionType;
    width: number;
    height: number;
  };
  folder: string | null;
}

export const getCurrentWallpaper = createAsyncThunk(
  'wallpaperInfo/current-wallpaper',
  (wallpaperEngineFolder: string) =>
    new Promise<WallpaperInfo>((resolve, reject) => {
      window.electron.ipcRenderer.once('current-wallpaper-success', (wallpaperInfo: WallpaperInfo) => {
        resolve(wallpaperInfo);
      });
      window.electron.ipcRenderer.once('current-wallpaper-fail', () => reject());
      window.electron.ipcRenderer.currentWallpaper(wallpaperEngineFolder);
    })
);

const initialState: State = {
  link: '',
  name: '',
  type: 'scene',
  resolution: {
    type: 'small',
    height: resolutionTypeDescriptions.small.resolution.height,
    width: resolutionTypeDescriptions.small.resolution.width,
  },
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
    setResolutionType(state, action: PayloadAction<ResolutionType>) {
      state.resolution.type = action.payload;
      const { height, width } = resolutionTypeDescriptions[
        action.payload
      ].resolution;
      state.resolution.height = height;
      state.resolution.width = width;
      // state.folder = null;
    },
    setWidth(state, action: PayloadAction<number>) {
      state.resolution.width = action.payload;
      state.resolution.type = getResolutionTypeFromResolution(
        action.payload,
        state.resolution.height
      );
      // state.folder = null;
    },
    setHeight(state, action: PayloadAction<number>) {
      state.resolution.height = action.payload;
      state.resolution.type = getResolutionTypeFromResolution(
        state.resolution.width,
        action.payload
      );
      // state.folder = null;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getCurrentWallpaper.fulfilled, (state, action) => {
      const { link, name, type, folder, resolution } = action.payload;
      state.link = link;
      state.name = name;
      state.type = type;
      state.folder = folder;
      if (resolution !== null) {
        state.resolution.height = resolution.height;
        state.resolution.width = resolution.width;
        state.resolution.type = getResolutionTypeFromResolution(
          state.resolution.width,
          state.resolution.height
        );
      }
    }),
});

export const {
  setLink,
  setName,
  setType,
  setHeight,
  setResolutionType,
  setWidth,
} = wallpaperInfo.actions;

export default wallpaperInfo;
