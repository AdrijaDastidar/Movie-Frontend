// settingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Async thunk for updating the password
export const updatePassword = createAsyncThunk(
  "settings/updatePassword",
  async ({ email, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:1000/user/${email}`, {
        password: currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update password"
      );
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:1000/user/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Initial state
const initialState = {
  token: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Create the settings slice
const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
    logout(state) {
      state.token = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message; // Assuming your API returns a message
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Assuming your API returns an error message
      });
  },
});

// Export actions and reducer
export const { clearMessages, logout } = settingSlice.actions;
export default settingSlice.reducer;
