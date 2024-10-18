import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './components/page/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import AdminDashboard from './components/Admin';
import Booking from './components/Booking';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/*" element={<Movies />} /> {/* Adjusted to support nested routes */}
          {/* <Route path="/celebrities" element={<Celebrities />} />
          <Route path="/top-movies" element={<TopMovies />} />
          <Route path="/blog" element={<Blog />} /> */}
          <Route path="/tickets" element={<Booking />} />
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
