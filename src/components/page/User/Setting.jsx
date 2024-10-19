import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CreditCard,
  Mail,
  Bell,
  Eye,
} from "lucide-react"

export default function Setting() {
    return (
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
}
