"use client"
import { useState } from "react"
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'

export default function VaccinationsPage() {
  const { user } = useAuth()
  const [childId, setChildId] = useState("")
  const [vaccineName, setVaccineName] = useState("")
  const [dateAdministered, setDateAdministered] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  async function handleAddVaccination(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")
    if (!user) {
      setError('You must be logged in to add a vaccination.')
      return
    }
    try {
      await addDoc(collection(db, "vaccinations"), {
        childId,
        vaccineName,
        dateAdministered,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      setSuccess("Vaccination record added!")
      setChildId("")
      setVaccineName("")
      setDateAdministered("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Vaccination</h2>
      <form onSubmit={handleAddVaccination} className="space-y-4">
        <Input placeholder="Child ID" value={childId} onChange={e => setChildId(e.target.value)} required />
        <Input placeholder="Vaccine Name" value={vaccineName} onChange={e => setVaccineName(e.target.value)} required />
        <Input type="date" value={dateAdministered} onChange={e => setDateAdministered(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Vaccination"}</Button>
      </form>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
)
}
