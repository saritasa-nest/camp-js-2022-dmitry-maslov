import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { animeBaseSlice } from './animeBase/slice';

import { authSlice } from './auth/slice';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    animeBase: animeBaseSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // We need to disable this check to allow ES6 classes in Redux.
      // You can find more info about this middleware in docs:
      // https://redux-toolkit.js.org/api/serializabilityMiddleware
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
