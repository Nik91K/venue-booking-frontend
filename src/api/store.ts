import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import authSlice from '@api/slices/authSlice';
import establishmentSlice from '@api/slices/establishmentSlice';
import commentSlice from '@api/slices/commentSlice';
import errorsSlice from '@api/slices/errorSlice';
import bookingSlice from '@api/slices/bookingSlice';
import userSlice from '@api/slices/userSlice';
import scheduleSlice from '@api/slices/scheduleSlice';

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
    schedule: scheduleSlice,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(sentryReduxEnhancer),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
