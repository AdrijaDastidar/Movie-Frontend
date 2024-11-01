import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async ({ showTimeId, seatNumber, addOn, cost }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().settings;
      const response = await axios.post(
        "http://localhost:1000/booking/create",
        {
          showTimeId,
          seatNumber,
          addOn,
          cost,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Use the token here
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Booking creation failed.");
    }
  }
);

// Async thunk for fetching a movie by ID
export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:1000/movie/${movieId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Movie not found." });
    }
  }
);

// Async thunk for fetching all bookings
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Retrieve the token from the settings slice in state
      const { token } = getState().settings;

      const response = await axios.get("http://localhost:1000/booking/all/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Use the token here
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch bookings." });
    }
  }
);

// Create booking slice
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    selectedMovieId: null,
    movieDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookingData = action.payload;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload.bookings || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setSelectedMovieId } = bookingSlice.actions;
export default bookingSlice.reducer;
