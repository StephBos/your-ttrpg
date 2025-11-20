import React, { useState } from 'react'
import { Metal_Mania } from 'next/font/google'
import DragNDropFileUpload from './dropNDropFileUpload'
import { Ruleset } from '@/types/ruleset'
import { useParams } from 'next/navigation'
import Dropdown from './dropdown'
import { Trash } from 'lucide-react'

interface CreateRulesetModalProps {
   onClose: () => void
}

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })

export default function CreateRulesetModal({
   onClose,
}: CreateRulesetModalProps) {
   const { username } = useParams()
   const [ruleset, setRuleset] = useState<Ruleset>({
      username: username as string,
      title: '',
      backgroundImage: null,
      createdAt: new Date().toLocaleDateString(),
      description: '',
      game: '',
      slug: '',
   })
   const selectMessage = 'Select Game'

   async function handleSave() {
      console.log('Saving ruleset:', ruleset)

      const formData = new FormData()
      formData.append('username', ruleset.username)
      formData.append('title', ruleset.title)
      formData.append('description', ruleset.description)
      formData.append('game', ruleset.game)
      formData.append('createdAt', ruleset.createdAt)
      formData.append('slug', ruleset.slug)

      if (ruleset.backgroundImage) {
         formData.append('backgroundImage', ruleset.backgroundImage)
      }

      try {
         const response = await fetch('http://localhost:3000/rulesets', {
            method: 'POST',
            body: formData,
         })

         if (response.ok) {
            //router.push()
         } else {
            console.error('Failed to save ruleset:', response.statusText)
         }
      } catch (error) {
         console.error('Error saving ruleset:', error)
      }
   }

   function handleFileUpload(files: File[]) {
      setRuleset({ ...ruleset, backgroundImage: files[0] })
   }

   function handleSelect(selected: string | string[]) {
      console.log('Selected game:', selected)
      setRuleset({ ...ruleset, game: selected as string })
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
         <div
            className="relative rounded-2xl p-6 bg-zinc-600 text-gray-900 
                   shadow-[0_0_40px_rgba(0,0,0,0.5)] border-[3px] border-stone-600 
                   w-80 h-auto"
         >
            {/* Header */}
            <h1 className={`text-3xl mb-4 ${metalMania.className} text-left`}>
               Create New Ruleset
            </h1>

            {/* Close Button */}
            <button
               onClick={onClose}
               className="absolute top-2 right-2 text-stone-950 hover:text-black text-2xl cursor-pointer"
            >
               ✕
            </button>

            {/* Form */}
            <form className="flex flex-col items-start gap-2 w-full text-left">
               <input
                  type="text"
                  name="Title"
                  className="bg-stone-700 rounded p-2 w-full placeholder-amber-100/50 text-amber-100"
                  placeholder="Title"
                  onChange={(e) =>
                     //add title and generate url from title
                     setRuleset({
                        ...ruleset,
                        title: e.target.value,
                        slug: e.target.value
                           .trim()
                           .toLowerCase()
                           .replace(/\s+/g, '-'),
                     })
                  }
               />

               {ruleset.backgroundImage ? (
                  <div className="relative w-full">
                     <img
                        className="w-full h-30 object-cover rounded"
                        src={URL.createObjectURL(ruleset.backgroundImage)}
                        alt="Background Preview"
                     />
                     <Trash
                        className="absolute top-2 right-2 text-stone-950 hover:text-black text-2xl cursor-pointer"
                        onClick={() =>
                           setRuleset({ ...ruleset, backgroundImage: null })
                        }
                     />
                  </div>
               ) : (
                  <DragNDropFileUpload
                     fileTypes="image/*"
                     onFileUpload={handleFileUpload}
                  />
               )}

               <p className="text-sm text-amber-200">
                  Created at: {ruleset.createdAt}
               </p>

               <textarea
                  name="Description"
                  className="bg-stone-700 rounded p-2 w-full h-15 resize-none placeholder-amber-100/50 text-amber-100"
                  placeholder="Description"
                  onChange={(e) => {
                     setRuleset({ ...ruleset, description: e.target.value })
                  }}
               ></textarea>

               <Dropdown
                  options={['DND5e']}
                  onSelect={handleSelect}
                  selectMessage={selectMessage}
               />
            </form>

            {/* Save Button */}
            <div className="w-full flex justify-center mt-4">
               <button
                  className={`bg-[#d4b483] hover:bg-[#c2a473] text-black px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed 
                        rounded font-semibold shadow-md ${metalMania.className} cursor-pointer`}
                  onClick={handleSave}
                  disabled={!ruleset.title.trim() || !ruleset.game} // Disable if title is empty
               >
                  Save
               </button>
            </div>
         </div>
      </div>
   )
}
