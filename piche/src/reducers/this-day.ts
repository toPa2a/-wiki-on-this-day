import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const todayEventsSlice = createSlice({
  name: 'todayEvents',
  initialState: {},
  reducers: {
    eventsAdded: {
      reducer(state, action: PayloadAction<object>) {
        state = action.payload;
      },
      prepare(resp: object) {
        return { payload: resp };
      },
    },
  },
});

export default todayEventsSlice.reducer;