'use client'
import { Metal_Mania } from 'next/font/google'
import React from 'react'
import Link from 'next/link'

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })

interface HeaderProps {
   username: string
}

export default function Header({ username }: HeaderProps) {
   return (
      <div className="fixed flex items-center top-0 right-0 w-full z-11 h-20 bg-[#395144]">
         <h1 className={`ml-5 text-3xl text-amber-200 ${metalMania.className}`}>
            Your TTRPG
         </h1>
         <Link
            className={`mr-5 text-3xl ml-auto text-amber-200 ${metalMania.className}`}
            href={`/${username}`}
         >
            {username.toUpperCase()}
         </Link>
      </div>
   )
}
