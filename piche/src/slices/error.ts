import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Err = string | null;

const errorSlice = createSlice({
  name: 'error',
  initialState: null as Err,
  reducers: {
    setError: {
      reducer(state: Err, action: PayloadAction<Err>) {
        return action.payload;
      },
      prepare(err: Error | null) {
        if (err) {
          return { payload: err.message as string };
        }

        return { payload: err as null };
      },
    },
  }
});

export const { setError } = errorSlice.actions;
export const getError = (state: { error: Err }) => state.error;
export { type Err };
export default errorSlice.reducer;