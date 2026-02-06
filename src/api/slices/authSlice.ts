import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@/types/user';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import type { RootState } from '../store';

interface AuthState {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/auth';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: {
      name: string;
      phoneNumber: string;
      email: string;
      password: string;
      role: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}${SLICE_URL}/register`,
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}${SLICE_URL}/login`,
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  {
    state: RootState;
    rejectValue: { status?: number; message: string };
  }
>('auth/refresh', async (_, { getState, rejectWithValue }) => {
  try {
    const { refreshToken } = getState().auth;
    const response = await axios.post(`${API_URL}${SLICE_URL}/refresh`, {
      refreshToken,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response?.status,
      message:
        error.response?.data?.message || error.message || 'Refresh failed',
    });
  }
});

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`${API_URL}${SLICE_URL}/logout`);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, state => {
        state.loading = false;
        state.error = null;
      })

      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      .addCase(refreshAccessToken.rejected, (state, action) => {
        const status = action.payload?.status;

        if (status === 401 || status === 403) {
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }

        state.error = action.payload?.message || 'Session refresh failed';
      })

      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
