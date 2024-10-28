'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, PartyPopper } from "lucide-react"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"

export default function Payment() {
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCheck(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-lvw h-screen bg-gradient-to-b from-blue-700 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-400">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showCheck ? 'opacity-100' : 'opacity-0'}`}>
              <CheckCircle className="w-24 h-24 text-green-400" />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showCheck ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-center text-gray-300">
            Thank you for your purchase! Your transaction has been completed successfully.
          </p>
          <div className="flex items-center justify-center space-x-2 text-yellow-500">
            <PartyPopper className="w-6 h-6" />
            <span className="text-lg font-semibold">Hooray!</span>
            <PartyPopper className="w-6 h-6" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/user">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}