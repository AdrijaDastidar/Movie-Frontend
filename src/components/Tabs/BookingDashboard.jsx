import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Film,
  Home,
  Calendar,
  Settings,
  LogOut,
  Search,
  Clock,
  Users,
  Star,
  Ticket,
  DollarSign,
  TrendingUp,
  BarChart,
  PieChart,
  Popcorn,
  CreditCard,
  Mail,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react"
import Image from "next/image"

export default function BookingDashboard() {
  const [activeTab, setActiveTab] = useState("movies")

  const movies = [
    { id: 1, title: "Inception", rating: 4.8, duration: "2h 28min", image: "/placeholder.svg?height=120&width=80", price: 12.99, popularity: 95 },
    { id: 2, title: "The Shawshank Redemption", rating: 4.9, duration: "2h 22min", image: "/placeholder.svg?height=120&width=80", price: 11.99, popularity: 98 },
    { id: 3, title: "The Dark Knight", rating: 4.7, duration: "2h 32min", image: "/placeholder.svg?height=120&width=80", price: 13.99, popularity: 94 },
    { id: 4, title: "Pulp Fiction", rating: 4.6, duration: "2h 34min", image: "/placeholder.svg?height=120&width=80", price: 11.99, popularity: 92 },
    { id: 5, title: "Forrest Gump", rating: 4.8, duration: "2h 22min", image: "/placeholder.svg?height=120&width=80", price: 10.99, popularity: 96 },
  ]

  const bookedTickets = [
    { id: 1, movie: "Inception", date: "2023-06-15", time: "19:30", seats: ["A1", "A2"], total: 25.98 },
    { id: 2, movie: "The Dark Knight", date: "2023-06-18", time: "20:00", seats: ["B3", "B4", "B5"], total: 41.97 },
  ]


  const BookingsComponent = () => (
    <Card>
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
              <div className="text-sm text-gray-600">
                <div className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{ticket.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{ticket.time}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Seats: {ticket.seats.join(", ")}</span>
                </div>
                <div className="flex items-center mt-1">
                  <DollarSign className="w-4 h-4 mr-2" />
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
                <PieChart className="w-8 h-8 mx-auto text-primary" />
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

  const SettingsComponent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Eye className="h-5 w-5" />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div>
            <label htmlFor="card" className="block text-sm font-medium text-gray-700">Credit Card</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <CreditCard className="h-5 w-5" />
              </span>
              <input
                type="text"
                name="card"
                id="card"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                placeholder="1234 5678 9012 3456"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="notifications"
              name="notifications"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
              Receive email notifications
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">CineBook</h1>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className={`flex items-center px-4 py-2 ${activeTab === 'movies' ? 'text-primary bg-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('movies')}
          >
            <Film className="w-5 h-5 mr-3" />
            Movies
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 mt-1 ${activeTab === 'bookings' ? 'text-primary bg-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Bookings
          </a>
          <a
            href="#"
            className={`flex items-center px-4 py-2 mt-1 ${activeTab === 'settings' ? 'text-primary bg-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Movie Booking Dashboard</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input className="pl-10 pr-4 py-2" placeholder="Search movies..." />
            </div>
          </div>

          {/* Header Illustration */}
          <Card className="mb-8">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Welcome back, Movie Lover!</h3>
                <p className="text-gray-600">Ready to book your next cinematic  experience?</p>
              </div>
              <Image
                src="/placeholder.svg?height=120&width=240"
                alt="Movie illustration"
                width={240}
                height={120}
                className="rounded-lg"
              />
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="movies">
              <MoviesComponent />
            </TabsContent>
            <TabsContent value="bookings">
              <BookingsComponent />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsComponent />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}