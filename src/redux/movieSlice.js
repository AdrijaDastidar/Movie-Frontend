import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:1000/movie';
const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmU3NDk2MTMxMzdmYmE5NzllODE3YiIsImlhdCI6MTczMDE0MzMyMiwiZXhwIjoxNzMxNDM5MzIyfQ.FD4B1TSuVUruUZbGrQZ8ZmyCx0P8KekiUR_ckX1_TFc';

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

export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
    const response = await axios.post(`${BASE_URL}/create`, movie, {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `${ADMIN_TOKEN}`
            },
        });
    return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, movie }) => {
    const response = await axios.put(
        `${BASE_URL}/${id}`, 
        movie, 
        {
            headers: { 
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
    await axios.delete(
        `${BASE_URL}/${id}`, 
        {
            headers: { 
                Authorization: `Bearer ${ADMIN_TOKEN}` 
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
