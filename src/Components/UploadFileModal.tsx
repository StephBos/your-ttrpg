import { Pirata_One } from 'next/font/google'
import DragNDropFileUpload from './dropNDropFileUpload'
import AddNewButton from './AddNewButton'

const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' })

export default function UploadFileModal({ onClose: any }) {
   function handleUpload() {
      console.log('File uploading')
   }

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
         <div className="bg-[#395144] p-6 rounded relative z-10 flex flex-col items-center gap-6">
            <h2
               className={`text-4xl text-amber-200 font-bold ${pirataOne.className}`}
            >
               Upload File
            </h2>

            <DragNDropFileUpload />

            <AddNewButton action="Upload" onClick={handleUpload} />
         </div>
      </div>
   )
}
