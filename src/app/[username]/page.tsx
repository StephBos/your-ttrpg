"use client"
import { useParams } from 'next/navigation'

export default function UserProfile() {
  const params = useParams()
  const username = params.username as string

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Username: {username}</h2>
          <p className="text-gray-300">
            This is the profile page for user: <span className="text-blue-400 font-mono">{username}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
