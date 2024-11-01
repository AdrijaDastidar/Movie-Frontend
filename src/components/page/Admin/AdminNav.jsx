"use client"
import { useState } from "react"
import { Search, Bell, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminNav() {
  const [activeTab, setActiveTab] = useState("Dashboard")

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin" },
    { name: "Settings", href: "/admin" },
  ]

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0">
              <a href="/admin" className="text-xl font-bold text-primary">
                AdminPanel
              </a>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4 ">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveTab(item.name)} 
                    className={`${
                      activeTab === item.name
                        ? "text-primary  text-blue-600"
                        : "text-muted-foreground"
                    } hover:text-primary px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 p-3 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full sm:w-64 pl-10 pr-3 py-1 border border-input rounded-md leading-5 bg-background focus:outline-none focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
                <Button variant="ghost" size="icon" className="ml-3">
                  <Bell className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">View notifications</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-3 flex items-center">
                      <User className="h-5 w-5" aria-hidden="true" />
                      <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Your Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
