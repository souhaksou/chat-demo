import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebarSlice';
import chatReducer from './chat/chatSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    chat: chatReducer
  },
});

export default store;