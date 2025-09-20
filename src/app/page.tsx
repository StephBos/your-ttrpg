"use client"
import React, { useState, useEffect} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"


export default function Home() {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const backgroundImages = [
    '/background1.jpg',
    '/background2.jpg', 
    '/background3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % backgroundImages.length
        );
        setIsTransitioning(false);
      }, 1000)//Transition duration
    }, 5000)//Change image every 5 seconds

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  async function login(e: any): Promise<void>{
    e.preventDefault()
    setLoading(true)

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameOrEmail,
        password,
      }),
    })
    const data = await response.json()
    console.log(data)

    if(data.valid && data.username){
      router.push(`/${data.username}`)
    } else{
      setErrors(data.message)
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
      
      <main className="flex flex-col row-start-2 items-center sm:items-start bg-gray-900/90 p-6 rounded gap-2 relative z-10">      
        <form action="submit" className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <input type="text" name="username" className="bg-gray-800 rounded p-1 w-64" placeholder="Username or Email" onChange={
              (e) => setUsernameOrEmail(e.target.value)}/>
            <div className='relative w-64'>
              <input type={showPassword ? "text" : "password"} name="password" className="bg-gray-800 rounded p-1 w-64" placeholder="Password" onChange={async (e) => {
                setPassword(e.target.value)
              }}/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button> 
            </div>
            <button className="bg-indigo-950 hover:bg-indigo-900 w-64 rounded" 
              onClick={(e) => login(e)}>Login</button>
            {errors && ( 
              <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                <li>{errors}</li>
              </ul>
            )}
            <Link className="text-sm text-gray-400 hover:text-gray-300" href="/forgotPassword">
              Forgot your password?</Link>
            <Link className="text-sm text-gray-400 hover:text-gray-300" href="/createAccount">
              Create Account</Link>
        </form>
      </main>
    </div>
  );
}
