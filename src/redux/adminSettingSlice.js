// settingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for updating the admin password
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
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update password'
      );
    }
  }
);

// Async thunk for admin login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:1000/admin/login", {
        email,
        password,
      });
      console.log(response.data);
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Initial state for the admin slice
const initialState = {
  token: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Create the admin settings slice
const adminSettingSlice = createSlice({
  name: 'adminSettings',
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
    adminLogout(state) {
      state.token = null; 
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
      })
      .addCase(adminLogin.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; 
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

// Export actions and reducer
export const { clearMessages, adminLogout } = adminSettingSlice.actions; 
export default adminSettingSlice.reducer; 
