// settingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for updating the password
export const updatePassword = createAsyncThunk(
  'settings/updatePassword',
  async ({ email, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:1000/admin/${email}`, {
        password: currentPassword,
        newPassword,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update password');
    }
  }
);

// Initial state
const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

// Create the settings slice
const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message; 
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearMessages } = settingSlice.actions;
export default settingSlice.reducer;
