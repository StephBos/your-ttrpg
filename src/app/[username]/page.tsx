'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import FantasyPlusButton from '@/Components/PlusButton'
import Background from '@/Components/Background'
import { useState, useEffect } from 'react'
import { Metal_Mania } from 'next/font/google'
import CreateRulesetModal from '@/Components/createRulesetModal'

 const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })

export default function UserPage() {
   const [currentImageIndex, setCurrentImageIndex] = useState(0)
   const [isTransitioning, setIsTransitioning] = useState(false)
   const [modalOpen, setModalOpen] = useState(false)
   const params = useParams<{ username: string }>()
   const username = params.username


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

   return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
         <Background images={backgroundImages} />

         <div className="fixed flex items-center top-0 right-0 w-full h-20 bg-gray-900">
            <h1 className={`ml-5 text-3xl text-amber-200 ${metalMania.className}`}>Your TTRPG</h1>
            <h1 className={`mr-5 text-3xl ml-auto text-amber-200 ${metalMania.className}`}>{username.toUpperCase()}</h1>
         </div>

         <main className="w-full sm:w-2/3 lg:w-1/2 flex flex-col row-start-2 items-center sm:items-start bg-gray-900/90 p-6 rounded relative z-10">
            <h1 className={`text-4xl mb-3 text-amber-200 ${metalMania.className}`}>Your TTRPG Rulesets</h1>
            <FantasyPlusButton
               onClick={() => setModalOpen(true)}
               size={80}
               title="Add New Item"
            />
         </main>
         {modalOpen && (<CreateRulesetModal onClose={() => setModalOpen(false)} />)}
      </div>
   )
}
