import { createSlice } from '@reduxjs/toolkit';

import { AuthActions } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AuthActions.loginUser, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AuthActions.loginSuccess, state => {
      state.isAuthorized = true;
      state.isLoading = false;
    })
    .addCase(AuthActions.loginFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(AuthActions.logoutUser, state => {
      state.isLoading = true;
    })
    .addCase(AuthActions.logoutSuccess, state => {
      state.isAuthorized = false;
      state.isLoading = false;
    })
    .addCase(AuthActions.registerUser, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AuthActions.registerSuccess, state => {
      state.isAuthorized = true;
      state.isLoading = false;
    })
    .addCase(AuthActions.registerFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(AuthActions.resetAuthErrorAndLoading, state => {
      state.error = undefined;
      state.isLoading = false;
    }),
});
