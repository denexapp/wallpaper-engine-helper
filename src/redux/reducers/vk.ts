import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ipcRenderer } from 'electron'

interface StateAuthenticated {
  state: 'authenticated'
  accessToken: string
  userId: number
}

interface StateLoading {
  state: 'loading'
}

interface StateUnauthenticated {
  state: 'unauthenticated'
}

type State = StateUnauthenticated | StateLoading | StateAuthenticated

const initialState: State = {
  state: 'unauthenticated'
} as State

export const authenticate = createAsyncThunk(
  'vk/authenticate',
  () =>
    new Promise<{ accessToken: string; userId: number }>((resolve, reject) => {
      ipcRenderer.once(
        'vk-authenticate-success',
        (event, { accessToken, userId }) => {
          resolve({ accessToken, userId })
        }
      )
      ipcRenderer.once('vk-authenticate-fail', () => reject())
      ipcRenderer.send('vk-authenticate')
    })
)

const vk = createSlice({
  name: 'vk',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.state = 'loading'
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.state = 'unauthenticated'
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const { accessToken, userId } = action.payload
        return {
          state: 'authenticated',
          accessToken,
          userId
        }
      })
})

export default vk
