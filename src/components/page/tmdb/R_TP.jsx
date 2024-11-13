import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TitleDetails from '../../common/TitleDetails';
import ActorList from '../../common/ActorList';
import ActorDetails from '../../common/ActorDetails';
import Loader from '../../common/Loader';
import TMDB from '../../../api/api';
import { Link } from 'react-router-dom';

function R_TP() {
    const { type, id } = useParams();
    const title = TMDB.getTitle(type, id);
    const actors = TMDB.getActors(type, id);

    // State for loading and recommended movies
    const [loading, setLoading] = useState(true);
    const [selectedActorID, setSelectedActorID] = useState(null);
    const [selectedActor, setSelectedActor] = useState({});
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [backdropImages, setBackdropImages] = useState({});  // Store backdrops for each movie

    // Fetch actor details
    const fetchActor = async (actorId) => {
        setLoading(true);
        const actor = await TMDB.getActor(actorId);
        setSelectedActor(actor);
        setLoading(false);
    };

    // Fetch recommended movies from your API
    const fetchRecommendedMovies = async (movieId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:1000/neo4j/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: movieId })
            });
            const data = await response.json();
            setRecommendedMovies(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching recommended movies:", error);
            setLoading(false);
        }
    };

    // Fetch backdrop for a single movie
    const fetchBackdrop = async (movieId) => {
        try {
            const backdrop = await TMDB.fetchMovieBackdrop(movieId); // Assume this returns a single backdrop URL
            setBackdropImages((prevBackdrops) => ({
                ...prevBackdrops,
                [movieId]: `https://image.tmdb.org/t/p/w500${backdrop}` // Store the backdrop for this movie
            }));
        } catch (error) {
            console.error("Error fetching backdrop for movie ID", movieId, error);
        }
    };

    // Fetch recommended movies and backdrops when component mounts or id changes
    useEffect(() => {
        fetchRecommendedMovies(id);
    }, [id]);

    // Fetch backdrops for each recommended movie after they are fetched
    useEffect(() => {
        recommendedMovies.forEach((movie) => {
            if (movie.id.low) {
                fetchBackdrop(movie.id.low);
            }
        });
    }, [recommendedMovies]);

    useEffect(() => {
        if (!selectedActorID) return;
        fetchActor(selectedActorID);
    }, [selectedActorID]);

    const navigateToMovie = (movieId) => {
        window.location.href = `${movieId}`;
    };

    return (
        <>
            {/* Actor Details */}
            {selectedActorID && (
                <ActorDetails
                    actor={selectedActor}
                    loading={loading}
                    onClose={() => setSelectedActorID(null)}
                />
            )}

            {/* Title Details */}
            {title.data && <TitleDetails title={title.data} />}

            {/* Actor List */}
            {actors && (
                <ActorList
                    header="Cast"
                    actors={actors}
                    onClick={setSelectedActorID}
                />
            )}

            {/* Recommended Movies Section */}
            {recommendedMovies.length > 0 && (
                <div className="recommended-movies mt-8 mx-36">
                    <h2 className="text-3xl font-bold mb-10">Recommended Movies</h2>
                    <div className="flex flex-wrap justify-start gap-4">
                        {recommendedMovies.map((movie) => (
                            <div key={movie.id.low} className="relative w-44 hover:opacity-90">
                                {/* Movie Poster and Details */}
                                <div
                                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                    onClick={() => navigateToMovie(movie.id.low)}
                                >
                                    {/* Movie Backdrop */}
                                    {backdropImages[movie.id.low] ? (
                                        <img
                                            src={backdropImages[movie.id.low]}
                                            alt={movie.title}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center text-center">
                                            No Backdrop Available
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Loading Indicator */}
            {!(title.data || actors) && <Loader />}
        </>
    );
}

export default R_TP;
