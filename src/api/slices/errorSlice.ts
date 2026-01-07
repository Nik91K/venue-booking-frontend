import type { UserError } from '@/types/error';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ErrorState = {
  list: UserError[];
};

const initialState: ErrorState = { list: [] };

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<UserError>) => {
      state.list.push(action.payload);
    },
    clearErrors: state => {
      state.list = [];
    },
  },
});

export const { addError, clearErrors } = errorsSlice.actions;
export default errorsSlice.reducer;
