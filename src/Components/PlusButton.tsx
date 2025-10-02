'use client'
import React from 'react'

type Props = {
  onClick?: () => void
  size?: number
  title?: string
}

export default function FantasyPlusButton({ onClick, size = 64, title = 'Create' }: Props) {
  const px = `${size}px`

  return (
    <button
      onClick={onClick}
      aria-label={title}
      title={title}
      style={{ width: px, height: px }}
      className="relative rounded-full flex items-center justify-center text-white select-none
                 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900
                 shadow-[0_10px_30px_rgba(99,102,241,0.25)] transition-transform duration-300
                 hover:scale-110 active:scale-95 z-50"
    >
      {/* soft outer glow / rune ring */}
      <span className="absolute inset-0 rounded-full ring-2 ring-purple-500/40 blur-sm opacity-80" />

      {/* inner pulsating sheen */}
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent)] animate-pulse" />

      {/* decorative sparkles */}
      <span className="absolute -top-2 -right-2 w-3 h-3 bg-amber-400 rounded-full opacity-90 animate-ping" />
      <span className="absolute bottom-2 left-2 w-2 h-2 bg-rose-400 rounded-full opacity-80 animate-pulse" />

      {/* plus icon as "rune" */}
      <svg className="relative w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>

      {/* subtle decorative ring (for focus) */}
      <span className="absolute -inset-1 rounded-full pointer-events-none opacity-0 focus-within:opacity-100" />
    </button>
  )
}
