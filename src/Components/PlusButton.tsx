'use client'
import React from 'react'

type Props = {
  onClick?: () => void
  size?: number
  title?: string
}

export default function FantasyPlusButton({ onClick, size = 64, title = 'Create' }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={title}
      title={title}
      className="flex items-center justify-center w-60 h-80 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-amber-100/50"
    >      
      {/* plus icon */}
      <svg className="relative w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
    </button>
  )
}
