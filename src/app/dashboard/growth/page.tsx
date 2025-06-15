"use client"
import { useState } from "react"
import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table'
import { toast } from 'sonner'

export default function GrowthPage() {
  const { user } = useAuth()
  const [childId, setChildId] = useState("")
  const [date, setDate] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    async function fetchGrowth() {
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'growth_records'), where('createdBy', '==', user.id))
        : collection(db, 'growth_records')
      const snap = await getDocs(q)
      setRecords(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
    }
    fetchGrowth()
  }, [user])

  async function handleAddGrowth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (!user) {
      toast.error('You must be logged in to add a growth record.')
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
      toast.success('Growth record added!')
      setChildId("")
      setDate("")
      setHeight("")
      setWeight("")
      // Refresh records
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'growth_records'), where('createdBy', '==', user.id))
        : collection(db, 'growth_records')
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
      <h2 className="text-2xl font-bold mb-4">Add Growth Record</h2>
      <form onSubmit={handleAddGrowth} className="space-y-4">
        <Input placeholder="Child ID" value={childId} onChange={e => setChildId(e.target.value)} required />
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <Input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} required />
        <Input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Growth Record"}</Button>
      </form>
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Growth Records</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Child ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow><TableCell colSpan={5}>No growth records found.</TableCell></TableRow>
            ) : (
              records.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.childId}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.height}</TableCell>
                  <TableCell>{record.weight}</TableCell>
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
