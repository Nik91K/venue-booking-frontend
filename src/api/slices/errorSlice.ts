import type { UserError, CreateUserError } from '@/types/error';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ErrorState = {
  id: number;
  list: UserError[];
};

const initialState: ErrorState = { id: 0, list: [] };

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<CreateUserError>) => {
      state.list.push({ ...action.payload, id: state.id++ });
    },
    clearError: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(error => error.id !== action.payload);
    },
  },
});

export const { addError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
