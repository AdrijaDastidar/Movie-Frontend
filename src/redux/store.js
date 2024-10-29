import { configureStore } from '@reduxjs/toolkit';
import showTimeReducer from './showTimeSlice';
import movieReducer from './movieSlice';
import theaterReducer from './theaterSlice';

const store = configureStore({
    reducer: {
        theaters: theaterReducer,
        movies: movieReducer,
        showtimes: showTimeReducer,
    },
});

export default store;
