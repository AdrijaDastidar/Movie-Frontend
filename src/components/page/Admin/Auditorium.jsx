import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Building, MapPin, ArrowUpDown, MoreHorizontal, Edit, Trash2, PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTheaters, addTheater, updateTheater, deleteTheater } from '../../../redux/theaterSlice'; 

export default function Auditoriums() {
    const dispatch = useDispatch();
    const theaters = useSelector((state) => state.theaters.theaters);
    const loading = useSelector((state) => state.theaters.loading);
    const error = useSelector((state) => state.theaters.error);

    const [newAuditorium, setNewAuditorium] = useState({
        name: '',
        city: '',
        state: '',
    });

    const [updateAuditorium, setUpdateAuditorium] = useState(null); // Track auditorium to update

    useEffect(() => {
        dispatch(fetchTheaters());
    }, [dispatch]);

    const handleAddAuditorium = async () => {
        const { name, city, state } = newAuditorium;
        await dispatch(addTheater({ name, city, state }));
        dispatch(fetchTheaters());
        setNewAuditorium({ name: '', city: '', state: '' });
    };

    const handleUpdateAuditorium = async () => {
        const { _id, name, city, state } = updateAuditorium; 
        await dispatch(updateTheater({ id: _id, name, city, state }));
        dispatch(fetchTheaters());
        setUpdateAuditorium(null); // Reset after update
    };

    const handleDeleteTheater = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this theater?");
        if (confirmDelete) {
            await dispatch(deleteTheater(id));
            dispatch(fetchTheaters());
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Manage Auditoriums</h2>
            {loading && <p>Loading theaters...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="auditorium-name" className="flex items-center py-2">
                            <Building className="h-4 w-4 mr-2" />
                            Auditorium Name
                        </Label>
                        <Input
                            id="auditorium-name"
                            placeholder="Enter auditorium name"
                            value={newAuditorium.name}
                            onChange={(e) => setNewAuditorium({ ...newAuditorium, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="auditorium-city" className="flex items-center py-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            City
                        </Label>
                        <Input
                            id="auditorium-city"
                            placeholder="Enter city"
                            value={newAuditorium.city}
                            onChange={(e) => setNewAuditorium({ ...newAuditorium, city: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="auditorium-state" className="flex items-center py-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            State
                        </Label>
                        <Input
                            id="auditorium-state"
                            placeholder="Enter state"
                            value={newAuditorium.state}
                            onChange={(e) => setNewAuditorium({ ...newAuditorium, state: e.target.value })}
                        />
                    </div>
                </div>
                <div
                    onClick={handleAddAuditorium}
                    className="cursor-pointer flex items-center justify-center text-green-600 border border-green-600 hover:bg-green-600 hover:text-white rounded px-4 py-2"
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Add Auditorium</span>
                </div>
            </div>

            {/* Modal for updating an auditorium */}
            {updateAuditorium && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-gray-800 p-12 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Update Auditorium</h3>
                        <Label htmlFor="update-auditorium-name" className="flex items-center py-2">
                            <Building className="h-4 w-4 mr-2" />
                            Auditorium Name
                        </Label>
                        <Input
                            id="update-auditorium-name"
                            placeholder="Enter auditorium name"
                            value={updateAuditorium.name}
                            onChange={(e) => setUpdateAuditorium({ ...updateAuditorium, name: e.target.value })}
                        />
                        <Label htmlFor="update-auditorium-city" className="flex items-center py-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            City
                        </Label>
                        <Input
                            id="update-auditorium-city"
                            placeholder="Enter city"
                            value={updateAuditorium.city}
                            onChange={(e) => setUpdateAuditorium({ ...updateAuditorium, city: e.target.value })}
                        />
                        <Label htmlFor="update-auditorium-state" className="flex items-center py-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            State
                        </Label>
                        <Input
                            id="update-auditorium-state"
                            placeholder="Enter state"
                            value={updateAuditorium.state}
                            onChange={(e) => setUpdateAuditorium({ ...updateAuditorium, state: e.target.value })}
                        />
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={handleUpdateAuditorium} 
                                className="bg-blue-600 text-white rounded px-4 py-2"
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => setUpdateAuditorium(null)} 
                                className="bg-gray-300 text-black rounded px-4 py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                    {theaters.length > 0 ? (
                        theaters.map((theater) => (
                            <TableRow key={theater._id}>
                                <TableCell>{theater._id}</TableCell>
                                <TableCell>{theater.name}</TableCell>
                                <TableCell>{theater.city}</TableCell>
                                <TableCell>{theater.state}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-4">
                                        <div
                                            onClick={() => setUpdateAuditorium(theater)} // Open modal for update
                                            className="cursor-pointer flex items-center justify-center text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded px-2 py-1"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </div>
                                        <div
                                            onClick={() => handleDeleteTheater(theater._id)}
                                            className="cursor-pointer flex items-center justify-center text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded px-2 py-1"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No theaters found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
