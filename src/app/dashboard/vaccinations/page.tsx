"use client"
import { useState } from "react"
import { db } from '@/lib/firebase'
import { addDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table'
import { toast } from 'sonner'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default function VaccinationsPage() {
  const { user } = useAuth()
  const [childId, setChildId] = useState("")
  const [vaccineName, setVaccineName] = useState("")
  const [dateAdministered, setDateAdministered] = useState("")
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    async function fetchVaccinations() {
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'vaccinations'), where('createdBy', '==', user.id))
        : collection(db, 'vaccinations')
      const snap = await getDocs(q)
      setRecords(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
    }
    fetchVaccinations()
  }, [user])

  async function handleAddVaccination(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (!user) {
      toast.error('You must be logged in to add a vaccination.')
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
      toast.success('Vaccination record added!')
      setChildId("")
      setVaccineName("")
      setDateAdministered("")
      // Refresh records
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'vaccinations'), where('createdBy', '==', user.id))
        : collection(db, 'vaccinations')
      const snap = await getDocs(q)
      setRecords(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
    } catch (err: any) {
      toast.error(err.message)
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
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Vaccination Records</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Child ID</TableHead>
              <TableHead>Vaccine Name</TableHead>
              <TableHead>Date Administered</TableHead>
              <TableHead>ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow><TableCell colSpan={4}>No vaccination records found.</TableCell></TableRow>
            ) : (
              records.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.childId}</TableCell>
                  <TableCell>{record.vaccineName}</TableCell>
                  <TableCell>{record.dateAdministered}</TableCell>
                  <TableCell>{record.id}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
)
}
