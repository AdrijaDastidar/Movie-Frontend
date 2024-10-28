import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Star, DollarSign, TrendingUp, BarChart } from "lucide-react";
import p1 from "../../../assets/img/p1.jpg";

export default function MoviesTicket() {
  const movies = [
    { id: 1, title: "Avengers", rating: 4.8, duration: "2h 28min", image: p1, price: 12.99, popularity: 95 },
    { id: 2, title: "The Shawshank Redemption", rating: 4.9, duration: "2h 22min", image: p1, price: 11.99, popularity: 98 },
    { id: 3, title: "The Dark Knight", rating: 4.7, duration: "2h 32min", image: p1, price: 13.99, popularity: 94 },
    { id: 4, title: "Pulp Fiction", rating: 4.6, duration: "2h 34min", image: p1, price: 11.99, popularity: 92 },
    { id: 5, title: "Forrest Gump", rating: 4.8, duration: "2h 22min", image: p1, price: 10.99, popularity: 96 },
  ];

  const handleClick = () => {
    window.location.href = 'http://localhost:5173/tickets';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Movies</CardTitle>
        <CardDescription>Choose a movie to book tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex items-center mb-4 p-2 hover:bg-gray-800 rounded-lg">
              <img
                src={movie.image}
                alt={movie.title}
                width={80}
                height={120}
                className="rounded-md mr-4"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{movie.title}</h4>
                <div className="flex items-center text-sm text-gray-300 mt-1">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="mr-3">{movie.rating}</span>
                  <Clock className="w-4 h-4 mr-1 text-blue-500" />
                  <span className="mr-3">{movie.duration}</span>
                  <DollarSign className="w-4 h-4 mr-1 text-violet-600" />
                  <span>${movie.price}</span>
                </div>
                <div className="flex items-center text-smmt-1">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  <span>Popularity: {movie.popularity}%</span>
                </div>
              </div>
              <div className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2">
                <span onClick={handleClick}>Book Now</span>
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
                <p className="text-sm text-gray-6\200">The Dark Knight</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
}
