// bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_TOKEN = localStorage.getItem('token');


// Async thunk for creating a booking
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async ({ showTimeId, seatNumber, addOn, cost }) => {
    const response = await axios.post(
      "http://localhost:1000/booking/create",{
        showTimeId,
        seatNumber,
        addOn,
        cost,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${USER_TOKEN}`,
        },
      }
    );
    return response.data;
  }
);

// Async thunk for fetching a movie by ID
export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/movie/${movieId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Movie not found." }
      );
    }
  }
);

// Fetch all booking
export const fetchBookings = createAsyncThunk("movies/fetchBookings", async () => {
  console.log(USER_TOKEN);
  const response = await axios.get("http://localhost:1000/booking/all/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${USER_TOKEN}`,
    },
  });
  return response.data;
});

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
    }
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
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setSelectedMovieId, clearSelectedMovieId } =
  bookingSlice.actions;
export default bookingSlice.reducer;
