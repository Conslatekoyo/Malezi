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

export default function RecordsPage() {
  const { user } = useAuth()
  const [childId, setChildId] = useState("")
  const [condition, setCondition] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    async function fetchRecords() {
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'medical_records'), where('createdBy', '==', user.id))
        : collection(db, 'medical_records')
      const snap = await getDocs(q)
      setRecords(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
    }
    fetchRecords()
  }, [user])

  async function handleAddRecord(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (!user) {
      toast.error('You must be logged in to add a record.')
      return
    }
    try {
      await addDoc(collection(db, "medical_records"), {
        childId,
        condition,
        diagnosisDate: date,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      toast.success('Medical record added!')
      setChildId("")
      setCondition("")
      setDate("")
      // Refresh records
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'medical_records'), where('createdBy', '==', user.id))
        : collection(db, 'medical_records')
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
      <h2 className="text-2xl font-bold mb-4">Add Medical Record</h2>
      <form onSubmit={handleAddRecord} className="space-y-4">
        <Input placeholder="Child ID" value={childId} onChange={e => setChildId(e.target.value)} required />
        <Input placeholder="Condition" value={condition} onChange={e => setCondition(e.target.value)} required />
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Record"}</Button>
      </form>
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Medical Records</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Child ID</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Diagnosis Date</TableHead>
              <TableHead>ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow><TableCell colSpan={4}>No records found.</TableCell></TableRow>
            ) : (
              records.map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.childId}</TableCell>
                  <TableCell>{record.condition}</TableCell>
                  <TableCell>{record.diagnosisDate}</TableCell>
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
