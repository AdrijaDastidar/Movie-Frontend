// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import theaterReducer from './theaterSlice';

const store = configureStore({
  reducer: {
    theaters: theaterReducer,
  },
});

export default store;
