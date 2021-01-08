import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ipcRenderer } from 'electron'

interface StateAuthenticated {
  state: 'authenticated'
  accessToken: string
}

interface StateLoading {
  state: 'signingIn'
  accessToken: null
}

interface StateUnauthenticated {
  state: 'unauthenticated'
  accessToken: null
}

interface StateSigningOut {
  state: 'signingOut'
  accessToken: string
}

type State =
  | StateUnauthenticated
  | StateLoading
  | StateAuthenticated
  | StateSigningOut

const initialState: State = {
  state: 'signingIn'
} as State

export const authenticateBySavedToken = createAsyncThunk(
  'vkAuth/authenticateBySavedToken',
  () =>
    new Promise<{ accessToken: string | null }>((resolve, reject) => {
      ipcRenderer.once('vk-get-token-success', (event, { accessToken }) => {
        resolve({ accessToken })
      })
      ipcRenderer.once('vk-get-token-fail', () => reject())
      ipcRenderer.send('vk-get-token')
    })
)

export const authenticate = createAsyncThunk(
  'vkAuth/authenticate',
  () =>
    new Promise<{ accessToken: string | null }>((resolve, reject) => {
      ipcRenderer.once('vk-authenticate-success', (event, { accessToken }) => {
        resolve({ accessToken })
      })
      ipcRenderer.once('vk-authenticate-fail', () => reject())
      ipcRenderer.send('vk-authenticate')
    })
)

export const signOut = createAsyncThunk(
  'vkAuth/signOut',
  () =>
    new Promise<void>((resolve, reject) => {
      ipcRenderer.once('vk-sign-out-success', () => resolve())
      ipcRenderer.once('vk-sign-out-fail', () => reject())
      ipcRenderer.send('vk-sign-out')
    })
)

const vkAuth = createSlice({
  name: 'vkAuth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.state = 'signingIn'
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.state = 'unauthenticated'
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const { accessToken } = action.payload
        if (accessToken === null) {
          state.state = 'unauthenticated'
        } else {
          return {
            state: 'authenticated',
            accessToken
          }
        }
      })
      .addCase(authenticateBySavedToken.pending, (state, action) => {
        state.state = 'signingIn'
      })
      .addCase(authenticateBySavedToken.rejected, (state, action) => {
        state.state = 'unauthenticated'
      })
      .addCase(authenticateBySavedToken.fulfilled, (state, action) => {
        const { accessToken } = action.payload
        if (accessToken === null) {
          state.state = 'unauthenticated'
        } else {
          return {
            state: 'authenticated',
            accessToken
          }
        }
      })
      .addCase(signOut.pending, (state, action) => {
        state.state = 'signingOut'
      })
      .addCase(signOut.rejected, (state, action) => {
        state.state = 'authenticated'
      })
      .addCase(signOut.fulfilled, (state, action) => {
        return {
          state: 'unauthenticated',
          accessToken: null
        }
      })
})

export default vkAuth
