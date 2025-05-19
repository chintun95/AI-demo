import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResponse = createAsyncThunk(
  'prompt/fetchResponse',
  async (promptText) => {
    const res = await axios.post('http://localhost:8000/api/prompt/', {
      prompt: promptText,
    });
    return res.data.response;
  }
);

const promptSlice = createSlice({
  name: 'prompt',
  initialState: {
    prompt: '',
    response: '',
    loading: false,
    error: null,
  },
  reducers: {
    setPrompt(state, action) {
      state.prompt = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResponse.fulfilled, (state, action) => {
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(fetchResponse.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setPrompt } = promptSlice.actions;
export default promptSlice.reducer;
