import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';

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
      ipcRenderer.once('vk-get-token-success', (_event, { completed }) => {
        resolve({ completed });
      });
      ipcRenderer.once('vk-get-token-fail', () => reject());
      ipcRenderer.send('vk-get-token');
    })
);

export const authenticate = createAsyncThunk(
  'vkAuth/authenticate',
  () =>
    new Promise<{ completed: boolean }>((resolve, reject) => {
      ipcRenderer.once('vk-authenticate-success', (_event, { completed }) => {
        resolve({ completed });
      });
      ipcRenderer.once('vk-authenticate-fail', () => reject());
      ipcRenderer.send('vk-authenticate');
    })
);

export const signOut = createAsyncThunk(
  'vkAuth/signOut',
  () =>
    new Promise<void>((resolve, reject) => {
      ipcRenderer.once('vk-sign-out-success', () => resolve());
      ipcRenderer.once('vk-sign-out-fail', () => reject());
      ipcRenderer.send('vk-sign-out');
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
