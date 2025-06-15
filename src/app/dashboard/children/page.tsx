"use client"
import { useState } from "react"
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'

export default function ChildrenPage() {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  async function handleAddChild(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")
    if (!user) {
      setError('You must be logged in to add a child.')
      return
    }
    try {
      await addDoc(collection(db, "children"), {
        name,
        dateOfBirth: dob,
        parentId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      setSuccess("Child added!")
      setName("")
      setDob("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Child</h2>
      <form onSubmit={handleAddChild} className="space-y-4">
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Child"}</Button>
      </form>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
)
}
