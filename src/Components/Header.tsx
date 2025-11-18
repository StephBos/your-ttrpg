import { Metal_Mania } from 'next/font/google'
import React from 'react'

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })

interface HeaderProps {
   username: string
}

export default function Header({ username }: HeaderProps) {
   return (
      <div className="fixed flex items-center top-0 right-0 w-full h-20 bg-[#395144]">
         <h1 className={`ml-5 text-3xl text-amber-200 ${metalMania.className}`}>
            Your TTRPG
         </h1>
         <h1
            className={`mr-5 text-3xl ml-auto text-amber-200 ${metalMania.className}`}
         >
            {username.toUpperCase()}
         </h1>
      </div>
   )
}
