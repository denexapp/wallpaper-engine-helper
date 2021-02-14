import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  description: string;
}

const initialState: State = {
  description: '',
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
  },
});

export const { setDescription } = post.actions;

export default post;
