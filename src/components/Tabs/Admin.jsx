import { useEffect, useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Film, Home, Theater, Compass, SettingsIcon, LogOut } from "lucide-react"
import Overview from "../page/Admin/Overview"
import Movie from "../page/Admin/Movie"
import ShowTime from "../page/Admin/ShowTime"
import Auditorium from "../page/Admin/Auditorium"
import AdminNav from "../page/Admin/AdminNav"
import Setting from "../page/Admin/Settings"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { adminLogout } from "../../redux/adminSettingSlice.js";
import { Button } from "../ui/button"


export default function Admin() {
    const [activeTab, setActiveTab] = useState("overview")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.adminSettings.token);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleLogout = () => {
        dispatch(adminLogout());
        navigate("/login");
    };
    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 py-32 bg-gray-900 shadow-md h-screen sticky top-0">
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

                        {/* Settings Tab */}
                        <li>
                            <div
                                onClick={() => setActiveTab("settings")}
                                className={`w-full flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer transition duration-200 ease-in-out ${activeTab === "settings" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <SettingsIcon className="mr-2 h-4 w-4 text-white" />
                                <span className={`${activeTab === "settings" ? "font-bold" : ""} text-white`}>
                                    Settings
                                </span>
                            </div>
                        </li>
                    </ul>
                    <div className="absolute right-5 w-60 p-4 my-10">
                        <Button
                            variant="outline"
                            className="w-full flex items-center text-white border-gray-700 hover:bg-gray-700 hover:text-white"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </Button>
                    </div>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 w-full">
                <AdminNav />
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    {/* Overview Tab */}
                    <TabsContent className="py-9" value="overview">
                        <Overview />
                    </TabsContent>

                    {/* Theaters Tab */}
                    <TabsContent className="py-9" value="theaters">
                        <Auditorium />
                    </TabsContent>

                    {/* Movies Tab */}
                    <TabsContent className="py-9" value="movies">
                        <Movie />
                    </TabsContent>

                    {/* Showtimes Tab */}
                    <TabsContent className="py-9" value="showtimes">
                        <ShowTime />
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent className="py-9" value="settings">
                        <Setting />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
