import { configureStore } from '@reduxjs/toolkit';
import showTimeReducer from './showTimeSlice';
import movieReducer from './movieSlice';
import theaterReducer from './theaterSlice';
import settingReducer from './settingSlice'; 
import bookingReducer from './bookingSlice'; 

const store = configureStore({
    reducer: {
        theaters: theaterReducer,
        movies: movieReducer,
        showtimes: showTimeReducer,
        settings: settingReducer,
        bookings: bookingReducer, 
    },
});

export default store;
