import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state: { messages: any[] }, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
