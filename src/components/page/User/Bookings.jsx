import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, Users, Ticket, DollarSign, PieChart, Popcorn, Building, MapPin } from "lucide-react";
import { fetchBookings } from '../../../redux/bookingSlice';
import { fetchShowTimes } from '@/redux/showTimeSlice';
import { fetchTheaters } from '@/redux/theaterSlice';
import { fetchMovies } from '@/redux/movieSlice';

export default function Bookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const showTimes = useSelector((state) => state.showtimes.showtimes);
  const movies = useSelector((state) => state.movies.movies);
  const theaters = useSelector((state) => state.theaters.theaters); // Make sure you have theaters in the state
  const loading = useSelector((state) => state.showtimes.loading);
  const error = useSelector((state) => state.showtimes.error);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchShowTimes());
    dispatch(fetchTheaters());
    dispatch(fetchMovies());
  }, [dispatch]);

  const addOnMapping = {
    1: 'Popcorn',
    2: 'Nachos',
    3: 'Nuggets',
    4: 'Soft Drink'
  };

  const getAddOnNames = (addOnArray) => {
    return addOnArray
      .map(id => addOnMapping[id] || 'No Add-On')
      .join(', ');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Booked Tickets</CardTitle>
        <CardDescription>Manage your upcoming movie experiences</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="text-center">No bookings found.</div>
          ) : (
            bookings.map((ticket) => {
              const showTime = showTimes.find(st => st._id === ticket.showTimeId);
              const movie = movies.find(m => m._id === (showTime ? showTime.movieId : null));
              const theater = theaters.find(t => t._id === (showTime ? showTime.theaterId : null));

              return (
                <div key={ticket._id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{movie ? movie.title : 'N/A'}</h4>
                    <Ticket className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm text-gray-300">
                    <div className="flex items-center mt-1">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">Theater : {theater ? theater.name : 'N/A'}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">Location : {theater ? theater.city : 'N/A'}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      <span>{showTime ? formatDate(showTime.date) : 'N/A'}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-2 text-purple-400" />
                      <span>{showTime ? showTime.time : 'N/A'}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Popcorn className="w-4 h-4 mr-2 text-yellow-500" />
                      <span>{getAddOnNames(ticket.addOn)}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Users className="w-4 h-4 mr-2 text-yellow-700" />
                      <span>Seats: {ticket.seatNumber}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                      <span>Total: ${ticket.cost}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Booking Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <PieChart className="w-8 h-8 mx-auto text-red-400" />
                <p className="mt-2 font-semibold">Most Booked</p>
                <p className="text-sm text-gray-600">Inception</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto text-green-500" />
                <p className="mt-2 font-semibold">Total Spent</p>
                <p className="text-sm text-gray-600">$67.95</p>
              </div>
              <div className="text-center">
                <Popcorn className="w-8 h-8 mx-auto text-yellow-500" />
                <p className="mt-2 font-semibold">Favorite Snack</p>
                <p className="text-sm text-gray-600">Large Popcorn</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
}
