import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@/types/user';
import axiosInstance from '@api/axiosConfig';
import type { RootState } from '@api/store';

interface UserState {
  user: UserType | null;
  selectedUser: Record<number, UserType>;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  selectedUser: {},
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/users';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const getCurrentUser = createAsyncThunk<
  UserType,
  void,
  { state: RootState }
>('users/me', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${API_URL}${SLICE_URL}/me`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}${SLICE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: state => {
      state.user = null;
    },
    clearSelectedUsers: state => {
      state.selectedUser = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })

      .addCase(getUserById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser[action.payload.id] = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser, clearSelectedUsers } = userSlice.actions;
export default userSlice.reducer;
