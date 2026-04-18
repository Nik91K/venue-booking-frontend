import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { EstablishmentType } from '@/types/establishment';
import axiosInstance from '@api/axiosConfig';

interface FavoritesState {
  favorites: EstablishmentType[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/establishment';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const addFavorite = createAsyncThunk(
  'favorite/add',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}${SLICE_URL}/${id}/favorite`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorite/remove',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${API_URL}${SLICE_URL}/${id}/favorite`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllFavorites = createAsyncThunk(
  'favorite/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}${SLICE_URL}/favorites`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(addFavorite.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeFavorite.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const establishmentId = action.meta.arg;

        state.favorites = state.favorites.filter(
          establishment => establishment.id !== establishmentId
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favorites = action.payload;
      })
      .addCase(getAllFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default favoritesSlice.reducer;
