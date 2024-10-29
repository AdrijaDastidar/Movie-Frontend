// store.js
import { configureStore } from '@reduxjs/toolkit';
import showTimeReducer from './showTimeSlice';
import movieReducer from './movieSlice';
import theaterReducer from './theaterSlice';
import settingReducer from './settingSlice'; 

const store = configureStore({
    reducer: {
        theaters: theaterReducer,
        movies: movieReducer,
        showtimes: showTimeReducer,
        settings: settingReducer 
    },
});

export default store;
