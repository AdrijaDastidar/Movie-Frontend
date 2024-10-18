import React from 'react'
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, BarChart3, PieChart, Users, DollarSign, Ticket, } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, Cell } from 'recharts';


export default function Overview() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    // Example static array for movies
    const movies = [
        { title: 'Movie 1', popularity: 75 },
        { title: 'Movie 2', popularity: 60 },
        { title: 'Movie 3', popularity: 85 },
        { title: 'Movie 4', popularity: 90 }
    ];

    const moviePopularity = movies.map(movie => ({
        name: movie.title,
        value: movie.popularity,
    }));

    const weeklyRevenue = [
        { name: "Mon", revenue: 5000 },
        { name: "Tue", revenue: 7000 },
        { name: "Wed", revenue: 6500 },
        { name: "Thu", revenue: 8000 },
        { name: "Fri", revenue: 12000 },
        { name: "Sat", revenue: 15000 },
        { name: "Sun", revenue: 10000 },
    ];

    return (
        <>
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
                        <CardTitle><BarChart3 className="h-4 w-4 inline-block mr-2" />Weekly Revenue</CardTitle>
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
                        <CardTitle><PieChart className="h-4 w-4 inline-block mr-2" />Movie Popularity</CardTitle>
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
        </>
    )
}
