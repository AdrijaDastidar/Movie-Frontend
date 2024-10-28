import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const host = "http://localhost:1000"; 

// Async thunk for fetching theaters
export const fetchTheaters = createAsyncThunk('theater/fetchTheaters', async () => {
    const response = await fetch(`${host}/theater/all`);
    if (!response.ok) {
        throw new Error('Failed to fetch theaters');
    }
    const data = await response.json();
    console.log("Fetched Theaters:", data); // Debugging log
    // Extract the array from the response object
    return Array.isArray(data.theaters) ? data.theaters : []; // Ensure the data is an array
});

// Async thunk for adding a theater
export const addTheater = createAsyncThunk('theater/addTheater', async (theater) => {
    const response = await fetch(`${host}/theater/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(theater),
    });
    if (!response.ok) {
        throw new Error('Failed to add theater');
    }
    const data = await response.json(); // Return the newly created theater object
    console.log("Added Theater:", data); // Debugging log
    return data;
});

// Async thunk for updating a theater
export const updateTheater = createAsyncThunk('theater/updateTheater', async (theater) => {
    const { id, ...rest } = theater;
    const response = await fetch(`${host}/theater/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
    });
    if (!response.ok) {
        throw new Error('Failed to update theater');
    }
    const data = await response.json(); // Return the updated theater object
    console.log("Updated Theater:", data); // Debugging log
    return data;
});

// Async thunk for deleting a theater
export const deleteTheater = createAsyncThunk('theater/deleteTheater', async (id) => {
    const response = await fetch(`${host}/theater/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete theater');
    }
    console.log(`Deleted Theater ID: ${id}`); // Debugging log
    return id; // Return the ID of the deleted theater
});

// Slice definition
const theaterSlice = createSlice({
    name: 'theaters',
    initialState: {
        theaters: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTheaters.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new fetch
                console.log("Fetching theaters..."); // Debugging log
            })
            .addCase(fetchTheaters.fulfilled, (state, action) => {
                state.loading = false;
                state.theaters = action.payload; // Assuming the payload is an array of theaters
                console.log("Fetched theaters successfully:", action.payload); // Debugging log
            })
            .addCase(fetchTheaters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set error message
                console.error("Error fetching theaters:", action.error.message); // Debugging log
            })
            .addCase(addTheater.fulfilled, (state, action) => {
                state.theaters.push(action.payload); // Add the new theater directly
            })
            .addCase(updateTheater.fulfilled, (state, action) => {
                const index = state.theaters.findIndex(theater => theater._id === action.payload._id);
                if (index !== -1) {
                    state.theaters[index] = action.payload; // Update the theater with the payload
                }
            })
            .addCase(deleteTheater.fulfilled, (state, action) => {
                state.theaters = state.theaters.filter(theater => theater._id !== action.payload); // Remove the deleted theater
            });
    },
});

export default theaterSlice.reducer;
