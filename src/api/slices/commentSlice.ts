import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CommentType } from '@/types/establishmentCard';

interface CommentState {
  comment: CommentType | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comment: null,
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/comment';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const createComment = createAsyncThunk<
  CommentType,
  { text: string; rating: number; establishmentId: number },
  { rejectValue: string }
>('comment/create', async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axios.post(`${API_URL}${SLICE_URL}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to create comment'
    );
  }
});

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearComment: state => {
      state.comment = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<CommentType>) => {
          state.loading = false;
          state.comment = action.payload;
        }
      )
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearComment } = commentSlice.actions;
export default commentSlice.reducer;
