import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import type { BookingType } from '@/types/booking';

interface BookingState {
  booking: BookingType | null;
  bookings: BookingType[];
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  booking: null,
  bookings: [],
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

export const getBookingsByEstablishment = createAsyncThunk<
  BookingType[],
  number,
  { rejectValue: string }
>(
  'booking/getByEstablishment',
  async (establishmentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}${SLICE_URL}/establishment/${establishmentId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch bookings'
      );
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

      .addCase(getBookingsByEstablishment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getBookingsByEstablishment.fulfilled,
        (state, action: PayloadAction<BookingType[]>) => {
          state.loading = false;
          state.bookings = action.payload;
        }
      )
      .addCase(getBookingsByEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch bookings';
      });
  },
});

export default bookingSlice.reducer;
