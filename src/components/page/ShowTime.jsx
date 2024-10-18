import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
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

export default function ShowTime() {
    const [date, setDate] = useState(new Date());

    const showtimes = [
        { id: 1, movieId: 1, theaterId: 1, date: "2023-05-20", time: "19:00", ticketsSold: 250 },
        { id: 2, movieId: 2, theaterId: 2, date: "2023-05-21", time: "20:30", ticketsSold: 180 },
        { id: 3, movieId: 3, theaterId: 3, date: "2023-05-22", time: "18:45", ticketsSold: 350 },
    ];

    const theaters = [
        { id: 1, name: "Cineplex Downtown", location: "123 Main St", capacity: 300, popularity: 85 },
        { id: 2, name: "Starlight Cinema", location: "456 Oak Ave", capacity: 250, popularity: 72 },
        { id: 3, name: "Megaplex 20", location: "789 Pine Rd", capacity: 400, popularity: 90 },
    ];

    const movies = [
        { id: 1, title: "The Space Odyssey", duration: "2h 30min", genre: "Sci-Fi", rating: 4.5, popularity: 92 },
        { id: 2, title: "Love in Paris", duration: "1h 55min", genre: "Romance", rating: 4.2, popularity: 78 },
        { id: 3, title: "Midnight Mystery", duration: "2h 15min", genre: "Thriller", rating: 4.7, popularity: 88 },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Manage Showtimes</h2>
            <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="w-96">
                        <Label htmlFor="showtime-movie" className="flex items-center py-2">
                            <Film className="h-4 w-4 mr-2" />Movie
                        </Label>
                        <Select>
                            <SelectTrigger id="showtime-movie">
                                <SelectValue placeholder="Select a movie" />
                            </SelectTrigger>
                            <SelectContent>
                                {movies.map((movie) => (
                                    <SelectItem key={movie.id} value={movie.id.toString()}>
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
                        <Select>
                            <SelectTrigger id="showtime-theater">
                                <SelectValue placeholder="Select a theater" />
                            </SelectTrigger>
                            <SelectContent>
                                {theaters.map((theater) => (
                                    <SelectItem key={theater.id} value={theater.id.toString()}>
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
                        {/* Custom Date Picker with white icon */}
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
                        <Input id="showtime-time" type="time" className="w-96" />
                    </div>
                </div>
                <div className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Showtime
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><ArrowUpDown className="h-4 w-4 mr-2" />ID</TableHead>
                        <TableHead><Film className="h-4 w-4 mr-2" />Movie</TableHead>
                        <TableHead><Theater className="h-4 w-4 mr-2" />Theater</TableHead>
                        <TableHead><CalendarIcon className="h-4 w-4 mr-2" />Date</TableHead>
                        <TableHead><Clock className="h-4 w-4 mr-2" />Time</TableHead>
                        <TableHead><Ticket className="h-4 w-4 mr-2" />Tickets Sold</TableHead>
                        <TableHead><MoreHorizontal className="h-4 w-4 mr-2" />Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {showtimes.map((showtime) => (
                        <TableRow key={showtime.id}>
                            <TableCell>{showtime.id}</TableCell>
                            <TableCell>{movies.find((m) => m.id === showtime.movieId)?.title}</TableCell>
                            <TableCell>{theaters.find((t) => t.id === showtime.theaterId)?.name}</TableCell>
                            <TableCell>{showtime.date}</TableCell>
                            <TableCell>{showtime.time}</TableCell>
                            <TableCell>{showtime.ticketsSold}</TableCell>
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
