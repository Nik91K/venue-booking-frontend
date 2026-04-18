import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@api/axiosConfig';
import type { UserType } from '@/types/user';

interface EstablishmentState {
  moderators: UserType[];
  moderatorsLoading: boolean;
  error: string | null;
}

const initialState: EstablishmentState = {
  moderators: [],
  moderatorsLoading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/establishment';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const getEstablishmentModerators = createAsyncThunk(
  'moderators/get',
  async (establishmentId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}${SLICE_URL}/${establishmentId}/moderators`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addEstablishmentModerator = createAsyncThunk(
  'moderators/add',
  async (
    { establishmentId, userId }: { establishmentId: number; userId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}${SLICE_URL}/${establishmentId}/moderators/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeEstablishmentModerator = createAsyncThunk(
  'moderators/remove',
  async (
    { establishmentId, userId }: { establishmentId: number; userId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(
        `${API_URL}${SLICE_URL}/${establishmentId}/moderators/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const moderatorsSlice = createSlice({
  name: 'moderators',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getEstablishmentModerators.pending, state => {
        state.moderatorsLoading = true;
        state.error = null;
      })
      .addCase(getEstablishmentModerators.fulfilled, (state, action) => {
        state.moderatorsLoading = false;
        state.moderators = action.payload;
      })
      .addCase(getEstablishmentModerators.rejected, (state, action) => {
        state.moderatorsLoading = false;
        state.error = action.payload as string;
      })

      .addCase(addEstablishmentModerator.pending, state => {
        state.moderatorsLoading = true;
        state.error = null;
      })
      .addCase(addEstablishmentModerator.fulfilled, (state, action) => {
        state.moderatorsLoading = false;
        state.moderators = action.payload.moderators ?? state.moderators;
      })
      .addCase(addEstablishmentModerator.rejected, (state, action) => {
        state.moderatorsLoading = false;
        state.error = action.payload as string;
      })

      .addCase(removeEstablishmentModerator.pending, state => {
        state.moderatorsLoading = true;
        state.error = null;
      })
      .addCase(removeEstablishmentModerator.fulfilled, (state, action) => {
        state.moderatorsLoading = false;
        state.moderators = action.payload;
      })
      .addCase(removeEstablishmentModerator.rejected, (state, action) => {
        state.moderatorsLoading = false;
        state.error = action.payload as string;
        state.moderators = state.moderators.filter(
          mod => mod.id !== action.meta.arg.userId
        );
      });
  },
});

export default moderatorsSlice.reducer;
