import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CommentType } from '@/types/establishment';
import axiosInstance from '@api/axiosConfig';

interface CommentState {
  comment: CommentType[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comment: [],
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
    const response = await axiosInstance.post(`${API_URL}${SLICE_URL}`, data);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to create comment'
    );
  }
});

export const getAllComments = createAsyncThunk<
  CommentType[],
  void,
  { rejectValue: string }
>('comment/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}${SLICE_URL}/comments`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch comments'
    );
  }
});

export const getCommentsByEstablishment = createAsyncThunk<
  CommentType[],
  { establishmentId: number },
  { rejectValue: string }
>(
  'comment/getByEstablishment',
  async ({ establishmentId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}${SLICE_URL}/establishment/${establishmentId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch comments for establishment'
      );
    }
  }
);

export const updateComment = createAsyncThunk<
  CommentType,
  { commentId: number; text: string; rating: number },
  { rejectValue: string }
>(
  'comment/update',
  async ({ commentId, text, rating }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${API_URL}${SLICE_URL}/${commentId}`,
        { text, rating }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update comment'
      );
    }
  }
);

export const deleteComment = createAsyncThunk<
  CommentType,
  { commentId: number },
  { rejectValue: string }
>('comment/delete', async ({ commentId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}${SLICE_URL}/${commentId}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to delete comment'
    );
  }
});

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearComment: state => {
      state.comment = [];
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
          state.comment.push(action.payload);
        }
      )
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(getAllComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(getCommentsByEstablishment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsByEstablishment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
      })
      .addCase(getCommentsByEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(updateComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload;
        const index = state.comment.findIndex(
          com => com.id === action.payload.id
        );

        if (index !== -1) {
          state.comment[index] = updatedComment;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(deleteComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = state.comment.filter(
          com => com.id !== action.payload.id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearComment } = commentSlice.actions;
export default commentSlice.reducer;
