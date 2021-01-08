import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ipcRenderer } from 'electron'

interface State {}

const initialState: State = {}

export const nextArchiveNumber = createAsyncThunk(
  'vkDocuments/nextArchiveNumber',
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

const vkDocuments = createSlice({
  name: 'vkDocuments',
  initialState,
  reducers: {}
})

export default vkDocuments
