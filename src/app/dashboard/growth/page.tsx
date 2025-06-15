"use client"
import { useState } from "react"
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'

export default function GrowthPage() {
  const { user } = useAuth()
  const [childId, setChildId] = useState("")
  const [date, setDate] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  async function handleAddGrowth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")
    if (!user) {
      setError('You must be logged in to add a growth record.')
      return
    }
    try {
      await addDoc(collection(db, "growth_records"), {
        childId,
        date,
        height: Number(height),
        weight: Number(weight),
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      setSuccess("Growth record added!")
      setChildId("")
      setDate("")
      setHeight("")
      setWeight("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Growth Record</h2>
      <form onSubmit={handleAddGrowth} className="space-y-4">
        <Input placeholder="Child ID" value={childId} onChange={e => setChildId(e.target.value)} required />
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <Input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} required />
        <Input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Growth Record"}</Button>
      </form>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
)
}
