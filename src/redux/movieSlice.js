import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:1000/movie';

// Initial state
const initialState = {
    movies: [],
    loading: false,
    error: null,
};

// Async actions
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
});
  
export const addMovie = createAsyncThunk('movies/addMovie', async (movie, { getState }) => {
    const { token } = getState().adminSettings; 
    const response = await axios.post(`${BASE_URL}/create`, movie, {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        });
    return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, movie }, { getState }) => {
    const { token } = getState().adminSettings; 
    const response = await axios.put(
        `${BASE_URL}/${id}`, 
        movie, 
        {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        }
    );
    return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id, { getState }) => {
    const { token } = getState().adminSettings;
    await axios.delete(
        `${BASE_URL}/${id}`, 
        {
            headers: { 
                Authorization: `${token}`
            },
        }
    );
    return id;
});

// Create slice
const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.movies.push(action.payload);
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                const index = state.movies.findIndex(movie => movie._id === action.payload._id);
                if (index !== -1) {
                    state.movies[index] = action.payload;
                }
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.movies = state.movies.filter(movie => movie._id !== action.payload);
            });
    },
});

export default movieSlice.reducer;
