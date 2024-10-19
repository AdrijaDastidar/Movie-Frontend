import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './components/page/Home/Navbar';
import Home from './components/Tabs/Home';
import Movies from './components/Tabs/Movies';
import Admin from './components/Tabs/Admin';
import Booking from './components/Tabs/Booking';
import BookingDashboard from './components/Tabs/BookingDashboard';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/*" element={<Movies />} /> 
          <Route path="/tickets" element={<Booking />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/user" element={<BookingDashboard />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
