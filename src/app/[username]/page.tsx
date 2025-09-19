"use client"
import { useParams } from "next/navigation"

export default function UserPage() {
  const params = useParams<{ username: string }>()
  const username = params.username

  return (
    <div>
      <h1>Welcome, {username}!</h1>
    </div>
  )
}
