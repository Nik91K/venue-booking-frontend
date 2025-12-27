import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import establishmentSlice from './slices/establishmentSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    establishment: establishmentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
