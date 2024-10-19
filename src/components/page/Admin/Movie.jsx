import React from 'react';
"use client";
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
import { Film, PlusCircle, Clock, Tag, Star, ArrowUpDown, BarChart3, MoreHorizontal, Edit, Trash2 } from "lucide-react";

export default function Movie() {
    const movies = [
        { id: 1, title: "The Space Odyssey", duration: "2h 30min", genre: "Sci-Fi", rating: 4.5, popularity: 92 },
        { id: 2, title: "Love in Paris", duration: "1h 55min", genre: "Romance", rating: 4.2, popularity: 78 },
        { id: 3, title: "Midnight Mystery", duration: "2h 15min", genre: "Thriller", rating: 4.7, popularity: 88 },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Manage Movies</h2>
            <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="movie-title" className="flex items-center py-2">
                            <Film className="h-4 w-4 mr-2" />Movie Title
                        </Label>
                        <Input id="movie-title" placeholder="Enter movie title" />
                    </div>
                    <div>
                        <Label htmlFor="movie-duration" className="flex items-center py-2">
                            <Clock className="h-4 w-4 mr-2" />Duration
                        </Label>
                        <Input id="movie-duration" placeholder="Enter duration" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="movie-genre" className="flex items-center py-2">
                            <Tag className="h-4 w-4 mr-2" />Genre
                        </Label>
                        <Input id="movie-genre" placeholder="Enter genre" />
                    </div>
                    <div>
                        <Label htmlFor="movie-rating" className="flex items-center py-2">
                            <Star className="h-4 w-4 mr-2" />Rating
                        </Label>
                        <Input id="movie-rating" type="number" step="0.1" placeholder="Enter rating" />
                    </div>
                </div>
                <div className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Movie
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <ArrowUpDown className="h-4 w-4 mr-2" />ID
                        </TableHead>
                        <TableHead>
                            <Film className="h-4 w-4 mr-2" />Title
                        </TableHead>
                        <TableHead>
                            <Clock className="h-4 w-4 mr-2" />Duration
                        </TableHead>
                        <TableHead>
                            <Tag className="h-4 w-4 mr-2" />Genre
                        </TableHead>
                        <TableHead>
                            <Star className="h-4 w-4 mr-2" />Rating
                        </TableHead>
                        <TableHead>
                            <BarChart3 className="h-4 w-4 mr-2" />Popularity
                        </TableHead>
                        <TableHead>
                            <MoreHorizontal className="h-4 w-4 mr-2" />Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movies.map((movie) => (
                        <TableRow key={movie.id}>
                            <TableCell>{movie.id}</TableCell>
                            <TableCell>{movie.title}</TableCell>
                            <TableCell>{movie.duration}</TableCell>
                            <TableCell>{movie.genre}</TableCell>
                            <TableCell>{movie.rating}</TableCell>
                            <TableCell>{movie.popularity}%</TableCell>
                            <TableCell>
                                <div className="flex space-x-4">
                                    <div
                                        className="cursor-pointer flex items-center justify-center text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded px-2 py-1">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </div>

                                    <div
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
