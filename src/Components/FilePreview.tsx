import { Trash } from 'lucide-react'

interface FilePreviewProps {
   file: any
   setFile: any
}

export default function FilePreview({ file, setFile }: FilePreviewProps) {
   if (!file) return null

   const url = URL.createObjectURL(file)

   const isImage = file.type.startsWith('image/')
   return (
      <div className="relative w-full">
         {isImage ? (
            <img
               className="w-full h-30 object-cover rounded"
               src={url}
               alt={file.name}
            />
         ) : (
            <div className="w-full h-30 flex items-center justify-center bg-gray-200 rounded text-gray-800 font-bold">
               {file.name}
            </div>
         )}

         <Trash
            className="absolute top-2 right-2 text-stone-950 hover:text-black text-2xl cursor-pointer"
            onClick={() => setFile(null)}
         />
      </div>
   )
}
