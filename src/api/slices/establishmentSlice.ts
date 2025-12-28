import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { EstablishmentType } from '@/types/establishmentCard';
import axios from 'axios';

interface EstablishmentState {
  establishments: EstablishmentType[];
  selectedEstablishment: EstablishmentType | null;
  loading: boolean;
  error: string | null;
}

const initialState: EstablishmentState = {
  establishments: [],
  selectedEstablishment: null,
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/establishment';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const createEstablishment = createAsyncThunk(
  'establishment/create',
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

export const getAllEstablishments = createAsyncThunk(
  'establishment/getAll',
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
  'establishment/id',
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
      return { id, comments: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addFeatureToEstablishment = createAsyncThunk(
  'establishment/addFeature',
  async (
    { id, featureId }: { id: number; featureId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}${SLICE_URL}/${id}/features/${featureId}`
      );
      return { id, feature: response.data };
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
    clearEstablishments(state) {
      state.establishments = [];
      state.error = null;
    },
    clearSelectedEstablishment(state) {
      state.selectedEstablishment = null;
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
          state.establishments.push(action.payload);
        }
      )
      .addCase(createEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllEstablishments.pending, state => {
        state.loading = false;
      })
      .addCase(
        getAllEstablishments.fulfilled,
        (state, action: PayloadAction<EstablishmentType[]>) => {
          state.loading = false;
          state.establishments = action.payload;
        }
      )
      .addCase(getAllEstablishments.rejected, (state, action) => {
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
          state.selectedEstablishment = action.payload;
        }
      )
      .addCase(getEstablishmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(
        updateEstablishment.fulfilled,
        (state, action: PayloadAction<EstablishmentType>) => {
          state.loading = false;

          const index = state.establishments.findIndex(
            est => est.id === action.payload.id
          );

          if (index !== -1) {
            state.establishments[index] = action.payload;
          }

          if (state.selectedEstablishment?.id === action.payload.id) {
            state.selectedEstablishment = action.payload;
          }
        }
      )
      .addCase(updateEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteEstablishment.pending, state => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        deleteEstablishment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.establishments = state.establishments.filter(
            establishment => establishment.id !== action.payload
          );

          if (state.selectedEstablishment?.id === action.payload) {
            state.selectedEstablishment = null;
          }
        }
      )
      .addCase(deleteEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getEstablishmentComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEstablishmentComments.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedEstablishment?.id === action.payload.id) {
          state.selectedEstablishment.comments = action.payload.comments;
        }
        const index = state.establishments.findIndex(
          est => est.id === action.payload.id
        );
        if (index !== -1) {
          state.establishments[index].comments = action.payload.comments;
        }
      })
      .addCase(getEstablishmentComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addFeatureToEstablishment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFeatureToEstablishment.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedEstablishment?.id === action.payload.id) {
          state.selectedEstablishment.features.push(action.payload.feature);
        }

        const index = state.establishments.findIndex(
          est => est.id === action.payload.id
        );
        if (index !== -1) {
          state.loading = false;
          state.establishments[index].features.push(action.payload.feature);
        }
      })
      .addCase(addFeatureToEstablishment.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(removeFeatureFromEstablishment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFeatureFromEstablishment.fulfilled, (state, action) => {
        state.loading = false;

        if (state.selectedEstablishment?.id === action.payload.id) {
          state.selectedEstablishment.features =
            state.selectedEstablishment.features.filter(
              feature => feature.id !== action.payload.featureId
            );
        }

        const index = state.establishments.findIndex(
          est => est.id === action.payload.id
        );
        if (index !== -1) {
          state.establishments[index].features = state.establishments[
            index
          ].features.filter(feature => feature.id !== action.payload.featureId);
        }
      })
      .addCase(removeFeatureFromEstablishment.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearEstablishments } = establishmentSlice.actions;
export default establishmentSlice.reducer;
