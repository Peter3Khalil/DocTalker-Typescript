import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './slices/theme';
import sidebarReducer from './slices/sidebar';
import documentReducer from './slices/document';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    document: documentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
