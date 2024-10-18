"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Home, PlusCircle, Theater, BarChart3, PieChart, Users, DollarSign, Ticket, Calendar as CalendarIcon, Clock, Menu } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart as RePieChart, Cell } from "recharts"

export default function EnhancedAdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Mock data (replace with actual data fetching in a real application)
  const theaters = [
    { id: 1, name: "Cineplex Downtown", location: "123 Main St", capacity: 300, popularity: 85 },
    { id: 2, name: "Starlight Cinema", location: "456 Oak Ave", capacity: 250, popularity: 72 },
    { id: 3, name: "Megaplex 20", location: "789 Pine Rd", capacity: 400, popularity: 90 },
  ]
  const movies = [
    { id: 1, title: "The Space Odyssey", duration: "2h 30min", genre: "Sci-Fi", rating: 4.5, popularity: 92 },
    { id: 2, title: "Love in Paris", duration: "1h 55min", genre: "Romance", rating: 4.2, popularity: 78 },
    { id: 3, title: "Midnight Mystery", duration: "2h 15min", genre: "Thriller", rating: 4.7, popularity: 88 },
  ]
  const showtimes = [
    { id: 1, movieId: 1, theaterId: 1, date: "2023-05-20", time: "19:00", ticketsSold: 250 },
    { id: 2, movieId: 2, theaterId: 2, date: "2023-05-21", time: "20:30", ticketsSold: 180 },
    { id: 3, movieId: 3, theaterId: 3, date: "2023-05-22", time: "18:45", ticketsSold: 350 },
  ]

  const weeklyRevenue = [
    { name: "Mon", revenue: 5000 },
    { name: "Tue", revenue: 7000 },
    { name: "Wed", revenue: 6500 },
    { name: "Thu", revenue: 8000 },
    { name: "Fri", revenue: 12000 },
    { name: "Sat", revenue: 15000 },
    { name: "Sun", revenue: 10000 },
  ]

  const moviePopularity = movies.map(movie => ({
    name: movie.title,
    value: movie.popularity,
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <nav className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Admin Dashboard</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          <ul className="space-y-2">
            <li>
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <Home className="h-4 w-4" />
                {!isSidebarCollapsed && <span className="ml-2">Overview</span>}
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === "theaters" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("theaters")}
              >
                <Theater className="h-4 w-4" />
                {!isSidebarCollapsed && <span className="ml-2">Theaters</span>}
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === "movies" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("movies")}
              >
                <Film className="h-4 w-4" />
                {!isSidebarCollapsed && <span className="ml-2">Movies</span>}
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === "showtimes" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("showtimes")}
              >
                <CalendarIcon className="h-4 w-4" />
                {!isSidebarCollapsed && <span className="ml-2">Showtimes</span>}
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="theaters">Theaters</TabsTrigger>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="showtimes">Showtimes</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">+15.2% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Movies</CardTitle>
                  <Film className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{movies.length}</div>
                  <p className="text-xs text-muted-foreground">+2 new releases this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Theater Utilization</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5.1% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Weekly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyRevenue}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Movie Popularity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={moviePopularity}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {moviePopularity.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Theaters Tab */}
          <TabsContent value="theaters">
            <h2 className="text-2xl font-bold mb-4">Manage Theaters</h2>
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theater-name">Theater Name</Label>
                  <Input id="theater-name" placeholder="Enter theater name" />
                </div>
                <div>
                  <Label htmlFor="theater-location">Location</Label>
                  <Input id="theater-location" placeholder="Enter location" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theater-capacity">Capacity</Label>
                  <Input id="theater-capacity" type="number" placeholder="Enter capacity" />
                </div>
                <div>
                  <Label htmlFor="theater-popularity">Popularity Score</Label>
                  <Input id="theater-popularity" type="number" placeholder="Enter popularity score" />
                </div>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Theater
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {theaters.map((theater) => (
                  <TableRow key={theater.id}>
                    <TableCell>{theater.id}</TableCell>
                    <TableCell>{theater.name}</TableCell>
                    <TableCell>{theater.location}</TableCell>
                    <TableCell>{theater.capacity}</TableCell>
                    <TableCell>{theater.popularity}%</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Movies Tab */}
          <TabsContent value="movies">
            <h2 className="text-2xl font-bold mb-4">Manage Movies</h2>
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="movie-title">Movie Title</Label>
                  <Input id="movie-title" placeholder="Enter movie title" />
                </div>
                <div>
                  <Label htmlFor="movie-duration">Duration</Label>
                  <Input id="movie-duration" placeholder="Enter duration" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="movie-genre">Genre</Label>
                  <Input id="movie-genre" placeholder="Enter genre" />
                </div>
                <div>
                  <Label htmlFor="movie-rating">Rating</Label>
                  <Input id="movie-rating" type="number" step="0.1" placeholder="Enter rating" />
                </div>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add  Movie
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead>Actions</TableHead>
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
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Showtimes Tab */}
          <TabsContent value="showtimes">
            <h2 className="text-2xl font-bold mb-4">Manage Showtimes</h2>
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="showtime-movie">Movie</Label>
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
                <div>
                  <Label htmlFor="showtime-theater">Theater</Label>
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
                  <Label>Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label htmlFor="showtime-time">Time</Label>
                  <Input id="showtime-time" type="time" />
                </div>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Showtime
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Movie</TableHead>
                  <TableHead>Theater</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Tickets Sold</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {showtimes.map((showtime) => (
                  <TableRow key={showtime.id}>
                    <TableCell>{showtime.id}</TableCell>
                    <TableCell>
                      {movies.find((m) => m.id === showtime.movieId)?.title}
                    </TableCell>
                    <TableCell>
                      {theaters.find((t) => t.id === showtime.theaterId)?.name}
                    </TableCell>
                    <TableCell>{showtime.date}</TableCell>
                    <TableCell>{showtime.time}</TableCell>
                    <TableCell>{showtime.ticketsSold}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}