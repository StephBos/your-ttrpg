import { Swords } from 'lucide-react'

export default function SwordsX({onClose}) {
   return (
      <button type="button" aria-label="Swords X" className='absolute top-3 right-3 cursor-pointer' onClick={onClose}> 
         <Swords className="text-[#4C763B] w-6 h-6" />
      </button>
   )
}
