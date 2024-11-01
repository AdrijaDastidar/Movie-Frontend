import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Film, PlusCircle, Theater, Ticket, Calendar as CalendarIcon, Clock, MoreHorizontal, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { fetchMovies } from '@/redux/movieSlice'; 
import { fetchTheaters } from '@/redux/theaterSlice'; 
import { fetchShowTimes, addShowTime, updateShowTime, deleteShowTime } from '@/redux/showTimeSlice';

export default function ShowTime() {
    const dispatch = useDispatch();
    const { movies, loading: moviesLoading } = useSelector((state) => state.movies);
    const { theaters, loading: theatersLoading } = useSelector((state) => state.theaters);
    const { showtimes, loading: showtimesLoading, error: showtimesError } = useSelector((state) => state.showtimes);

    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [selectedTheaterId, setSelectedTheaterId] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [editingShowtimeId, setEditingShowtimeId] = useState(null);

    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(fetchTheaters());
        dispatch(fetchShowTimes());
    }, [dispatch]);
    
    const handleAddShowtime = () => {
        const newShowtime = {
            movieId: selectedMovieId,
            theaterId: selectedTheaterId,
            date: date.toISOString().split('T')[0],
            time: time,
        };
        dispatch(addShowTime(newShowtime));
        dispatch(fetchShowTimes()).then(() => console.log('Showtimes:', showtimes));
        resetForm();
    };

    const handleEditClick = (showtime) => {
        setSelectedMovieId(showtime.movieId);
        setSelectedTheaterId(showtime.theaterId);
        setDate(new Date(showtime.date));
        setTime(showtime.time);
        setEditingShowtimeId(showtime._id);
        setIsEdit(true);
    };

    const handleUpdateShowtime = () => {
        const updatedShowtime = {
            movieId: selectedMovieId,
            theaterId: selectedTheaterId,
            date: date.toISOString().split('T')[0],
            time,
        };
        dispatch(updateShowTime({ id: editingShowtimeId, showTime: updatedShowtime }));
        dispatch(fetchShowTimes());
        resetForm();
    };

    const handleDeleteShowtime = (showtimeId) => {
        dispatch(deleteShowTime(showtimeId));
        dispatch(fetchShowTimes());
    };

    const resetForm = () => {
        setSelectedMovieId('');
        setSelectedTheaterId('');
        setDate(new Date());
        setTime('');
        setIsEdit(false);
        setEditingShowtimeId(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
        return date.toLocaleDateString('en-US', options);
      };

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Manage Showtimes</h2>
            {showtimesError && <p className="text-red-500">{showtimesError}</p>}
            <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="w-96">
                        <Label htmlFor="showtime-movie" className="flex items-center py-2">
                            <Film className="h-4 w-4 mr-2" />Movie
                        </Label>
                        <Select onValueChange={setSelectedMovieId} value={selectedMovieId}>
                            <SelectTrigger id="showtime-movie">
                                <SelectValue placeholder="Select a movie" />
                            </SelectTrigger>
                            <SelectContent>
                                {movies.map((movie) => (
                                    <SelectItem key={movie._id} value={movie._id}>
                                        {movie.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-96">
                        <Label htmlFor="showtime-theater" className="flex items-center py-2">
                            <Theater className="h-4 w-4 mr-2" />Theater
                        </Label>
                        <Select onValueChange={setSelectedTheaterId} value={selectedTheaterId}>
                            <SelectTrigger id="showtime-theater">
                                <SelectValue placeholder="Select a theater" />
                            </SelectTrigger>
                            <SelectContent>
                                {theaters.map((theater) => (
                                    <SelectItem key={theater._id} value={theater._id}>
                                        {theater.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="flex items-center py-2 ">
                            <CalendarIcon className="h-4 w-4 mr-2 text-white" /> Date
                        </Label>
                        <ReactDatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="rounded-sm border border-slate-800 border-input px-3 py-2 text-sm bg-slate-950 text-white"
                            dateFormat="yyyy-MM-dd"
                            customInput={<input className="w-96" />}
                        />
                    </div>
                    <div>
                        <Label htmlFor="showtime-time" className="flex items-center py-2">
                            <Clock className="h-4 w-4 mr-2" /> Time
                        </Label>
                        <Input id="showtime-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-96" />
                    </div>
                </div>
                <button onClick={isEdit ? handleUpdateShowtime : handleAddShowtime} className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {isEdit ? 'Update Showtime' : 'Add Showtime'}
                </button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><ArrowUpDown className="h-4 w-4 mr-2" />ID</TableHead>
                        <TableHead><Film className="h-4 w-4 mr-2" />Movie</TableHead>
                        <TableHead><Theater className="h-4 w-4 mr-2" />Theater</TableHead>
                        <TableHead><CalendarIcon className="h-4 w-4 mr-2" />Date</TableHead>
                        <TableHead><Clock className="h-4 w-4 mr-2" />Time</TableHead>
                        <TableHead><MoreHorizontal className="h-4 w-4 mr-2" />Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {showtimes.map((showtime) => (
                        <TableRow key={showtime._id}>
                            <TableCell>{showtime._id}</TableCell>
                            <TableCell>{movies.find((m) => m._id === showtime.movieId)?.title}</TableCell>
                            <TableCell>{theaters.find((t) => t._id === showtime.theaterId)?.name }</TableCell>
                            <TableCell>{formatDate(showtime.date)}</TableCell>
                            <TableCell>{showtime.time}</TableCell>
                            <TableCell>
                                <div className="flex space-x-4">
                                    <div
                                        onClick={() => handleEditClick(showtime)}
                                        className="cursor-pointer flex items-center justify-center text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded px-2 py-1">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </div>
                                    <div
                                        onClick={() => handleDeleteShowtime(showtime._id)}
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
