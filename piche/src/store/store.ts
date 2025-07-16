import { configureStore } from '@reduxjs/toolkit';
import todayEventsReducer from '@/slices/this-day';
import statusReducer from '@/slices/status';
import errorReducer from '@/slices/error';

export const store = configureStore({
  preloadedState: {},
  reducer: {
    todayEvents: todayEventsReducer,
    status: statusReducer,
    error: errorReducer,
  },
});