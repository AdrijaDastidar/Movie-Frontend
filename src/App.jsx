import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Home from './components/Tabs/Home';
import Movies from './components/Tabs/Movies';
import Admin from './components/Tabs/Admin';
import Booking from './components/Tabs/Booking';
import BookingDashboard from './components/Tabs/BookingDashboard';
import Payment from './components/Tabs/Payment';
import LoginPage from './components/Tabs/login';
import Signup from './components/Tabs/Signup';
import TopMovies from './components/Tabs/TopMovies';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/*" element={<Movies />} /> 
          <Route path="/tickets" element={<Booking />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/user" element={<BookingDashboard />} /> 
          <Route path="/paymentSuccess" element={<Payment />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/top-movies/*" element={<TopMovies />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
