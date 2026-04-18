import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { EstablishmentType } from '@/types/establishment';
import axios from 'axios';
import axiosInstance from '@api/axiosConfig';
import type { PageType, PaginationType } from '@/types/pagination';
import { addFavorite, removeFavorite } from '@api/slices/favoritesSlice';

interface EstablishmentState {
  establishments: EstablishmentType[];
  selectedEstablishment: EstablishmentType | null;
  loading: boolean;
  error: string | null;
  meta: PaginationType | null;
}

const initialState: EstablishmentState = {
  establishments: [],
  selectedEstablishment: null,
  loading: false,
  error: null,
  meta: null,
};

type GetAllEstablishmentsParams = {
  page?: number;
  take?: number;
  search?: string;
  order?: 'ASC' | 'DESC';
  sortBy?: 'avgRating' | 'commentsCount' | 'weightedRating';
  minRating?: number;
  typeId?: number;
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/establishment';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const createEstablishment = createAsyncThunk(
  'establishment/create',
  async (
    data: {
      name: string;
      description: string;
      totalSeats: number;
      typeId: number;
      coverPhoto: File | null;
      photos: File[];
      city: string;
      street: string;
      building: string;
      zipCode: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const body = new FormData();
      Object.entries(data).forEach(([keyframes, value]) => {
        if (value == undefined || value === null) return;

        if (keyframes === 'photos' && Array.isArray(value)) {
          value.forEach((photo: File) => body.append('photos', photo));
        } else if (value instanceof File) {
          body.append(keyframes, value);
        } else {
          body.append(keyframes, String(value));
        }
      });

      const response = await axiosInstance.post(`${API_URL}${SLICE_URL}`, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getNearbyEstablishments = createAsyncThunk(
  'establishment/nearby',
  async (
    {
      page = 1,
      take = 9,
      order = 'DESC',
      sortBy = 'weightedRating',
      search = '',
      lat,
      lng,
      radius,
    }: {
      page?: number;
      take?: number;
      order?: 'ASC' | 'DESC';
      sortBy?: string;
      search?: string;
      lat: number;
      lng: number;
      radius: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}${SLICE_URL}/nearby`,
        {
          params: { page, take, order, sortBy, search, lat, lng, radius },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllEstablishments = createAsyncThunk(
  'establishment/getAll',
  async (
    {
      page = 1,
      take = 9,
      order = 'DESC',
      sortBy = 'weightedRating',
      search = '',
      minRating,
      typeId,
    }: GetAllEstablishmentsParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`${API_URL}${SLICE_URL}`, {
        params: {
          page,
          take,
          order,
          sortBy,
          ...(search && { search }),
          ...(minRating && { minRating }),
          ...(typeId && { typeId }),
        },
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
      const response = await axiosInstance.get(`${API_URL}${SLICE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEstablishmentByOwner = createAsyncThunk<
  EstablishmentType[],
  void,
  { rejectValue: string }
>('establishment/owner', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${API_URL}${SLICE_URL}/me`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const updateEstablishment = createAsyncThunk(
  'establishment/update',
  async (
    {
      id,
      data,
    }: {
      id: number;
      data: {
        name?: string;
        address?: string;
        description?: string;
        totalSeats?: number;
        typeId?: number;
        coverPhoto?: File | null;
        photos?: File[];
        city?: string;
        street?: string;
        building?: string;
        zipCode?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const body = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value == undefined || value === null) return;

        if (key == 'photos' && Array.isArray(value)) {
          value.forEach((photo: File) => body.append('photos', photo));
        } else if (value instanceof File) {
          body.append(key, value);
        } else {
          body.append(key, String(value));
        }
      });

      const response = await axiosInstance.patch(
        `${API_URL}${SLICE_URL}/${id}`,
        body
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

      .addCase(getNearbyEstablishments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNearbyEstablishments.fulfilled, (state, action) => {
        state.loading = false;
        state.establishments = action.payload;
      })
      .addCase(getNearbyEstablishments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllEstablishments.pending, state => {
        state.loading = true;
      })
      .addCase(
        getAllEstablishments.fulfilled,
        (state, action: PayloadAction<PageType<EstablishmentType>>) => {
          state.loading = false;
          state.establishments = action.payload.data;
          state.meta = action.payload.meta;
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

      .addCase(getEstablishmentByOwner.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEstablishmentByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.establishments = action.payload;
      })
      .addCase(getEstablishmentByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
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

      .addCase(addFavorite.fulfilled, (state, action) => {
        const id = action.meta.arg;

        const est = state.establishments.find(e => e.id === id);
        if (est) est.isFavorite = true;

        if (state.selectedEstablishment?.id === id) {
          state.selectedEstablishment.isFavorite = true;
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const establishmentId = action.meta.arg;

        const est = state.establishments.find(e => e.id === establishmentId);
        if (est) {
          est.isFavorite = false;
        }

        if (state.selectedEstablishment?.id === establishmentId) {
          state.selectedEstablishment.isFavorite = false;
        }
      });
  },
});

export const { clearEstablishments } = establishmentSlice.actions;
export default establishmentSlice.reducer;
