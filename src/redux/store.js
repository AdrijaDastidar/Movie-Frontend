// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import theaterReducer from './theaterSlice';
import movieReducer from './movieSlice';

const store = configureStore({
  reducer: {
    theaters: theaterReducer,
    movies: movieReducer,
  },
});

export default store;
