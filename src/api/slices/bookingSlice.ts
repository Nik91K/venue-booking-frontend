import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from '../axiosConfig';
import type { BookingType } from '@/types/establishment';

interface BookingState {
  booking: BookingType | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  booking: null,
  accessToken: localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/booking';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const createBooking = createAsyncThunk<
  BookingType,
  {
    establishment: number;
    bookingDate: Date;
    bookingTime: string;
    numberOfGuests: number;
  },
  { rejectValue: string }
>('/booking/create', async (data, { rejectWithValue }) => {
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
      error.response?.data?.message || 'Failed to create booking'
    );
  }
});

export const getBookingByEstablishment = createAsyncThunk(
  '/booking/establishment',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${SLICE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createBooking.fulfilled,
        (state, action: PayloadAction<BookingType>) => {
          state.loading = false;
          state.booking = action.payload;
        }
      )
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })

      .addCase(getBookingByEstablishment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getBookingByEstablishment.fulfilled,
        (state, action: PayloadAction<BookingType>) => {
          state.loading = false;
          state.booking = action.payload;
        }
      )
      .addCase(getBookingByEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
