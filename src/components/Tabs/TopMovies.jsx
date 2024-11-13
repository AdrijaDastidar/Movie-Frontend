import Recommend from '../page/tmdb/Recommendation'
import Navbar from '../page/Home/Navbar'
import NotFoundPage from '../page/tmdb/NotFoundPage'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import R_TP from '../page/tmdb/R_TP';

export default function TopMovies() {
    const [darkMode, setDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
    ); 
    return (
        <div className={`App ${darkMode && "dark"}`}>
            <Navbar />
            <div className="bg-light-800 w-screen dark:bg-dark-600 h-screen overflow-x-hidden">
                <Routes>
                    <Route path="/" element={<Recommend />} />
                    <Route path="/title/:type/:id" element={<R_TP />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    )
}
