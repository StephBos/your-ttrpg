import React, { useState, useEffect} from 'react'
import Dropzone from 'react-dropzone'
import { Metal_Mania } from 'next/font/google'
import { Upload } from 'lucide-react'
interface Props {
   fileTypes?: string
   allowMultiple?: boolean
   onFileUpload?: (files: File[]) => void
}

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })

export default function DragNDropFileUpload({
   fileTypes = 'image/*',
   allowMultiple = false,
   onFileUpload
}: Props) {
   const [message, setMessage] = useState(
      "Drag 'n' drop background image here, or click to select files"
   )

   useEffect(() => {
      if (fileTypes && !fileTypes.includes('image')) {
         setMessage("Drag 'n' drop files here, or click to select files")
      }
   }, [fileTypes])

   return (
      <div className="bg-stone-700 rounded p-1 w-full h-30 flex items-center justify-center text-center border-2 border-dashed border-gray-400 cursor-pointer hover:bg-stone-600">
         <Dropzone
            onDrop={(acceptedFiles) => onFileUpload?.(acceptedFiles)}
            accept={{ [fileTypes]: [] }}
            multiple={allowMultiple}
         >
            {({ getRootProps, getInputProps }) => (
               <section>
                  <div {...getRootProps()}>
                     <input {...getInputProps()} />
                     <Upload className="mx-auto mb-2" size={30} color="white" />
                     <p className={`text-amber-100 ${metalMania.className}`}>
                        {message}
                     </p>
                  </div>
               </section>
            )}
         </Dropzone>
      </div>
   )
}
