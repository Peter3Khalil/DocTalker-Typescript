import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    toggleDocument(state) {
      state.isOpened = !state.isOpened;
    },
  },
});

export const { toggleDocument } = documentSlice.actions;
export default documentSlice.reducer;
