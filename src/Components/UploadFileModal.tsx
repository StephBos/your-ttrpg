import { Pirata_One } from 'next/font/google'
import React, { useEffect } from 'react'
import DragNDropFileUpload from './dropNDropFileUpload'
import AddNewButton from './AddNewButton'
import SwordsX from './SwordsX'
import FilePreview from './FilePreview'
import FileOptions from './FileOptions'

const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' })

type EntityType =
   | 'class'
   | 'subclass'
   | 'background'
   | 'feat'
   | 'spell'
   | 'species'
   | 'item'
   | 'equipment'
   | 'monster'

const ENTITY_TYPES: { label: string; type: EntityType }[] = [
   { label: 'Classes', type: 'class' },
   { label: 'Subclasses', type: 'subclass' },
   { label: 'Backgrounds', type: 'background' },
   { label: 'Feats', type: 'feat' },
   { label: 'Spells', type: 'spell' },
   { label: 'Species / Races', type: 'species' },
   { label: 'Items', type: 'item' },
   { label: 'Equipment', type: 'equipment' },
   { label: 'Monsters', type: 'monster' },
]

export default function UploadFileModal({ onClose, user }) {
   const [file, setFile] = React.useState<File | null>(null)
   const [buttonDisabled, setButtonDisabled] = React.useState(true)
   const [selectedEntities, setSelectedEntities] = React.useState<EntityType[]>(
      []
   )

   useEffect(() => {
      if (file) {
         setButtonDisabled(false)
      } else {
         setButtonDisabled(true)
      }
   }, [file])

   function handleFile(file: File[]) {
      console.log('File uploaded:', file[0])
      setFile(file[0])

      setButtonDisabled(false)
   }

   function handleUpload() {
      console.log('Uploading file:', file)
      const formData = new FormData()
      formData.append('username', user)
      formData.append('selectedEntities', JSON.stringify(selectedEntities))
      if (file) {
         formData.append('file', file)
      }
      console.log('formData:', selectedEntities)
      const response = fetch('http://localhost:3000/rulesets/file', {
         method: 'POST',
         body: formData,
      })
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
         <div className="bg-[#395144] p-6 rounded relative z-10 flex flex-col gap-6 w-[500px] max-w-[90vw]">
            <h2
               className={`text-4xl text-amber-200 font-bold ${pirataOne.className}`}
            >
               Upload File
            </h2>
            <SwordsX onClose={onClose} />

            <DragNDropFileUpload fileTypes="" onFileUpload={handleFile} />

            <div className="flex flex-col items-left gap-6 w-full">
               <h4
                  className={`text-xl text-amber-200 font-bold ${pirataOne.className}`}
               >
                  This file includes?
               </h4>
               <div className="flex flex-wrap gap-3 bg-amber-200/50 border border-amber-200 w-full rounded-md p-4">
                  {ENTITY_TYPES.map((entity) => (
                     <label className="inline-flex items-center gap-2 px-3 py-2 bg-amber-200/70 rounded-md shadow-sm cursor-pointer hover:bg-amber-400 transition">
                        <input
                           type="checkbox"
                           checked={selectedEntities.includes(entity.type)}
                           onChange={(e) => {
                              if (e.target.checked) {
                                 setSelectedEntities([
                                    ...selectedEntities,
                                    entity.type,
                                 ])
                              } else {
                                 setSelectedEntities(
                                    selectedEntities.filter(
                                       (t) => t !== entity.type
                                    )
                                 )
                              }
                           }}
                           className="h-4 w-4 accent-amber-500"
                        />
                        <span className="text-[#4E6C50] text-sm">
                           {entity.label}
                        </span>
                     </label>
                  ))}
               </div>
            </div>

            <AddNewButton
               action="Upload"
               onClick={handleUpload}
               disabled={buttonDisabled}
            />
         </div>
      </div>
   )
}
