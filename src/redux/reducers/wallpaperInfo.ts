import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import { WallpaperInfo } from '../../mainProccess/currentWallpaper';
import {
  getResolutionTypeFromResolution,
  ResolutionType,
  resolutionTypeDescriptions,
} from '../../utils/resolutionTypes';
import { WallpaperType } from '../../utils/wallpaperTypes';

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
      const { link, name, type, folder } = action.payload;
      state.link = link;
      state.name = name;
      state.type = type;
      state.folder = folder;
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
