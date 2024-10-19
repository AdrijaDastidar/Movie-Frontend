import React, { useState } from "react"
import MoviesTicket from "../page/User/MoviesTicket"
import Bookings from "../page/User/Bookings"
import Setting from "../page/User/Setting"
export default function BookingDashboard() {
  const [activeTab, setActiveTab] = useState("movies")
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
              <MoviesTicket />
            </TabsContent>
            <TabsContent value="bookings">
              <Bookings />
            </TabsContent>
            <TabsContent value="settings">
              <Setting />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}