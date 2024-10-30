import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Star, DollarSign, TrendingUp, BarChart } from "lucide-react";
import p1 from "../../../assets/img/p1.jpg"; 
import { fetchMovies } from "../../../redux/movieSlice"; 
import { setSelectedMovieId } from "../../../redux/bookingSlice";

export default function MoviesTicket() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleClick = (movieId) => {
    dispatch(setSelectedMovieId(movieId));
    // console.log(movieId);
    window.location.href = `http://localhost:5173/tickets/`;
  };

  const getRandomPrice = () => Math.floor(Math.random() * (600 - 400 + 1)) + 400;
  const getRandomPercent = () => Math.floor(Math.random() * (90 - 30 + 1)) + 30;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Movies</CardTitle>
        <CardDescription>Choose a movie to book tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {loading && <p>Loading movies...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {movies.map((movie) => (
            <div key={movie._id} className="flex items-center mb-4 p-2 hover:bg-gray-800 rounded-lg">
              <img
                src={movie.image || p1} 
                alt={movie.title}
                width={80}
                height={120}
                className="rounded-md mr-4"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{movie.title}</h4>
                <div className="flex items-center text-sm text-gray-300 mt-1">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className="mr-3">{movie.rating}</span>
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="mr-3">{movie.duration}</span>
                  <DollarSign className="w-5 h-5 mr-2 text-violet-600" />
                  <span>Rs.{getRandomPrice()}</span>                 
                </div>
                <div className="flex items-center text-lg mt-1">
                  <TrendingUp className="w-8 h-8 mr-4 text-green-500" />
                  <span>{getRandomPercent()}%</span>                
                </div>
              </div>
              <div
                className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2"
                onClick={() => handleClick(movie._id)}
              >
                <span>Book Now</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Movie Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <BarChart className="w-8 h-8 mx-auto text-primary" />
                <p className="mt-2 font-semibold">Top Rated</p>
                <p className="text-sm text-gray-200">The Shawshank Redemption</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto text-green-500" />
                <p className="mt-2 font-semibold">Most Popular</p>
                <p className="text-sm text-gray-200">The Shawshank Redemption</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto text-blue-500" />
                <p className="mt-2 font-semibold">Longest Duration</p>
                <p className="text-sm text-gray-200">The Dark Knight</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
}
