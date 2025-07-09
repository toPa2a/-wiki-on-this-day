import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '@/types/item';

const todayEventsSlice = createSlice({
  name: 'todayEvents',
  initialState: {},
  reducers: {
    eventsAdded: {
      reducer(state, action: PayloadAction<Item>) {
        state = action.payload;
      },
      prepare(resp) {
        return { payload: resp };
      },
    },
  },
});

export default todayEventsSlice.reducer;