import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { EstablishmentType } from '@/types/establishment';
import axios from 'axios';
import axiosInstance from '@api/axiosConfig';
import type { PageType, PaginationType } from '@/types/pagination';

interface EstablishmentState {
  establishments: EstablishmentType[];
  selectedEstablishment: EstablishmentType | null;
  favorites: EstablishmentType[];
  loading: boolean;
  error: string | null;
  meta: PaginationType | null;
}

const initialState: EstablishmentState = {
  establishments: [],
  selectedEstablishment: null,
  favorites: [],
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
      address: string;
      description: string;
      totalSeats: number;
      typeId: number;
      coverPhoto: File | null;
      photos: File[];
    },
    { rejectWithValue }
  ) => {
    try {
      const body = new FormData();
      body.append('name', data.name);
      body.append('address', data.address);
      body.append('description', data.description);
      body.append('totalSeats', String(data.totalSeats));
      body.append('typeId', String(data.typeId));
      if (data.coverPhoto) body.append('coverPhoto', data.coverPhoto);
      data.photos.forEach(photo => body.append('photos', photo));

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

      .addCase(addFavorite.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const establishmentId = action.meta.arg;

        if (state.selectedEstablishment?.id === establishmentId) {
          state.selectedEstablishment.isFavorite = true;
        }

        const index = state.establishments.findIndex(
          est => est.id === establishmentId
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

        state.favorites = state.favorites.filter(
          establishment => establishment.id !== action.meta.arg
        );
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
