import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectIsAuthorized = createSelector(
  (state: RootState) => state.auth.isAuthorized,
  isAuthorized => isAuthorized,
);
