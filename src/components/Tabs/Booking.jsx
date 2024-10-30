import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, fetchMovieById } from '../../redux/bookingSlice.js';
import { fetchShowTimes } from '../../redux/showTimeSlice.js';
import { fetchTheaters } from '../../redux/theaterSlice.js';
import poster from '../../assets/img/p1.jpg';
import a1 from '../../assets/img/a1.jpg';
import a2 from '../../assets/img/a2.jpg';
import a3 from '../../assets/img/a3.jpg';
import a4 from '../../assets/img/a4.jpg';

export default function Booking() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [movieDetails, setMovieDetails] = useState(null);

  const movieId = "6720ec7cf84f3c58057b2bfa";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await dispatch(fetchMovieById(movieId));
        setMovieDetails(response.payload);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    const fetchTheaterAndShowtimeData = async () => {
      try {
        const theatersResponse = await dispatch(fetchTheaters());
        const showtimesResponse = await dispatch(fetchShowTimes());
        const filteredShowtimes = showtimesResponse.payload.filter(showTime => showTime.movieId === movieId);
        setTheaters(theatersResponse.payload);
        setShowTimes(showtimesResponse.payload);
        setFilteredShowtimes(filteredShowtimes);

      } catch (error) {
        console.error("Failed to fetch theaters or showtimes:", error);
      }
    };

    fetchDetails();
    fetchTheaterAndShowtimeData();
  }, [dispatch, movieId]);

  useEffect(() => {
    if (selectedLocation) {
      const theatersInLocation = theaters.filter(theater => theater.city === selectedLocation);
      setFilteredTheaters(theatersInLocation);
    } else {
      setFilteredTheaters([]);
    }
  }, [selectedLocation, theaters]);

  useEffect(() => {
    if (selectedTheater) {
      const showtimesForTheater = showTimes.filter(
        showtime => showtime.theaterId === filteredTheaters.find(theater => theater.name === selectedTheater)?._id
      );
      setFilteredShowtimes(showtimesForTheater);
    } else {
      setFilteredShowtimes([]);
    }
  }, [selectedTheater, filteredTheaters, showTimes]);

  const locations = Array.from(new Set(theaters.map(theater => theater.city)));

  const handleBooking = async (amount) => {
    if (!selectedShowtime || selectedSeats.size === 0) {
        alert("Please select a showtime and seats before booking.");
        return;
    }

    const showTimeId = filteredShowtimes.find(showtime => showtime.time === selectedShowtime)?._id;
    const seatNumbers = Array.from(selectedSeats);
    const addOnIds = cart.map(item => item.id).filter(Boolean);
    console.log("Selected Seats:", Array.from(selectedSeats)); 
    console.log(showTimeId);
    console.log(addOnIds);
    console.log("Cost:", amount);
    try {
        await Promise.all(seatNumbers.map(seatNumber => 
            dispatch(createBooking({ showTimeId, seatNumber, addOn: addOnIds, cost: amount }))
        ));

        alert("Booking successful!");
        setSelectedSeats(new Set());
    } catch (error) {
        console.error("Booking failed:", error);
        alert("Booking failed. Please try again.");
    }
};


  const seatPrices = {
    normal: 120,
    executive: 180,
    premium: 220
  };

  const seatTypes = [
    { type: 'normal', rows: [1, 2], color: 'bg-violet-300' },
    { type: 'executive', rows: [3, 4, 5], color: ' bg-violet-500' },
    { type: 'premium', rows: [6], color: ' bg-violet-950' }
  ];

  const seats = Array.from({ length: 48 }, (_, i) => ({
    number: i + 1,
    isBooked: [5, 9, 34].includes(i + 1),
    type: seatTypes.find(type => type.rows.some(row => Math.ceil((i + 1) / 8) === row)).type
  }));

  const checkOutHandler = async (amount) => {
    try {
      // Fetch order
      const { data } = await axios.post('http://localhost:1000/payment/checkout', { amount });
      console.log("Order:", data);

      // Fetch key
      const { data: keyResponse } = await axios.get('http://localhost:1000/key');
      const key = keyResponse.key;

      // Configure Razorpay options
      const options = {
        key: key,
        amount: amount * 100,
        currency: "INR",
        name: "User",
        description: "Movie ticket booking",
        order_id: data.id,
        callback_url: "http://localhost:1000/payment/paymentVerification",
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "1234567890"
        },
        theme: { color: "#528FF0" }
      };

      // Open Razorpay payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  };
  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats(prev => {
      const updated = new Set(prev);
      if (updated.has(seat.number)) {
        updated.delete(seat.number);
      } else {
        updated.add(seat.number);
      }
      return updated;
    });
  };
  useEffect(() => {
    console.log("Selected Seats:", Array.from(selectedSeats)); 
  }, [selectedSeats]); 


  const handleAddToCart = () => {
    const seatsArray = Array.from(selectedSeats).map(seatNumber => {
      const seat = seats.find(s => s.number === seatNumber);
      alert("Seat added to cart");
      return { ...seat, price: seatPrices[seat.type], quantity: 1 };
    });
    setCart(prev => [...prev, ...seatsArray]);
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-muted mx-20 my-36">
      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6">
        <section className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-4">
            <div className="bg-background rounded-lg shadow-sm overflow-hidden">
              <img
                src={poster}
                alt="Movie Poster"
                width={600}
                height={900}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "600/900", objectFit: "cover" }}
              />
            </div>
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">{movieDetails?.title || "Movie Title"}</h1>
              <p className="text-muted-foreground">{movieDetails?.description || "Movie Description"}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(movieDetails?.rating)].map((_, index) => (
                    <StarIcon key={index} className={`w-5 h-5 ${index < (movieDetails?.rating || 0) ? "fill-yellow-400" : "fill-yellow-400"}`} />
                  ))}
                </div>
                <span className="font-medium">{movieDetails?.rating || "N/A"}</span>
              </div>
            </div>
          </div>
          {/* Showtime and Theater Section */}
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Location and Theater</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {/* Location Dropdown */}
                  <div className="flex flex-col">
                    <label className="font-medium">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => {
                        setSelectedLocation(e.target.value);
                      }}
                      className="border border-gray-300 rounded p-2 text-black"
                    >
                      <option value="">Select Location</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  {/* Theater Dropdown */}
                  {selectedLocation && (
                    <div className="flex flex-col">
                      <label className="font-medium">Theater</label>
                      <select
                        value={selectedTheater}
                        onChange={(e) => {
                          setSelectedTheater(e.target.value);
                          setSelectedShowtime("");
                        }}
                        className="border border-gray-300 rounded p-2 text-black"
                      >
                        <option value="">Select Theater</option>
                        {filteredTheaters.map(theater => (
                          <option key={theater.name} value={theater.name}>{theater.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Showtimes Buttons */}
                  {selectedTheater && (
                    <div>
                      <label className="font-medium">Available Showtimes</label>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {filteredShowtimes.map(showtime => (
                          <div
                            key={showtime.time}
                            className={`aspect-square w-32 h-10 rounded-md flex items-center justify-center cursor-pointer transition-colors 
                      ${selectedShowtime === showtime.time ? 'bg-green-400 text-white' : 'bg-violet-200 text-black'}
                       hover:bg-green-300`}
                            onClick={() => setSelectedShowtime(showtime.time)}
                          >
                            {showtime.time}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seating Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-[repeat(8,1fr)] gap-2">
                    {seats.map(seat => (
                      <div
                        key={seat.number}
                        className={`aspect-square rounded-md flex items-center justify-center cursor-pointer transition-colors ${seat.isBooked ? "bg-gray-500 cursor-not-allowed" : selectedSeats.has(seat.number) ? "bg-green-400 text-white" : seat.type === 'normal' ? seatTypes.find(type => type.type === 'normal').color : seat.type === 'executive' ? seatTypes.find(type => type.type === 'executive').color : seatTypes.find(type => type.type === 'premium').color}`}
                        onClick={() => handleSeatClick(seat)}
                      >
                        {seat.number}
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-violet-300 rounded-md" />
                        <span>Normal (Rs 120)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-violet-500 rounded-md" />
                        <span>Executive (Rs 180)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-violet-950 rounded-md" />
                        <span>Premium (Rs 220)</span>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="mt-2 flex items-center gap-2">
                        <Button size="sm" onClick={handleAddToCart}>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Add-Ons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[{ id : 1, name: "Popcorn", price: 299, img: a1 },
                { id : 2, name: "Nachos", price: 249, img: a2 },
                { id : 3, name: "Nuggets", price: 199, img: a3 },
                { id : 4, name: "Soft Drink", price: 79, img: a4 }]
                  .map(item => (
                    <div key={item.name} className="grid gap-2">
                      <div className="bg-background rounded-lg shadow-sm overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          width={300}
                          height={200}
                          className="w-full h-auto object-cover"
                          style={{ aspectRatio: "300/200", objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <span>Rs {item.price}</span>
                      </div>
                      <Button onClick={() => setCart(prev => [...prev, { ...item, quantity: 1 }])} size="sm">Add to Cart</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.name} {item.number ? `(Seat ${item.number})` : ""}</span>
                      <span>Rs {item.price} x {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs {totalCost}</span>
                </div>
                <div className="flex justify-end">
                  <Button onClick={()=>handleBooking(totalCost)} size="lg" className="bg-blue-600 text-white">Proceed to Payment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
