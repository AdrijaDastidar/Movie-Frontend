import React, { useState } from "react";
import MoviesTicket from "../page/User/MoviesTicket";
import Bookings from "../page/User/Bookings";
import Setting from "../page/User/Setting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Calendar, Settings, LogOut, Search } from "lucide-react";
import p1 from "../../assets/img/x1.jpg";

export default function BookingDashboard() {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 py-32 px-2 bg-gray-900 shadow-md h-screen sticky top-0">
        <div className="px-4">
          <h1 className="text-xl font-bold text-white">CineBook</h1>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === "movies"
                ? "text-white bg-gray-700"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveTab("movies")}
          >
            <Film className="w-5 h-5 mr-3" />
            Movies
          </a>
          <a
            href="#"
            className={`flex w-full items-center px-4 py-2 mt-1 rounded-lg transition-all duration-200 ${
              activeTab === "bookings"
                ? "text-white bg-gray-700"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Bookings
          </a>
          <a
            href="#"
            className={`flex w-full items-center px-4 py-2 mt-1 rounded-lg transition-all duration-200 ${
              activeTab === "settings"
                ? "text-white bg-gray-700"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button variant="outline" className="w-full text-white border-gray-700 hover:bg-gray-700 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-50 px-5">Movie Booking Dashboard</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input className="pl-10 pr-4 py-2 border-gray-300 focus:ring-primary focus:border-primary" placeholder="Search movies..." />
            </div>
          </div>
        </div>

        {/* Header Illustration */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6 flex items-center justify-between bg-gray-900 text-white rounded-lg">
            <div>
              <h3 className="text-2xl font-bold mb-2">Welcome back, Movie Lover!</h3>
              <p>Ready to book your next cinematic experience?</p>
            </div>
            <img
              src={p1}
              alt="Movie illustration"
              width={240}
              height={120}
              className="rounded-lg"
            />
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
      </main>
    </div>
  );
}
