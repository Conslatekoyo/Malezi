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

export default function ChildrenPage() {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [loading, setLoading] = useState(false)
  const [children, setChildren] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    async function fetchChildren() {
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'children'), where('parentId', '==', user.id))
        : collection(db, 'children')
      const snap = await getDocs(q)
      setChildren(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
    }
    fetchChildren()
  }, [user])

  async function handleAddChild(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    if (!user) {
      toast.error('You must be logged in to add a child.')
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
      toast.success('Child added!')
      setName("")
      setDob("")
      // Refresh children list
      if (!user) return
      const q = user.role === 'parent'
        ? query(collection(db, 'children'), where('parentId', '==', user.id))
        : collection(db, 'children')
      const snap = await getDocs(q)
      setChildren(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
    } catch (err: any) {
      toast.error(err.message)
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
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Children List</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {children.length === 0 ? (
              <TableRow><TableCell colSpan={3}>No children found.</TableCell></TableRow>
            ) : (
              children.map(child => (
                <TableRow key={child.id}>
                  <TableCell>{child.name}</TableCell>
                  <TableCell>{child.dateOfBirth}</TableCell>
                  <TableCell>{child.id}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
)
}
