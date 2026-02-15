import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { EstablishmentType } from '@/types/establishment';
import axios from 'axios';
import axiosInstance from '@api/axiosConfig';

interface EstablishmentState {
  establishments: EstablishmentType[];
  selectedEstablishment: EstablishmentType | null;
  favorites: EstablishmentType[];
  loading: boolean;
  error: string | null;
  page: number;
  take: number;
  order: 'ASC' | 'DESC';
  pageCount: number;
  itemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const initialState: EstablishmentState = {
  establishments: [],
  selectedEstablishment: null,
  favorites: [],
  loading: false,
  error: null,
  page: 1,
  take: 9,
  order: 'ASC',
  pageCount: 0,
  itemCount: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

type GetAllEstablishmentsParams = {
  page?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
  sortBy?: 'avgRating' | 'commentsCount' | 'weightedRating';
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
      const response = await axiosInstance.post(
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
  async (
    {
      page = 1,
      take = 10,
      order = 'DESC',
      sortBy = 'weightedRating',
    }: GetAllEstablishmentsParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${API_URL}${SLICE_URL}`, {
        params: { page, take, order, sortBy },
      });
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
      const response = await axiosInstance.patch(
        `${API_URL}${SLICE_URL}/${id}`,
        data
      );
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
      await axiosInstance.delete(`${API_URL}${SLICE_URL}/${id}`);
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
      const response = await axiosInstance.post(
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
      await axiosInstance.delete(
        `${API_URL}${SLICE_URL}/${id}/features/${featureId}`
      );
      return { id, featureId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addFavorite = createAsyncThunk(
  'establishment/id/favorite',
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
  'establishment/id/unfavorite',
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
  'establishment/favorites',
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
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTake: (state, action: PayloadAction<number>) => {
      state.take = action.payload;
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
        state.loading = true;
      })
      .addCase(
        getAllEstablishments.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: EstablishmentType[];
            meta: {
              page: number;
              take: number;
              itemCount: number;
              pageCount: number;
              hasPreviousPage: boolean;
              hasNextPage: boolean;
            };
          }>
        ) => {
          state.loading = false;
          state.establishments = action.payload.data;
          state.page = action.payload.meta.page;
          state.take = action.payload.meta.take;
          state.itemCount = action.payload.meta.itemCount;
          state.pageCount = action.payload.meta.pageCount;
          state.hasPreviousPage = action.payload.meta.hasPreviousPage;
          state.hasNextPage = action.payload.meta.hasNextPage;
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
      })

      .addCase(addFavorite.pending, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const establishmentId = action.meta.arg;

        if (state.selectedEstablishment?.id === establishmentId) {
          state.selectedEstablishment.isFavorite = true;
        }

        const index = state.establishments.findIndex(
          est => est.id == establishmentId
        );
        if (index !== -1) {
          state.establishments[index].isFavorite = true;
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(removeFavorite.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const establishmentId = action.meta.arg;

        if (state.selectedEstablishment?.id === establishmentId) {
          state.selectedEstablishment.isFavorite = false;
        }

        const index = state.establishments.findIndex(
          est => est.id == establishmentId
        );
        if (index !== -1) {
          state.establishments[index].isFavorite = false;
        }
      })
      .addCase(removeFavorite.rejected, (state, action) => {
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
        state.error = action.payload as string;
      });
  },
});

export const { clearEstablishments } = establishmentSlice.actions;
export default establishmentSlice.reducer;
