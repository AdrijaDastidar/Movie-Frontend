import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from '../components/page/HomePage';
import TitlePage from '../page/tmdb/TitlePage';
import NotFoundPage from '../page/tmdb/NotFoundPage';

const Movies = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
  );

  return (
    <div className={`App ${darkMode && "dark"}`}>
        <div className="bg-light-800 w-screen dark:bg-dark-600 h-screen overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/title/:type/:id" element={<TitlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
    </div>
  );
};

export default Movies;
