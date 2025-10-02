"use client"
import { useParams } from "next/navigation"
import React from "react"
import FantasyPlusButton from "@/Components/PlusButton"

export default function UserPage() {
  const params = useParams<{ username: string }>()
  const username = params.username

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <FantasyPlusButton
        onClick={() => alert('Plus button clicked!')}
        size={80}
        title="Add New Item"
      />
    </div>
  )
}
