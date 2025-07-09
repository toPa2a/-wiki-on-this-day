import { configureStore } from '@reduxjs/toolkit';
import todayEventsReducer from '@/reducers/this-day';
import statusReducer from '@/reducers/status';

export const store = configureStore({
  preloadedState: {},
  reducer: {
    todayEvents: todayEventsReducer,
    status: statusReducer,
  },
});