import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { MakeArchiveSettings } from '../../../common/types/MakeArchiveSettings';

export interface State {
  lastRecordedVideoPath: string | null;
}

const initialState: State = {
  lastRecordedVideoPath: null,
};

export const getLastRecordedVideoPath = createAsyncThunk(
  'video/getLastRecordedVideoPath',
  (recordedVideosFolder: string) =>
    new Promise<{ lastRecordedVideoPath: string }>((resolve, reject) => {
      window.electron.ipcRenderer.once(
        'last-recorded-video-path-success',
        ({ lastRecordedVideoPath }: { lastRecordedVideoPath: string }) => {
          resolve({ lastRecordedVideoPath });
        }
      );
      window.electron.ipcRenderer.once('last-recorded-video-path-fail', () =>
        reject()
      );
      window.electron.ipcRenderer.lastRecordedVideoPath(recordedVideosFolder);
    })
);

// export const makeArchive = createAsyncThunk(
//   'documents/makeArchive',
//   (makeArchiveSettings: MakeArchiveSettings) =>
//     new Promise<void>((resolve, reject) => {
//       window.electron.ipcRenderer.once('make-archive-success', () => resolve());
//       window.electron.ipcRenderer.once('make-archive-fail', () => reject());
//       window.electron.ipcRenderer.makeArchive(makeArchiveSettings);
//     })
// );

const documents = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setLastRecordedVideoPath(state, action: PayloadAction<string>) {
      state.lastRecordedVideoPath = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getLastRecordedVideoPath.fulfilled, (state, action) => {
      state.lastRecordedVideoPath = action.payload.lastRecordedVideoPath;
    }),
});

export const { setLastRecordedVideoPath } = documents.actions;

export default documents;
