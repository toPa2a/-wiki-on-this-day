import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '@/types/status';

const statusSlice = createSlice({
  name: 'status',
  initialState: 'loaded',
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => state = action.payload,
  }
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;