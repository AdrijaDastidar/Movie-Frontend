import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Calendar,
  Clock,
  Users,
  Ticket,
  DollarSign,
  PieChart,
  Popcorn,
} from "lucide-react"
const bookedTickets = [
    { id: 1, movie: "Inception", date: "2023-06-15", time: "19:30", seats: ["A1", "A2"], total: 25.98 },
    { id: 2, movie: "The Dark Knight", date: "2023-06-18", time: "20:00", seats: ["B3", "B4", "B5"], total: 41.97 },
  ];

export default function Bookings() {
  return (
    <Card className>
      <CardHeader>
        <CardTitle>Your Booked Tickets</CardTitle>
        <CardDescription>Manage your upcoming movie experiences</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {bookedTickets.map((ticket) => (
            <div key={ticket.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">{ticket.movie}</h4>
                <Ticket className="w-5 h-5 text-primary" />
              </div>
              <div className="text-sm text-gray-300">
                <div className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                  <span>{ticket.date}</span>
                </div>
                <div className="flex items-center mt-1 ">
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  <span>{ticket.time}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Users className="w-4 h-4 mr-2 text-yellow-700" />
                  <span>Seats: {ticket.seats.join(", ")}</span>
                </div>
                <div className="flex items-center mt-1">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  <span>Total: ${ticket.total}</span>
                </div>
              </div>
            </div>
          ))}
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
  )
}
