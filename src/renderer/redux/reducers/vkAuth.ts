import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface State {
  state: 'signingIn' | 'authenticated' | 'signingOut' | 'unauthenticated';
}

const initialState: State = {
  state: 'signingIn',
} as State;

export const authenticateBySavedToken = createAsyncThunk(
  'vkAuth/authenticateBySavedToken',
  () =>
    new Promise<{ completed: boolean }>((resolve, reject) => {
      console.log('vk-get-token')
      window.electron.ipcRenderer.once('vk-get-token-success', ({ completed }: { completed: boolean}) => {
        console.log('completed')
        resolve({ completed });
      });
      window.electron.ipcRenderer.once('vk-get-token-fail', () => { reject()
      console.log('rejected')

      });
      window.electron.ipcRenderer.vkGetToken();
    })
);

export const authenticate = createAsyncThunk(
  'vkAuth/authenticate',
  () =>
    new Promise<{ completed: boolean }>((resolve, reject) => {
      window.electron.ipcRenderer.once('vk-authenticate-success', ({ completed }: { completed: boolean}) => {
        resolve({ completed });
      });
      window.electron.ipcRenderer.once('vk-authenticate-fail', () => reject());
      window.electron.ipcRenderer.vkAuthenticate();
    })
);

export const signOut = createAsyncThunk(
  'vkAuth/signOut',
  () =>
    new Promise<void>((resolve, reject) => {
      window.electron.ipcRenderer.once('vk-sign-out-success', () => resolve());
      window.electron.ipcRenderer.once('vk-sign-out-fail', () => reject());
      window.electron.ipcRenderer.vkSignOut();
    })
);

const vkAuth = createSlice({
  name: 'vkAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(authenticate.pending, (state) => {
        state.state = 'signingIn';
      })
      .addCase(authenticate.rejected, (state) => {
        state.state = 'unauthenticated';
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const { completed } = action.payload;
        state.state = completed ? 'authenticated' : 'unauthenticated';
      })
      .addCase(authenticateBySavedToken.pending, (state) => {
        state.state = 'signingIn';
      })
      .addCase(authenticateBySavedToken.rejected, (state) => {
        state.state = 'unauthenticated';
      })
      .addCase(authenticateBySavedToken.fulfilled, (state, action) => {
        const { completed } = action.payload;
        state.state = completed ? 'authenticated' : 'unauthenticated';
      })
      .addCase(signOut.pending, (state) => {
        state.state = 'signingOut';
      })
      .addCase(signOut.rejected, (state) => {
        state.state = 'authenticated';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.state = 'unauthenticated';
      }),
});

export default vkAuth;
