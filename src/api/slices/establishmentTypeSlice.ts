import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { EstablishmentType } from '@/types/establishment';
import axios from 'axios';

interface EstablishmentTypeState {
  establishmentType: EstablishmentType[];
  loading: boolean;
  error: string | null;
}

const initialState: EstablishmentTypeState = {
  establishmentType: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/establishment-type';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const getAllEstablishmentTypes = createAsyncThunk<
  EstablishmentType[],
  void,
  { rejectValue: string }
>('establishmentType/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}${SLICE_URL}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch establishment types'
    );
  }
});

const establishmentTypeSlice = createSlice({
  name: 'establishmentType',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllEstablishmentTypes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEstablishmentTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.establishmentType = action.payload;
      })
      .addCase(getAllEstablishmentTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default establishmentTypeSlice.reducer;
