'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Background from '../Components/Background'
import { Metal_Mania } from 'next/font/google'
import Lottie from 'lottie-react'

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })

export default function Home() {
   const router = useRouter()
   const [usernameOrEmail, setUsernameOrEmail] = useState('')
   const [password, setPassword] = useState('')
   const [loading, setLoading] = useState(false)
   const [errors, setErrors] = useState('')
   const [showPassword, setShowPassword] = useState(false)

   async function login(e: any): Promise<void> {
      e.preventDefault()
      setLoading(true)

      const response = await fetch('http://localhost:3000/users/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            usernameOrEmail,
            password,
         }),
      })
      const data = await response.json()
      console.log(data)

      if (data.valid && data.username) {
         router.push(`/${data.username}`)
      } else {
         setErrors(data.message)
      }
      setLoading(false)
   }

   return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
         <Background />

         <main className="flex flex-col row-start-2 items-center sm:items-start bg-[#395144]/90 p-6 rounded gap-2 relative z-10">
            {!loading ? (
               <form action="submit" className="flex flex-col gap-2">
                  <h1
                     className={`text-4xl font-bold text-[#AA8B56] ${metalMania.className}`}
                  >
                     Login
                  </h1>
                  <input
                     type="text"
                     name="username"
                     className="bg-gray-800 rounded p-1 w-64"
                     placeholder="Username or Email"
                     onChange={(e) => setUsernameOrEmail(e.target.value)}
                  />
                  <div className="relative w-64">
                     <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="bg-gray-800 rounded p-1 w-64"
                        placeholder="Password"
                        onChange={async (e) => {
                           setPassword(e.target.value)
                        }}
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                     >
                        {showPassword ? (
                           <EyeOff size={20} />
                        ) : (
                           <Eye size={20} />
                        )}
                     </button>
                  </div>
                  <button
                     className={`bg-[#4E6C50] hover:bg-[#4C763B] w-64 rounded text-lg text-[#AA8B56] cursor-pointer ${metalMania.className}`}
                     onClick={(e) => login(e)}
                  >
                     Login
                  </button>
                  {errors && (
                     <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                        <li>{errors}</li>
                     </ul>
                  )}
                  <Link
                     className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer"
                     href="/forgotPassword"
                  >
                     Forgot your password?
                  </Link>
                  <Link
                     className="text-sm text-gray-400 hover:text-gray-300 cursor-pointer"
                     href="/createAccount"
                  >
                     Create Account
                  </Link>
               </form>
            ) : (
               <div className="flex flex-col row-start-2 items-center sm:items-center gap-2 relative z-10">
                  <Lottie
                     animationData={require('../../public/animations/hourglassLoading.json')}
                     loop={true}
                     style={{ width: 250, height: 250 }}
                  />
                  <h1 className="text-2xl text-amber-200 font-bold z-10">
                     Loading...
                  </h1>
               </div>
            )}
         </main>
      </div>
   )
}
