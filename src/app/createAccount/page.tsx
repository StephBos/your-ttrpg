"use client"
import React, { useState, useEffect} from "react"
import validator from "validator"
import PasswordValidator from "password-validator"

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [emailGood, setEmailGood] = useState({valid: false, error: ""})
  const [confirmEmailGood, setConfirmEmailGood] = useState({valid: false, error: ""})
  const [usernameGood, setUsernameGood] = useState({valid: false, error: ""})
  const [passwordGood, setPasswordGood] = useState({valid: false, error: ""})
  const [confirmPasswordGood, setConfirmPasswordGood] = useState({valid: false, error: ""})
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  

  const backgroundImages = [
    '/background1.jpg',
    '/background2.jpg', 
    '/background3.jpg'
  ]

  useEffect(() => {
    if (emailGood.valid && confirmEmailGood.valid && usernameGood.valid && passwordGood.valid && confirmPasswordGood.valid) {
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

  async function validateEmail(newEmail: string, emailFunction: any, confirmEmailBool: boolean) {
    if(validator.isEmail(email)){
      if(!confirmEmailBool){
        emailFunction({valid: true, error: ""})
        if(newEmail == confirmEmail){
          setConfirmEmailGood({valid: true, error: ""})
        }
      } else {
        if(newEmail == confirmEmail){
          emailFunction({valid: true, error: ""})
        } else if(newEmail == email){ 
          emailFunction({valid: true, error: ""})
        }else {
          emailFunction({valid: false, error: "Emails do not match"})
        }
      }
    } else {
      emailFunction({valid: false, error: "Invalid email"})
    }
  }

  async function validateUsername(username: string): Promise<boolean> {
    console.log('checking if username exists')
    try {
      const response = await fetch("http://localhost:3000/users/" + username)
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return true
    } catch (error) {
      console.error('Error fetching users:', error)
      return false
    }
  }

  async function validatePassword(password: string, isConfirmPassword: boolean): Promise<boolean> {
    console.log('Validating password')
    return false
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating account')
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
            <h1 className="text-3xl font-bold">Create Account</h1>
            <input type="text" name="email" className="bg-gray-800 rounded p-1 w-64" placeholder="Email" onChange={(e) => {
              validateEmail(e.target.value, setEmailGood, false)
              setEmail(e.target.value)
            }}/>
            {!emailGood.valid && emailGood.error && ( 
              <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                <li>{emailGood.error}</li>
              </ul>
            )}
            <input type="text" name="confirmEmail" className="bg-gray-800 rounded p-1 w-64" placeholder="Confirm Email" onChange={(e) => {
              validateEmail(e.target.value, setConfirmEmailGood, true)
              setConfirmEmail(e.target.value)
            }}/>
            {!confirmEmailGood.valid && confirmEmailGood.error && ( 
              <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                <li>{confirmEmailGood.error}</li>
              </ul>
            )}
            <input type="text" name="username" className="bg-gray-800 rounded p-1 w-64" placeholder="Username" onChange={(e) => {
              validateUsername(e.target.value)
              setUsername(e.target.value)
            }}/>
            <input type="text" name="password" className="bg-gray-800 rounded p-1 w-64" placeholder="Password" onChange={(e) => {
              validatePassword(e.target.value, false)
              setPassword(e.target.value)
            }}/>
            <input type="text" name="confirmPassword" className="bg-gray-800 rounded p-1 w-64" placeholder="Confirm Password" onChange={(e) => {
              validatePassword(e.target.value, true)
              setConfirmPassword(e.target.value)
             }} />
            <button className="bg-indigo-950 hover:bg-indigo-900 w-64 rounded disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" disabled={buttonDisabled} onClick={handleSubmit}>Create Account</button>
            <a className="text-sm text-gray-400 hover:text-gray-300" href="/forgotPassword">Forgot your password?</a>
            <a className="text-sm text-gray-400 hover:text-gray-300" href="/">Already have an Account? Login</a>
        </form>
      </main>
    </div>
  );
}
