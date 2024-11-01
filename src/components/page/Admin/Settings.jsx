import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Eye } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearMessages } from '@/redux/adminSettingSlice.js';

export default function Setting() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { loading, error, successMessage } = useSelector((state) => state.settings);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePassword({ email, currentPassword, newPassword }));
    };

    useEffect(() => {
        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                <Mail className="h-5 w-5" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                placeholder="you@example.com"
                                required 
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-200">Current Password</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                <Eye className="h-5 w-5" />
                            </span>
                            <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                placeholder="Current Password"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200">New Password</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                <Eye className="h-5 w-5" />
                            </span>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                placeholder="New Password"
                                required 
                            />
                        </div>
                    </div>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                    {loading ? 'Updating...' : 'Save Changes'}
                </Button>
            </CardFooter>
        </Card>
    );
}
