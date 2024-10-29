import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:1000/showTime';
const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWNlNWRmMGE3YjM0YTMzZTA2Y2QwMSIsImlhdCI6MTczMDA1MTkwMywiZXhwIjoxNzMwMDYyNzAzfQ.VBKEkJhaHTlZoRXEhDyzoxwkdxGeW7cBXzrnnIND0tI';

// Initial state
const initialState = {
    showtimes: [],
    loading: false,
    error: null,
};

// Async actions
export const fetchShowTimes = createAsyncThunk('showTime/fetchShowTimes', async () => {
    const response = await axios.get(BASE_URL);
    return response.data.showTime;
});

export const addShowTime = createAsyncThunk('showTime/addShowTime', async (showTime) => {
    const response = await axios.post(`${BASE_URL}/create`, showTime, {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `${ADMIN_TOKEN}`,
        },
    });
    return response.data;
});

export const updateShowTime = createAsyncThunk('showTime/updateShowTime', async ({ id, showTime }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, showTime, {
        headers: { 
            'Content-Type': 'application/json',
        },
    });
    return response.data.showTime;
});

export const deleteShowTime = createAsyncThunk('showTime/deleteShowTime', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, {
        headers: { 
            Authorization: `${ADMIN_TOKEN}`,
        },
    });
    return id;
});

// Create slice
const showTimeSlice = createSlice({
    name: 'showtimes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShowTimes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShowTimes.fulfilled, (state, action) => {
                state.loading = false;
                state.showtimes = action.payload;
            })
            .addCase(fetchShowTimes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addShowTime.fulfilled, (state, action) => {
                state.showtimes.push(action.payload);
            })
            .addCase(updateShowTime.fulfilled, (state, action) => {
                const index = state.showtimes.findIndex(showTime => showTime._id === action.payload._id);
                if (index !== -1) {
                    state.showtimes[index] = action.payload;
                }
            })
            .addCase(deleteShowTime.fulfilled, (state, action) => {
                state.showtimes = state.showtimes.filter(showTime => showTime._id !== action.payload);
            });
    },
});

export default showTimeSlice.reducer;
