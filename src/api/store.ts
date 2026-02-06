import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import authSlice from './slices/authSlice';
import establishmentSlice from './slices/establishmentSlice';
import commentSlice from './slices/commentSlice';
import errorsSlice from './slices/errorSlice';
import bookingSlice from './slices/bookingSlice';
import userSlice from './slices/userSlice';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: action => {
    const filtered = { ...action };

    if (action.type === 'register' || action.type === 'login') {
      return {
        ...action,
        payload: {
          ...action.payload,
          password: null,
          confirmPassword: null,
        },
      };
    }
    if ('password' in filtered) filtered.password = null;
    if ('accessToken' in filtered) filtered.accessToken = null;
    if ('refreshToken' in filtered) filtered.refreshToken = null;
    if ('phoneNumber' in filtered) filtered.phoneNumber = null;
    return filtered;
  },
  stateTransformer: state => {
    const { auth, users, ...rest } = state;

    return {
      ...rest,
      auth: {
        isAuthenticated: Boolean(auth?.user),
        user: auth.user ? { id: auth.user.id, email: auth.user.email } : null,
      },
      users: {
        usersCount: users?.selectedUser
          ? Object.keys(users.selectedUser).length
          : 0,
      },
    };
  },
  attachReduxState: true,
});

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    establishment: establishmentSlice,
    comment: commentSlice,
    errors: errorsSlice,
    booking: bookingSlice,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(sentryReduxEnhancer),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
