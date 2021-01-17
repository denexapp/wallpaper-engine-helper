import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ipcRenderer } from 'electron'

interface State {
  archiveNumber: number
}

const initialState: State = {
  archiveNumber: 0
}

export const nextArchiveNumber = createAsyncThunk(
  'documents/nextArchiveNumber',
  () =>
    new Promise<{ nextArchiveNumber: number }>((resolve, reject) => {
      ipcRenderer.once(
        'vk-next-archive-number-success',
        (event, { nextArchiveNumber }) => {
          resolve({ nextArchiveNumber })
        }
      )
      ipcRenderer.once('vk-next-archive-number-fail', () => reject())
      ipcRenderer.send('vk-next-archive-number')
    })
)

const documents = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setArchiveNumber(state, action: PayloadAction<number>) {
      state.archiveNumber = action.payload
    }
  },
  extraReducers: builder =>
    builder.addCase(nextArchiveNumber.fulfilled, (state, action) => {
      state.archiveNumber = action.payload.nextArchiveNumber
    })
})

export const { setArchiveNumber } = documents.actions

export default documents
