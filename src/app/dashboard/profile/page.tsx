'use client'
import { useSession, signOut } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  console.log(session, status)
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}
