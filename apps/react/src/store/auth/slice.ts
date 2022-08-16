import { createSlice } from '@reduxjs/toolkit';

import { AuthActions } from './dispatchers';

import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AuthActions.loginUser, state => {
      console.log('load');
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AuthActions.loginSuccess, state => {
      console.log('success');
      state.isAuthorized = true;
      state.isLoading = false;
    })
    .addCase(AuthActions.loginFailure, (state, action) => {
      console.log('failure', action.payload);
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
    .addCase(AuthActions.logoutFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),
});
