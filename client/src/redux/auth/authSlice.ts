import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthSliceState } from '../../types/auth';
import {
  checkThanck,
  editImgThunk,
  loginThanck,
  logoutThanck,
  payThanck,
  refreshThanck,
  signupThanck,
  userEditThunk,
} from './authThanck';

const initialState: AuthSliceState = {
  user: {
    status: 'pending',
  },
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThanck.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.user.status = 'authenticated';
    });
    builder.addCase(loginThanck.rejected, (state, action) => {
      state.user.status = 'guest';
      state.accessToken = '';
    });
    builder.addCase(signupThanck.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.user.status = 'authenticated';
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(signupThanck.rejected, (state, action) => {
      state.user.status = 'guest';
      state.accessToken = '';
    });
    builder.addCase(refreshThanck.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.user.status = 'authenticated';
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(refreshThanck.rejected, (state, action) => {
      state.user.status = 'guest';
      state.accessToken = '';
    });
    builder.addCase(checkThanck.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.user.status = 'authenticated';
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(checkThanck.rejected, (state, action) => {
      state.user.status = 'guest';
      state.accessToken = '';
    });
    builder.addCase(logoutThanck.fulfilled, (state, action) => {
      state.user.status = 'guest';
      state.accessToken = '';
    });
    builder.addCase(payThanck.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.user.status = 'authenticated';
    });
    builder.addCase(userEditThunk.fulfilled, (state, action) => action.payload);

    builder.addCase(editImgThunk.fulfilled, (state, action) => action.payload);
  },
});

export default authSlice.reducer;
