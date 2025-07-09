import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '@/types/item';

const todayEventsSlice = createSlice({
  name: 'todayEvents',
  initialState: {},
  reducers: {
    eventsAdded: {
      reducer(state, action: PayloadAction<Item>) {
        console.log(action.payload);
        state = action.payload;
      },
      prepare(resp) {
        

        return { payload: resp };
      },
    },
  },
});


export const { eventsAdded } = todayEventsSlice.actions;
export const getEvents = (state: { todayEvents: object; }) => state.todayEvents;
export default todayEventsSlice.reducer;