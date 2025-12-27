import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { EstablishmentType } from '@/types/establishmentCard';
import axios from 'axios';

interface EstablishmentState {
  establishment: EstablishmentType | null;
  loading: boolean;
  error: string | null;
}

const initialState: EstablishmentState = {
  establishment: null,
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/establishment';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const createEstablishment = createAsyncThunk(
  '/establishment',
  async (
    establishmentData: {
      name: string;
      address: string;
      description: string;
      totalSeats: number;
      featureIds: number[];
      typeId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}${SLICE_URL}`,
        establishmentData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllEstablishment = createAsyncThunk(
  '/establishment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${SLICE_URL}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEstablishmentById = createAsyncThunk(
  '/establishment/id',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${SLICE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEstablishment = createAsyncThunk(
  'establishment/update',
  async (
    { id, data }: { id: number; data: Partial<EstablishmentType> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URL}${SLICE_URL}/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteEstablishment = createAsyncThunk(
  'establishment/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}${SLICE_URL}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getEstablishmentComments = createAsyncThunk(
  'establishment/getComments',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${SLICE_URL}/${id}/comments`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addFeatureToEstablishment = createAsyncThunk(
  'establishment/addFeature',
  async (
    { id, featureId }: { id: number; featureId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}${SLICE_URL}/${id}/features/${featureId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeFeatureFromEstablishment = createAsyncThunk(
  'establishment/removeFeature',
  async (
    { id, featureId }: { id: number; featureId: number },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`${API_URL}${SLICE_URL}/${id}/features/${featureId}`);
      return { id, featureId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const establishmentSlice = createSlice({
  name: 'establishment',
  initialState,
  reducers: {
    clearEstablishment(state) {
      state.establishment = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createEstablishment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEstablishment.fulfilled,
        (state, action: PayloadAction<EstablishmentType>) => {
          state.loading = false;
          state.establishment = action.payload;
        }
      )
      .addCase(createEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getEstablishmentById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getEstablishmentById.fulfilled,
        (state, action: PayloadAction<EstablishmentType>) => {
          state.loading = false;
          state.establishment = action.payload;
        }
      )
      .addCase(getEstablishmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(
        updateEstablishment.fulfilled,
        (state, action: PayloadAction<EstablishmentType>) => {
          state.establishment = action.payload;
        }
      )
      .addCase(updateEstablishment.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteEstablishment.pending, state => {
        state.loading = true;
      })
      .addCase(deleteEstablishment.fulfilled, state => {
        state.loading = false;
        state.establishment = null;
      })
      .addCase(deleteEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getEstablishmentComments.fulfilled, (state, action) => {
        if (state.establishment) {
          state.establishment.comments = action.payload;
        }
      })
      .addCase(getEstablishmentComments.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(addFeatureToEstablishment.fulfilled, (state, action) => {
        if (state.establishment) {
          state.establishment.features.push(action.payload);
        }
      })
      .addCase(addFeatureToEstablishment.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(removeFeatureFromEstablishment.fulfilled, (state, action) => {
        if (state.establishment) {
          state.establishment.features = state.establishment.features.filter(
            feature => feature.id !== action.payload.featureId
          );
        }
      })
      .addCase(removeFeatureFromEstablishment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearEstablishment } = establishmentSlice.actions;
export default establishmentSlice.reducer;
