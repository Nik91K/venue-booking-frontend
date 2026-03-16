import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@/types/user';
import axiosInstance from '@api/axiosConfig';
import type { RootState } from '@api/store';
import type { PageType, PaginationType } from '@/types/pagination';

interface UserState {
  user: UserType | null;
  users: UserType[];
  selectedUser: Record<number, UserType>;
  meta: PaginationType | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  users: [],
  selectedUser: {},
  meta: null,
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
>('user/me', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${API_URL}${SLICE_URL}/me`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getUserById = createAsyncThunk<
  UserType,
  number,
  { rejectValue: string }
>('user/getUserById', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${API_URL}${SLICE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

export const getAllUsers = createAsyncThunk<
  PageType<UserType>,
  { page?: number; take?: number; order?: 'ASC' | 'DESC' },
  { rejectValue: string }
>('users/all', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${API_URL}${SLICE_URL}`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

export const updateCurrentUser = createAsyncThunk<
  UserType,
  FormData | Partial<UserType>,
  { rejectValue: string }
>('users/updateMe', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(
      `${API_URL}${SLICE_URL}/me`,
      data
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

export const updateUserById = createAsyncThunk<
  UserType,
  { id: number; data: Partial<UserType> },
  { rejectValue: string }
>('users/updateUserById', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(
      `${API_URL}${SLICE_URL}/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

export const deleteUser = createAsyncThunk<
  UserType,
  { id: number },
  { rejectValue: string }
>('user/delete', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}${SLICE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

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
      })

      .addCase(getAllUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(updateCurrentUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }

        if (state.user?.id === action.payload.id) {
          state.user = action.payload;
        }

        if (state.selectedUser[action.payload.id]) {
          state.selectedUser[action.payload.id] = action.payload;
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.meta.arg.id;
        state.users = state.users.filter(user => user.id !== deletedId);
        delete state.selectedUser[deletedId];

        if (state.user?.id === deletedId) {
          state.user = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearUser, clearSelectedUsers } = userSlice.actions;
export default userSlice.reducer;
