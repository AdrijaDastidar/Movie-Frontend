import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from './components/pages/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
// import Celebrities from './pages/Celebrities';
// import TopMovies from './pages/TopMovies';
// import Blog from './pages/Blog';
import Booking from './components/Booking';

const App = () => {
  return (
    <ThemeProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        {/* <Route path="/celebrities" element={<Celebrities />} />
        <Route path="/top-movies" element={<TopMovies />} />
        <Route path="/blog" element={<Blog />} /> */}
        <Route path="/tickets" element={<Booking />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
