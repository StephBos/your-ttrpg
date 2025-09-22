'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
   const router = useRouter()
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const [isTransitioning, setIsTransitioning] = useState(false)
   const [usernameOrEmail, setUsernameOrEmail] = useState('')
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState('')

   const backgroundImages = [
      '/background1.jpg',
      '/background2.jpg',
      '/background3.jpg',
   ]

   useEffect(() => {
      const interval = setInterval(() => {
         setIsTransitioning(true)

         setTimeout(() => {
            setCurrentImageIndex(
               (prevIndex) => (prevIndex + 1) % backgroundImages.length
            )
            setIsTransitioning(false)
         }, 1000) //Transition duration
      }, 5000) //Change image every 5 seconds

      return () => clearInterval(interval)
   }, [backgroundImages.length])

   async function resetPassword(e: any): Promise<void> {
      e.preventDefault()
      setLoading(true)

      const response = await fetch('http://localhost:3000/users/resetRequest', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            usernameOrEmail
         }),
      })
      
      const data = await response.json()
      console.log(data)

      if (data.valid) {
         setMessage(data.message)
         setTimeout(() => {
                      router.push(``)
                    }, 1000)
      } else {
         setMessage(data.message)
      }

      setLoading(false)
   }

   return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
         <div className="absolute inset-0 w-full h-full">
            {backgroundImages.map((image, index) => (
               <div
                  key={image}
                  className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1200 ease-in-out ${
                     index === currentImageIndex && !isTransitioning
                        ? 'opacity-100'
                        : 'opacity-0'
                  }`}
                  style={{ backgroundImage: `url('${image}')` }}
               />
            ))}
         </div>

         <main className="flex flex-col row-start-2 items-center sm:items-start bg-gray-900/90 p-6 rounded relative z-10">
            <form action="submit" className="flex flex-col">
               <h1 className="text-3xl font-bold">Reset Password</h1>
               <input
                  type="text"
                  name="username"
                  className="bg-gray-800 rounded p-1 w-64 mb-2 mt-1"
                  placeholder="Username or Email"
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
               />
               <button
                  className="bg-indigo-950 hover:bg-indigo-900 w-64 rounded mb-4"
                  onClick={(e) => resetPassword(e)}
               >
                  Reset Password
               </button>
               {message && (
              <div className={`text-sm text-center p-2 rounded w-64 ${
                message.includes("successful") 
                  ? "text-green-400 bg-green-900/20" 
                  : "text-red-400 bg-red-900/20"
              }`}>
                {message}
              </div>
            )}
               <Link
                  className="text-sm text-gray-400 hover:text-gray-300"
                  href="/"
               >
                  Return to Login
               </Link>
            </form>
         </main>
      </div>
   )
}
