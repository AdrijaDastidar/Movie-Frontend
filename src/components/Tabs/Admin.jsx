import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Film, Home, Theater, Compass } from "lucide-react" // Added Compass for Overview
import Overview from "../page/Admin/Overview"
import Movie from "../page/Admin/Movie"
import ShowTime from "../page/Admin/ShowTime"
import Auditorium from "../page/Admin/Auditorium"
import AdminNav from "../page/Admin/AdminNav"

export default function Admin() {
    const [activeTab, setActiveTab] = useState("overview")  // Default to 'overview'

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 py-32 bg-gray-900 shadow-md">
                <nav className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">Admin Dashboard</h2>
                    <ul className="space-y-2">
                        {/* Overview Tab in Sidebar */}
                        <li>
                            <div
                                onClick={() => setActiveTab("overview")}
                                className={`w-full flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out ${activeTab === "overview" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <Compass className="mr-2 h-4 w-4 text-white" /> {/* Icon for Overview */}
                                <span className={`${activeTab === "overview" ? "font-bold" : ""} text-white`}>
                                    Overview
                                </span>
                            </div>
                        </li>

                        {/* Theaters Tab */}
                        <li>
                            <div
                                onClick={() => setActiveTab("theaters")}
                                className={`w-full flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out ${activeTab === "theaters" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <Theater className="mr-2 h-4 w-4 text-white" />
                                <span className={`${activeTab === "theaters" ? "font-bold" : ""} text-white`}>
                                    Theaters
                                </span>
                            </div>
                        </li>

                        {/* Movies Tab */}
                        <li>
                            <div
                                onClick={() => setActiveTab("movies")}
                                className={`w-full flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out ${activeTab === "movies" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <Film className="mr-2 h-4 w-4 text-white" />
                                <span className={`${activeTab === "movies" ? "font-bold" : ""} text-white`}>
                                    Movies
                                </span>
                            </div>
                        </li>

                        {/* Showtimes Tab */}
                        <li>
                            <div
                                onClick={() => setActiveTab("showtimes")}
                                className={`w-full flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out ${activeTab === "showtimes" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <Home className="mr-2 h-4 w-4 text-white" />
                                <span className={`${activeTab === "showtimes" ? "font-bold" : ""} text-white`}>
                                    Showtimes
                                </span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 w-full">
                <AdminNav />
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    {/* Overview Tab */}
                    <TabsContent className = "py-9" value="overview">
                        <Overview />
                    </TabsContent>

                    {/* Theaters Tab */}
                    <TabsContent className = "py-9" value="theaters">
                        <Auditorium />
                    </TabsContent>

                    {/* Movies Tab */}
                    <TabsContent className = "py-9" value="movies">
                        <Movie />
                    </TabsContent>

                    {/* Showtimes Tab */}
                    <TabsContent className = "py-9" value="showtimes">
                        <ShowTime />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
