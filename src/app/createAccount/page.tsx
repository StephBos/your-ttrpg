"use client"
import React, { useState, useEffect} from "react"
import CreateAccountHelper from './createAccountHelper'

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userNames, setUsernames] = useState([])
  
  const backgroundImages = [
    '/background1.jpg',
    '/background2.jpg', 
    '/background3.jpg'
  ];

  useEffect(() => {
    CreateAccountHelper.fetchUsers().then(allUsernames => {
      setUsernames(allUsernames)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % backgroundImages.length
        )
        setIsTransitioning(false);
      }, 1000)//Transition duration
    }, 5000)//Change image every 5 seconds
    
    return () => clearInterval(interval)
  }, [backgroundImages.length])

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
            <h1 className="text-3xl font-bold">Create Account</h1>
            <input type="text" name="email" className="bg-gray-800 rounded p-1 w-64" placeholder="Email"/>
            <input type="text" name="confirmEmail" className="bg-gray-800 rounded p-1 w-64" placeholder="Confirm Email"/>
            <input type="text" name="username" className="bg-gray-800 rounded p-1 w-64" placeholder="Username"/>
            <input type="text" name="password" className="bg-gray-800 rounded p-1 w-64" placeholder="Password"/>
            <input type="text" name="confirmPassword" className="bg-gray-800 rounded p-1 w-64" placeholder="Confirm Password"/>
            <button className="bg-indigo-950 hover:bg-indigo-900 w-64 rounded">Create Account</button>
            <a className="text-sm text-gray-400 hover:text-gray-300" href="/forgotPassword">Forgot your password?</a>
            <a className="text-sm text-gray-400 hover:text-gray-300" href="/">Already have an Account? Login</a>
        </form>
      </main>
    </div>
  );
}
