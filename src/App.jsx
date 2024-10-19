import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './components/page/Home/Navbar';
import Home from './components/Home';
import Movies from './components/Tabs/Movies';
import Admin from './components/Tabs/Admin';
import Booking from './components/Tabs/Booking';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/*" element={<Movies />} /> {/* Adjusted to support nested routes */}
          {/* <Route path="/celebrities" element={<Celebrities />} />
          <Route path="/top-movies" element={<TopMovies />} />
          <Route path="/blog" element={<Blog />} /> */}
          <Route path="/tickets" element={<Booking />} />
          <Route path="/admin" element={<Admin />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
