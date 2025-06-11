import { User } from '@/types'
import { create } from 'zustand'
import { persist, type PersistOptions } from 'zustand/middleware'
import { db } from '@/lib/db/mockDb'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role: User['role']) => Promise<void>
  logout: () => void
}

type AuthStore = ReturnType<typeof create<AuthState>>

const persistConfig: PersistOptions<AuthState> = {
  name: 'auth-storage',
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          
          // In a real app, we would validate the password here
          const user = await db.findUnique('users', { email })
          
          if (!user) {
            throw new Error('Invalid credentials')
          }

          set({ user, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw new Error((error as Error).message)
        }
      },

      register: async (email: string, password: string, name: string, role: User['role']) => {
        try {
          set({ isLoading: true, error: null })

          // Check if user already exists
          const existingUser = await db.findUnique('users', { email })
          if (existingUser) {
            throw new Error('User already exists')
          }

          // In a real app, we would hash the password here
          const user = await db.create('users', {
            email,
            name,
            role,
          })

          set({ user, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, error: null })
      },
    }),
    persistConfig
  )
)