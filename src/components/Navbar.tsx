"use client"

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogOut } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-transparent shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <img src="/icons/logo.svg" alt="Malezi Logo" width={32} height={32} />
        <span className="text-xl font-bold text-pink-600 dark:text-pink-200">Malezi</span>
      </Link>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        {user ? (
          <>
            <Link href="/dashboard" className="text-base font-medium text-blue-700 dark:text-blue-200 hover:underline">Dashboard</Link>
            <span className="text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-1" />Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="text-base font-medium text-blue-700 dark:text-blue-200 hover:underline">Sign In</Link>
            <Link href="/auth/register" className="text-base font-medium text-pink-700 dark:text-pink-200 hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
