import { Pirata_One } from 'next/font/google'
import React, { useEffect } from 'react'
import DragNDropFileUpload from './dropNDropFileUpload'
import AddNewButton from './AddNewButton'
import SwordsX from './SwordsX'
import FilePreview from './FilePreview'

const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' })

export default function UploadFileModal({ onClose }) {
   const [file, setFile] = React.useState<File | null>(null)
   const [buttonDisabled, setButtonDisabled] = React.useState(true)

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
      if (file) {
         formData.append('file', file)
      }

      const response = fetch('http://localhost:3000/rulesets/file' 
         , {
            method: 'POST',
            body: formData,
         }
      )
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
         <div className="bg-[#395144] p-6 rounded relative z-10 flex flex-col items-center gap-6 w-100">
            <h2
               className={`text-4xl text-amber-200 font-bold ${pirataOne.className}`}
            >
               Upload File
            </h2>
            <SwordsX onClose={onClose} />

            {file ? (
               <FilePreview file={file} setFile={setFile} />
            ) : (
               <DragNDropFileUpload fileTypes="" onFileUpload={handleFile} />
            )}

            <AddNewButton
               action="Upload"
               onClick={handleUpload}
               disabled={buttonDisabled}
            />
         </div>
      </div>
   )
}
