import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MakeArchiveSettings } from '../../../common/types/MakeArchiveSettings'

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
      window.electron.ipcRenderer.once(
        'vk-next-archive-number-success',
        ({ nextArchiveNumber: resultNextArchiveNumber }: { nextArchiveNumber: number}) => {
          resolve({ nextArchiveNumber: resultNextArchiveNumber });
        }
      );
      window.electron.ipcRenderer.once('vk-next-archive-number-fail', () => reject());
      window.electron.ipcRenderer.vkNextArchiveNumber();
    })
);

export const makeArchive = createAsyncThunk(
  'documents/makeArchive',
  (makeArchiveSettings: MakeArchiveSettings) =>
    new Promise<void>((resolve, reject) => {
      window.electron.ipcRenderer.once('make-archive-success', () => resolve());
      window.electron.ipcRenderer.once('make-archive-fail', () => reject());
      window.electron.ipcRenderer.makeArchive(makeArchiveSettings);
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
