import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Film, PlusCircle, Clock, Tag, Star, Calendar, ImageIcon, ArrowUpDown, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, addMovie, updateMovie, deleteMovie } from '../../../redux/movieSlice';

export default function Movie() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const loading = useSelector((state) => state.movies.loading);
    const error = useSelector((state) => state.movies.error);

    const [newMovie, setNewMovie] = useState({
        title: '',
        duration: '',
        genre: '',
        rating: '',
        posterUrl: '',
        releaseDate: '',
        description: '',
    });

    const [updateMovieData, setUpdateMovieData] = useState(null); 

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const handleAddMovie = async () => {
        await dispatch(addMovie(newMovie));
        dispatch(fetchMovies());
        resetNewMovieState();
    };

    const handleUpdateMovie = async () => {
        await dispatch(updateMovie({ id: updateMovieData._id, movie: newMovie }));
        setUpdateMovieData(null);
        dispatch(fetchMovies());
        resetNewMovieState();
    };

    const handleDeleteMovie = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (confirmDelete) {
            await dispatch(deleteMovie(id));
            dispatch(fetchMovies());
        }
    };

    const resetNewMovieState = () => {
        setNewMovie({
            title: '',
            duration: '',
            genre: '',
            rating: '',
            posterUrl: '',
            releaseDate: '',
            description: '',
        });
    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Manage Movies</h2>
            {loading && <p>Loading movies...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="movie-title" className="flex items-center py-2">
                            <Film className="h-4 w-4 mr-2" /> Movie Title
                        </Label>
                        <Input
                            id="movie-title"
                            placeholder="Enter movie title"
                            value={newMovie.title}
                            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="movie-duration" className="flex items-center py-2">
                            <Clock className="h-4 w-4 mr-2" /> Duration
                        </Label>
                        <Input
                            id="movie-duration"
                            placeholder="Enter duration (in minutes)"
                            value={newMovie.duration}
                            onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="movie-genre" className="flex items-center py-2">
                            <Tag className="h-4 w-4 mr-2" /> Genre
                        </Label>
                        <Input
                            id="movie-genre"
                            placeholder="Enter genre"
                            value={newMovie.genre}
                            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="movie-rating" className="flex items-center py-2">
                            <Star className="h-4 w-4 mr-2" /> Rating
                        </Label>
                        <Input
                            id="movie-rating"
                            type="number"
                            step="0.1"
                            placeholder="Enter rating"
                            value={newMovie.rating}
                            onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="movie-releaseDate" className="flex items-center py-2">
                            <Calendar className="h-4 w-4 mr-2" /> Release Date
                        </Label>
                        <Input
                            id="movie-releaseDate"
                            type="date"
                            placeholder="Enter release date"
                            value={newMovie.releaseDate}
                            onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="movie-posterUrl" className="flex items-center py-2">
                            <ImageIcon className="h-4 w-4 mr-2" /> Poster URL
                        </Label>
                        <Input
                            id="movie-posterUrl"
                            placeholder="Enter poster URL"
                            value={newMovie.posterUrl}
                            onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="movie-description" className="flex items-center py-2">
                        <Film className="h-4 w-4 mr-2" /> Description
                    </Label>
                    <textarea
                        id="movie-description"
                        placeholder="Enter movie description"
                        value={newMovie.description}
                        onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <div onClick={handleAddMovie} className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Movie
                </div>
            </div>

            {/* Modal for updating a movie */}
            {updateMovieData && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-gray-800 p-8 rounded shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-2">Update Movie</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="update-movie-title" className="flex items-center py-2">
                                    <Film className="h-4 w-4 mr-2" /> Movie Title
                                </Label>
                                <Input
                                    id="update-movie-title"
                                    placeholder="Enter movie title"
                                    value={newMovie.title}
                                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="update-movie-duration" className="flex items-center py-2">
                                    <Clock className="h-4 w-4 mr-2" /> Duration
                                </Label>
                                <Input
                                    id="update-movie-duration"
                                    placeholder="Enter duration (in minutes)"
                                    value={newMovie.duration}
                                    onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="update-movie-genre" className="flex items-center py-2">
                                    <Tag className="h-4 w-4 mr-2" /> Genre
                                </Label>
                                <Input
                                    id="update-movie-genre"
                                    placeholder="Enter genre"
                                    value={newMovie.genre}
                                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="update-movie-rating" className="flex items-center py-2">
                                    <Star className="h-4 w-4 mr-2" /> Rating
                                </Label>
                                <Input
                                    id="update-movie-rating"
                                    type="number"
                                    step="0.1"
                                    placeholder="Enter rating"
                                    value={newMovie.rating}
                                    onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="update-movie-releaseDate" className="flex items-center py-2">
                                    <Calendar className="h-4 w-4 mr-2" /> Release Date
                                </Label>
                                <Input
                                    id="update-movie-releaseDate"
                                    type="date"
                                    placeholder="Enter release date"
                                    value={newMovie.releaseDate}
                                    onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="update-movie-posterUrl" className="flex items-center py-2">
                                    <ImageIcon className="h-4 w-4 mr-2" /> Poster URL
                                </Label>
                                <Input
                                    id="update-movie-posterUrl"
                                    placeholder="Enter poster URL"
                                    value={newMovie.posterUrl}
                                    onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="update-movie-description" className="flex items-center py-2">
                                <Film className="h-4 w-4 mr-2" /> Description
                            </Label>
                            <textarea
                                id="update-movie-description"
                                placeholder="Enter movie description"
                                value={newMovie.description}
                                onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                                className="p-2 border rounded w-full"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleUpdateMovie} className="bg-blue-500 text-white px-4 py-2 rounded">Update Movie</button>
                            <button onClick={() => setUpdateMovieData(null)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Release Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movies.map((movie) => (
                        <TableRow key={movie._id}>
                            <TableCell>{movie.title}</TableCell>
                            <TableCell>{movie.duration} min</TableCell>
                            <TableCell>{movie.genre}</TableCell>
                            <TableCell>{movie.rating}</TableCell>
                            <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <div className="flex space-x-4">
                                    <div
                                        onClick={() => {
                                            setUpdateMovieData(movie);
                                            setNewMovie(movie);
                                        }}
                                        className="cursor-pointer flex items-center justify-center text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded px-2 py-1"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />Edit
                                    </div>
                                    <div
                                        onClick={() => handleDeleteMovie(movie._id)}
                                        className="cursor-pointer flex items-center justify-center text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded px-2 py-1">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
