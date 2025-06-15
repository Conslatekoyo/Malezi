'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Menu, User, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      //router.push('/auth/login');
      console.log('User is not authenticated')
    }
  }, [user, router])

  if (!user) return null

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Children', href: '/dashboard/children' },
    { name: 'Medical Records', href: '/dashboard/records' },
    { name: 'Vaccinations', href: '/dashboard/vaccinations' },
    { name: 'Growth Tracking', href: '/dashboard/growth' },
  ]

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden fixed top-4 right-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-auto p-4">
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-zinc-700 bg-background pt-5">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-2xl font-bold">Malezi</h1>
          </div>
          <div className="mt-8 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium shadow-sm my-3 rounded-md hover:bg-zinc-500 hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-zinc-700 p-4">
            <div className="flex items-center">
              <div>
                <User className="inline-block h-9 w-9 rounded-full" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs font-medium">{user.role}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="ml-auto">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 h-screen bg-background">
        <main className="py-8 px-4 sm:px-6 lg:px-8 bg-background">{children}</main>
      </div>
    </div>
  )
}