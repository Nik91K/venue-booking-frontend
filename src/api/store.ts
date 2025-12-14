import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import roleSlice from './slices/roleSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    role: roleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
