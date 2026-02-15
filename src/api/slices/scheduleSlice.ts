import type { ScheduleDays, ScheduleType } from '@/types/shedule';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '@api/axiosConfig';

interface ScheduleState {
  schedule: Record<number, ScheduleType[]>;
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedule: {},
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;
const SLICE_URL = '/schedule';

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export const createSchedule = createAsyncThunk<
  ScheduleType,
  {
    day: ScheduleDays;
    openTime: string;
    closeTime: string;
    establishmentId: number;
  },
  { rejectValue: string }
>('schedule/create', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}${SLICE_URL}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to create schedule'
    );
  }
});

export const getSchedulesByEstablishment = createAsyncThunk<
  ScheduleType[],
  number,
  { rejectValue: string }
>('schedule/id', async (establishmentId, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}${SLICE_URL}/${establishmentId}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failder to get schedules'
    );
  }
});

export const deleteSchedules = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('schedule/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`${API_URL}${SLICE_URL}/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failder to delete schedules'
    );
  }
});

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createSchedule.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.loading = false;
        const estId =
          action.payload.establishmentId || action.meta.arg.establishmentId;
        if (!state.schedule[estId]) {
          state.schedule[estId] = [];
        }
        state.schedule[estId].push(action.payload);
      })
      .addCase(createSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(getSchedulesByEstablishment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSchedulesByEstablishment.fulfilled, (state, action) => {
        state.loading = false;
        const establishmentId = action.meta.arg;
        state.schedule[establishmentId] = action.payload;
      })
      .addCase(getSchedulesByEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(deleteSchedules.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedules.fulfilled, (state, action) => {
        state.loading = false;
        Object.keys(state.schedule).forEach(estId => {
          state.schedule[+estId] = state.schedule[+estId].filter(
            s => s.id !== action.payload
          );
        });
      })
      .addCase(deleteSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default scheduleSlice.reducer;
