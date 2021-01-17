import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ipcRenderer } from 'electron'
import { WallpaperInfo } from '../../mainProccess/currentWallpaper'
import { WallpaperType } from '../../utils/wallpaperTypes'

interface State {
  link: string
  name: string
  type: WallpaperType
}

export const getCurrentWallpaper = createAsyncThunk(
  'wallpaperInfo/current-wallpaper',
  (wallpaperEngineFolder: string) =>
    new Promise<WallpaperInfo>((resolve, reject) => {
      ipcRenderer.once('current-wallpaper-success', (event, wallpaperInfo) => {
        resolve(wallpaperInfo)
      })
      ipcRenderer.once('current-wallpaper-fail', () => reject())
      ipcRenderer.send('current-wallpaper', wallpaperEngineFolder)
    })
)

const initialState: State = {
  link: '',
  name: '',
  type: 'scene'
}

const wallpaperInfo = createSlice({
  name: 'wallpaperInfo',
  initialState,
  reducers: {
    setLink(state, action: PayloadAction<string>) {
      state.link = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setType(state, action: PayloadAction<WallpaperType>) {
      state.type = action.payload
    }
  },
  extraReducers: builder =>
    builder.addCase(getCurrentWallpaper.fulfilled, (state, action) => {
      const { link, name, type } = action.payload
      state.link = link
      state.name = name
      state.type = type
    })
})

export const { setLink, setName, setType } = wallpaperInfo.actions

export default wallpaperInfo
