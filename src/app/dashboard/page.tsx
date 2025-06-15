'use client'

import { useEffect, useState } from 'react'
import { Calendar, TrendingUp, Syringe, Stethoscope } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { db } from '@/lib/db/mockDb'
import { Child, VaccinationRecord, GrowthRecord, DoctorVisit } from '@/types'

export default function DashboardPage() {
  const { user } = useAuth()
  const [children, setChildren] = useState<Child[]>([])
  const [stats, setStats] = useState({
    totalVaccinations: 0,
    upcomingVaccinations: 0,
    growthRecords: 0,
    doctorVisits: 0,
  })

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return

      // Load children for the logged-in parent
      const userChildren = await db.findMany('children', 
        user.role === 'parent' ? { parentId: user.id } : undefined
      )
      setChildren(userChildren)

      // Calculate stats
      const childrenIds = userChildren.map(child => child.id)
      
      const vaccinations = await db.findMany('vaccinations')
      const filteredVaccinations = vaccinations.filter(v => childrenIds.includes(v.childId))
      
      const upcomingVacs = filteredVaccinations.filter(v => {
        if (!v.nextDueDate) return false
        const dueDate = new Date(v.nextDueDate)
        const today = new Date()
        return dueDate > today && dueDate <= new Date(today.setMonth(today.getMonth() + 1))
      })

      const growthRecords = await db.findMany('growthRecords')
      const filteredGrowthRecords = growthRecords.filter(g => childrenIds.includes(g.childId))

      const doctorVisits = await db.findMany('doctorVisits')
      const filteredDoctorVisits = doctorVisits.filter(d => childrenIds.includes(d.childId))

      setStats({
        totalVaccinations: filteredVaccinations.length,
        upcomingVaccinations: upcomingVacs.length,
        growthRecords: filteredGrowthRecords.length,
        doctorVisits: filteredDoctorVisits.length,
      })
    }

    loadDashboardData()
  }, [user])

  return (
    <div className="space-y-8 bg-background">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your children's medical records and upcoming appointments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vaccinations</CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVaccinations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingVaccinations} upcoming this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Records</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.growthRecords}</div>
            <p className="text-xs text-muted-foreground">
              Track height and weight progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doctor Visits</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doctorVisits}</div>
            <p className="text-xs text-muted-foreground">
              Total medical consultations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Children</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children.length}</div>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'parent' ? 'Registered children' : 'Children under care'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {user?.role === 'parent' 
                  ? 'No children registered yet. Add your first child to get started.'
                  : 'No children under your care yet.'}
              </p>
            ) : (
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{child.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Born {new Date(child.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Vaccinations</CardTitle>
            <CardDescription>
              Due in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.upcomingVaccinations === 0 ? (
              <p className="text-sm text-muted-foreground">
                No upcoming vaccinations scheduled.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {stats.upcomingVaccinations} vaccination(s) due soon
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}