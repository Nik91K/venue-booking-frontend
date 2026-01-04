import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import establishmentSlice from './slices/establishmentSlice';
import commentSlice from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    establishment: establishmentSlice,
    comment: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
