import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Home from './components/Tabs/Home';
import Movies from './components/Tabs/Movies';
import Admin from './components/Tabs/Admin';
import Booking from './components/Tabs/Booking';
import BookingDashboard from './components/Tabs/BookingDashboard';
import Payment from './components/Tabs/Payment';

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
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
