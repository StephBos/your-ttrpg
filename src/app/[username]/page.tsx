'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import FantasyPlusButton from '@/Components/PlusButton'
import Background from '@/Components/Background'
import { useState, useEffect } from 'react'
import { Metal_Mania } from 'next/font/google'
import CreateRulesetModal from '@/Components/createRulesetModal'
import RulesetCard from '@/Components/RulesetCard'
import Header from '@/Components/Header'

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })

export default function UserPage() {
   const [modalOpen, setModalOpen] = useState(false)
   const [rulesets, setRulesets] = useState<any[]>([])
   const params = useParams<{ username: string }>()
   const username = params.username

   useEffect(() => {
      if (!username) return
      async function fetchRulesets() {
         try {
            const response = await fetch(
               `http://localhost:3000/rulesets/${username}`
            )
            const data = await response.json()
            setRulesets(data)
         } catch (error) {
            console.error('Error fetching rulesets:', error)
         }
      }
      fetchRulesets()
   }, [username])


   return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
         <Background />

         <Header username={username} />

         <main className="w-full sm:w-2/3 lg:w-1/2 flex flex-col row-start-2 items-center sm:items-start bg-[#2C2C2C]/90 p-6 rounded relative z-10">
            <h1
               className={`text-4xl mb-3 text-[#AA8B56] ${metalMania.className}`}
            >
               Your TTRPG Rulesets
            </h1>

            <div className="w-full flex flex-row gap-4 mb-12">
               {rulesets.map((ruleset: any) => {
                  return (
                     <RulesetCard
                        key={ruleset.id}
                        id={ruleset.id}
                        title={ruleset.title}
                        description={ruleset.description}
                        game={ruleset.game}
                        backgroundImageUrl={ruleset.background_image_url}
                        slug={ruleset.slug}
                        username={username}
                     />
                  )
               })}

               <FantasyPlusButton
                  onClick={() => setModalOpen(true)}
                  size={80}
                  title="Add New Item"
               />
            </div>
         </main>
         {modalOpen && (
            <CreateRulesetModal onClose={() => setModalOpen(false)} />
         )}
      </div>
   )
}
