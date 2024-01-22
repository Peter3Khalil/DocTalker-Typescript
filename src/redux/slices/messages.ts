import { createSlice } from '@reduxjs/toolkit';
type MessageType = {
  role: string;
  content:string;
}

const initialState:{messages:MessageType[]} = {
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
    popMessage(state: { messages: any[] }) {
      state.messages.pop();
    },
  },
});

export const { addMessage, setMessages, popMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
