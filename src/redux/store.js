import { configureStore } from '@reduxjs/toolkit';
import showTimeReducer from './showTimeSlice';
import movieReducer from './movieSlice';
import theaterReducer from './theaterSlice';
import settingReducer from './settingSlice'; 
import bookingReducer from './bookingSlice'; 
import adminSettingsReducer from './adminSettingSlice'; 

const store = configureStore({
    reducer: {
        theaters: theaterReducer,
        movies: movieReducer,
        showtimes: showTimeReducer,
        settings: settingReducer,
        bookings: bookingReducer, 
        adminSettings : adminSettingsReducer,
    },
});

export default store;
