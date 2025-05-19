import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendPrompt = createAsyncThunk(
  'chat/sendPrompt',
  async (promptText) => {
    const response = await axios.post('http://localhost:8000/api/prompt/', {
      prompt: promptText,
    });

    const chatEntry = {
      prompt: promptText,
      response: response.data.response,
    };

    // Save chat to backend
    await axios.post('http://localhost:8000/api/chats/', chatEntry);

    return chatEntry;
  }
);

export const loadHistory = createAsyncThunk(
  'chat/loadHistory',
  async () => {
    const res = await axios.get('http://localhost:8000/api/chats/');
    return res.data.reverse(); // reverse to get oldest first
  }
);


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    history: [],      // [{ prompt, response }]
    loading: false,
    error: null,
  },
  reducers: {
    clearHistory(state) {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPrompt.fulfilled, (state, action) => {
        state.history.push(action.payload);
        state.loading = false;
      })
      .addCase(sendPrompt.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(loadHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export const { clearHistory } = chatSlice.actions;
export default chatSlice.reducer;
