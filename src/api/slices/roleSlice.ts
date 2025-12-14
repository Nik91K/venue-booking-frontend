import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role } from '@/types/common';

interface RoleState {
  role: Role;
  loading: boolean;
  error: string | null;
  isMock: boolean;
}

const initialState: RoleState = {
  role: 'GUEST',
  loading: false,
  error: null,
  isMock: true,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
  },
});

export default roleSlice.reducer;
