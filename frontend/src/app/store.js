import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatslice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
