"use client"
import React, { useState, useEffect} from "react"
import { validateUsername, validateEmail, validatePassword, handleSubmit } from "./createAccountHelper"
import { Eye, EyeOff } from "lucide-react"

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [emailGood, setEmailGood] = useState({valid: false, error: ""})
  const [confirmEmailGood, setConfirmEmailGood] = useState({valid: false, error: ""})
  const [usernameGood, setUsernameGood] = useState([{valid: false, error: ""}])
  const [passwordGood, setPasswordGood] = useState([{valid: false, error: ""}])
  const [confirmPasswordGood, setConfirmPasswordGood] = useState([{valid: false, error: ""}])
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const backgroundImages = [
    '/background1.jpg',
    '/background2.jpg', 
    '/background3.jpg'
  ]

  useEffect(() => {
    if (emailGood.valid && confirmEmailGood.valid && usernameGood[0]?.valid && passwordGood[0]?.valid && confirmPasswordGood[0]?.valid) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [emailGood, confirmEmailGood, usernameGood, passwordGood, confirmPasswordGood])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % backgroundImages.length
        )
        setIsTransitioning(false)
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
            <input type="text" name="email" className="bg-gray-800 rounded p-1 w-64" placeholder="Email" onChange={(e) => {
              const result = validateEmail(e.target.value, confirmEmail, false)
              setEmailGood(result)
              setEmail(e.target.value)
              if(e.target.value == confirmEmail){
                setConfirmEmailGood(result)
              }
            }}/>
            {!emailGood.valid && emailGood.error && ( 
              <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                <li>{emailGood.error}</li>
              </ul>
            )}
            <input type="text" name="confirmEmail" className="bg-gray-800 rounded p-1 w-64" placeholder="Confirm Email" onChange={(e) => {
              const result = validateEmail(e.target.value, email, true)
              setConfirmEmailGood(result)
              setConfirmEmail(e.target.value)
            }}/>
            {!confirmEmailGood.valid && confirmEmailGood.error && ( 
              <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                <li>{confirmEmailGood.error}</li>
              </ul>
            )}
            <input type="text" name="username" className="bg-gray-800 rounded p-1 w-64" placeholder="Username" onChange={async (e) => {
              await validateUsername(e.target.value).then((results) => {
                setUsernameGood(results)
              })
              setUsername(e.target.value)
            }}/>
            {usernameGood.length > 0 && usernameGood[0].error && (
              <ul className="mt-2 text-red-600 list-disc list-inside whitespace-pre-line">
                {usernameGood.map((error, index) => (
                  <li key={index}>{error.error}</li>
                ))}
              </ul>
            )}
            {/*-------Password------*/}
            <div className='relative w-64'>
              <input type={showPassword ? "text" : "password"} name="password" className="bg-gray-800 rounded p-1 w-64" placeholder="Password" onChange={async (e) => {
                await validatePassword(e.target.value, password, false).then((results) => {
                  setPasswordGood(results)
                })
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
            {passwordGood.length > 0 && passwordGood[0].error && (
              <ul className="mt-2 text-red-600 list-disc list-inside whitespace-pre-line">
                {passwordGood.map((error, index) => (
                  <li key={index}>{error.error}</li>
                ))}
              </ul>
            )}
            {/*-----ConfirmPassword----*/}
            <div className='relative w-64'>
              <input type={showPassword ? "text" : "password"} name="confirmPassword" className="bg-gray-800 rounded p-1 w-64" placeholder="Confirm Password" onChange={async (e) => {
                await validatePassword(e.target.value, password, true).then((results) => {
                  setConfirmPasswordGood(results)
                })
                setConfirmPassword(e.target.value)
              }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div> 
             {confirmPasswordGood.length > 0 && confirmPasswordGood[0].error && (
               <ul className="mt-2 text-red-600 list-disc list-inside whitespace-pre-line">
                 {confirmPasswordGood.map((error, index) => (
                   <li key={index}>{error.error}</li>
                 ))}
               </ul>
             )}
             {/*-----Submit Button-----*/}
            <button type="button" className="bg-indigo-950 hover:bg-indigo-900 w-64 rounded disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" 
              disabled={buttonDisabled} onClick={() => handleSubmit(username, email, password)}>
                Create Account
            </button>
            <a className="text-sm text-gray-400 hover:text-gray-300" href="/forgotPassword">Forgot your password?</a>
            <a className="text-sm text-gray-400 hover:text-gray-300" href="/">Already have an Account? Login</a>
        </form>
      </main>
    </div>
  );
}
