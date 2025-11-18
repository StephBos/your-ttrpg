'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
   validateUsername,
   validateEmail,
   validatePassword,
   handleSubmit,
} from './createAccountHelper'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Background from '../../Components/Background'

export default function Home() {
   const router = useRouter()
   const [buttonDisabled, setButtonDisabled] = useState(true)
   const [emailGood, setEmailGood] = useState({ valid: false, error: '' })
   const [confirmEmailGood, setConfirmEmailGood] = useState({
      valid: false,
      error: '',
   })
   const [usernameGood, setUsernameGood] = useState([
      { valid: false, error: '' },
   ])
   const [passwordGood, setPasswordGood] = useState([
      { valid: false, error: '' },
   ])
   const [confirmPasswordGood, setConfirmPasswordGood] = useState([
      { valid: false, error: '' },
   ])
   const [email, setEmail] = useState('')
   const [confirmEmail, setConfirmEmail] = useState('')
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [isCreatingAccount, setIsCreatingAccount] = useState(false)
   const [accountCreationMessage, setAccountCreationMessage] = useState('')
   const [modalOpen, setModalOpen] = useState(false)

   useEffect(() => {
      if (
         emailGood.valid &&
         confirmEmailGood.valid &&
         usernameGood[0]?.valid &&
         passwordGood[0]?.valid &&
         confirmPasswordGood[0]?.valid
      ) {
         setButtonDisabled(false)
      } else {
         setButtonDisabled(true)
      }
   }, [
      emailGood,
      confirmEmailGood,
      usernameGood,
      passwordGood,
      confirmPasswordGood,
   ])

   return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
         <Background />

         <main className="flex flex-col row-start-2 items-center sm:items-start bg-gray-900/90 p-6 rounded gap-2 relative z-10">
            <form action="submit" className="flex flex-col gap-2">
               <h1 className="text-3xl font-bold">Create Account</h1>
               {/*-------Email------*/}
               <input
                  type="text"
                  name="email"
                  className="bg-gray-800 rounded p-1 w-64"
                  placeholder="Email"
                  onChange={(e) => {
                     const result = validateEmail(
                        e.target.value,
                        confirmEmail,
                        false
                     )
                     setEmailGood(result)
                     setEmail(e.target.value)
                     if (e.target.value == confirmEmail) {
                        setConfirmEmailGood(result)
                     }
                  }}
               />
               {!emailGood.valid && emailGood.error && (
                  <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                     <li>{emailGood.error}</li>
                  </ul>
               )}
               {/*-------Confirm Email------*/}
               <input
                  type="text"
                  name="confirmEmail"
                  className="bg-gray-800 rounded p-1 w-64"
                  placeholder="Confirm Email"
                  onChange={(e) => {
                     const result = validateEmail(e.target.value, email, true)
                     setConfirmEmailGood(result)
                     setConfirmEmail(e.target.value)
                  }}
               />
               {!confirmEmailGood.valid && confirmEmailGood.error && (
                  <ul className="list-disc list-inside text-red-400 text-sm mt-1">
                     <li>{confirmEmailGood.error}</li>
                  </ul>
               )}
               {/*-------username------*/}
               <input
                  type="text"
                  name="username"
                  className="bg-gray-800 rounded p-1 w-64"
                  placeholder="Username"
                  onChange={async (e) => {
                     try {
                        const results = await validateUsername(e.target.value)
                        setUsernameGood(results)
                     } catch (error) {
                        console.error('Username validation error:', error)
                        setUsernameGood([
                           {
                              valid: false,
                              error: 'Unable to validate username. Please try again.',
                           },
                        ])
                     }
                     setUsername(e.target.value)
                  }}
               />
               {usernameGood.length > 0 && usernameGood[0].error && (
                  <ul className="mt-2 text-red-600 list-disc list-inside whitespace-pre-line">
                     {usernameGood.map((error, index) => (
                        <li key={index}>{error.error}</li>
                     ))}
                  </ul>
               )}
               {/*-------Password------*/}
               <div className="relative w-64">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     className="bg-gray-800 rounded p-1 w-64"
                     placeholder="Password"
                     onChange={async (e) => {
                        try {
                           const results = await validatePassword(
                              e.target.value,
                              password,
                              false
                           )
                           setPasswordGood(results)
                        } catch (error) {
                           console.error('Password validation error:', error)
                           setPasswordGood([
                              {
                                 valid: false,
                                 error: 'Unable to validate password. Please try again.',
                              },
                           ])
                        }
                        setPassword(e.target.value)
                     }}
                  />
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
               <div className="relative w-64">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     name="confirmPassword"
                     className="bg-gray-800 rounded p-1 w-64"
                     placeholder="Confirm Password"
                     onChange={async (e) => {
                        try {
                           const results = await validatePassword(
                              e.target.value,
                              password,
                              true
                           )
                           setConfirmPasswordGood(results)
                        } catch (error) {
                           console.error(
                              'Confirm password validation error:',
                              error
                           )
                           setConfirmPasswordGood([
                              {
                                 valid: false,
                                 error: 'Unable to validate password. Please try again.',
                              },
                           ])
                        }
                     }}
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>
               {confirmPasswordGood.length > 0 &&
                  confirmPasswordGood[0].error && (
                     <ul className="mt-2 text-red-600 list-disc list-inside whitespace-pre-line">
                        {confirmPasswordGood.map((error, index) => (
                           <li key={index}>{error.error}</li>
                        ))}
                     </ul>
                  )}
               {/*-----Submit Button-----*/}
               <button
                  type="button"
                  className="bg-indigo-950 hover:bg-indigo-900 w-64 rounded disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
                  disabled={buttonDisabled || isCreatingAccount}
                  onClick={async () => {
                     setIsCreatingAccount(true)
                     setAccountCreationMessage('')

                     try {
                        const result = await handleSubmit(
                           username,
                           email,
                           password
                        )

                        if (result.success) {
                           setAccountCreationMessage(
                              'Account created successfully! Redirecting...'
                           )
                           // Small delay to show success message before redirecting
                           setTimeout(() => {
                              router.push(`/${username}`)
                           }, 1000)
                        } else if (result.error == 'Email already in use') {
                           setModalOpen(true)
                        }
                     } catch (error: any) {
                        setAccountCreationMessage(
                           'Failed to create account. Please try again.'
                        )
                     } finally {
                        setIsCreatingAccount(false)
                     }
                  }}
               >
                  {isCreatingAccount ? 'Creating Account...' : 'Create Account'}
               </button>

               {/* Account creation status message */}
               {accountCreationMessage && (
                  <div
                     className={`text-sm text-center p-2 rounded w-64 ${
                        accountCreationMessage.includes('successfully')
                           ? 'text-green-400 bg-green-900/20'
                           : 'text-red-400 bg-red-900/20'
                     }`}
                  >
                     {accountCreationMessage}
                  </div>
               )}

               <Link
                  className="text-sm text-gray-400 hover:text-gray-300"
                  href="/forgotPassword"
               >
                  Forgot your password?
               </Link>
               <Link
                  className="text-sm text-gray-400 hover:text-gray-300"
                  href="/"
               >
                  Already have an Account? Login
               </Link>
            </form>
         </main>
         {/* Email in use Modal */}
         {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
               <div className="bg-gray-700 relative rounded-lg p-6 max-w-sm w-full text-center">
                  <button
                     onClick={() => setModalOpen(false)}
                     className="absolute top-2 right-2 text-gray-200 hover:text-white text-xl"
                  >
                     &#10005;
                  </button>

                  <h2 className="text-lg font-bold mb-2">
                     Email Already in Use
                  </h2>
                  <p className="mb-4">Please Login</p>

                  <div className="flex justify-center">
                     <button
                        className="bg-indigo-950 hover:bg-indigo-900 w-40 rounded py-2"
                        onClick={() => router.push('/')}
                     >
                        Back to Login
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
