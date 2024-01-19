import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './slices/theme';
import sidebarReducer from './slices/sidebar';
import documentReducer from './slices/document';
import queryReducer from './slices/query';
import messagesReducer from './slices/messages';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    document: documentReducer,
    query: queryReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
