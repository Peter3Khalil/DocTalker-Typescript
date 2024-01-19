import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message:""
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery(state, action) {
        state.message = action.payload
    }
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
