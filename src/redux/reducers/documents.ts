import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import { MakeArchiveSettings } from '../../mainProccess/archive';

export interface State {
  archiveNumber: number;
}

const initialState: State = {
  archiveNumber: 0,
};

export const nextArchiveNumber = createAsyncThunk(
  'documents/nextArchiveNumber',
  () =>
    new Promise<{ nextArchiveNumber: number }>((resolve, reject) => {
      ipcRenderer.once(
        'vk-next-archive-number-success',
        (_event, { nextArchiveNumber: resultNextArchiveNumber }) => {
          resolve({ nextArchiveNumber: resultNextArchiveNumber });
        }
      );
      ipcRenderer.once('vk-next-archive-number-fail', () => reject());
      ipcRenderer.send('vk-next-archive-number');
    })
);

export const makeArchive = createAsyncThunk(
  'documents/makeArchive',
  (makeArchiveSettings: MakeArchiveSettings) =>
    new Promise<void>((resolve, reject) => {
      ipcRenderer.once('make-archive-success', () => resolve());
      ipcRenderer.once('make-archive-fail', () => reject());
      ipcRenderer.send('make-archive', makeArchiveSettings);
    })
);

const documents = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setArchiveNumber(state, action: PayloadAction<number>) {
      state.archiveNumber = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(nextArchiveNumber.fulfilled, (state, action) => {
      state.archiveNumber = action.payload.nextArchiveNumber;
    }),
});

export const { setArchiveNumber } = documents.actions;

export default documents;
