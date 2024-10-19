import React from 'react'
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Building, MapPin, Star, ArrowUpDown, MoreHorizontal, Edit, Trash2, PlusCircle } from "lucide-react" // Use Building and MapPin icons

export default function ManageAuditoriums() {
    const auditoriums = [
        { id: 1, name: "Grand Theater", city: "New York", state: "NY" },
        { id: 2, name: "Cineplex", city: "Los Angeles", state: "CA" },
        { id: 3, name: "Majestic Cinema", city: "Chicago", state: "IL" },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Manage Auditoriums</h2>
            <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="auditorium-name" className="flex items-center py-2">
                            <Building className="h-4 w-4 mr-2" />
                            Auditorium Name
                        </Label>
                        <Input id="auditorium-name" placeholder="Enter auditorium name" />
                    </div>
                    <div>
                        <Label htmlFor="auditorium-city" className="flex items-center py-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            City
                        </Label>
                        <Input id="auditorium-city" placeholder="Enter city" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="auditorium-state" className="flex items-center py-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            State
                        </Label>
                        <Input id="auditorium-state" placeholder="Enter state" />
                    </div>
                </div>
                <div className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Add Auditorium</span>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <ArrowUpDown className="h-4 w-4 mr-2" />
                            ID
                        </TableHead>
                        <TableHead>
                            <Building className="h-4 w-4 mr-2" />
                            Name
                        </TableHead>
                        <TableHead>
                            <MapPin className="h-4 w-4 mr-2" />
                            City
                        </TableHead>
                        <TableHead>
                            <MapPin className="h-4 w-4 mr-2" />
                            State
                        </TableHead>
                        <TableHead>
                            <MoreHorizontal className="h-4 w-4 mr-2" />
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {auditoriums.map((auditorium) => (
                        <TableRow key={auditorium.id}>
                            <TableCell>{auditorium.id}</TableCell>
                            <TableCell>{auditorium.name}</TableCell>
                            <TableCell>{auditorium.city}</TableCell>
                            <TableCell>{auditorium.state}</TableCell>
                            <TableCell>
                                <div className="flex space-x-4">
                                    <div
                                        className="cursor-pointer flex items-center justify-center text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded px-2 py-1">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </div>

                                    <div
                                        className="cursor-pointer flex items-center justify-center text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded px-2 py-1">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
