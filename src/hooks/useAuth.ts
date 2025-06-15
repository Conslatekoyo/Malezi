import { User } from '@/types'
import { create } from 'zustand'
import { persist, type PersistOptions } from 'zustand/middleware'
import { useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role: User['role']) => Promise<void>
  logout: () => void
  loginWithGoogle: () => Promise<void>
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
        set({ isLoading: true, error: null })
        try {
          const result = await signInWithEmailAndPassword(auth, email, password)
          const fbUser = result.user
          // Fetch user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid))
          if (!userDoc.exists()) throw new Error('User profile not found')
          set({ user: userDoc.data() as User, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw new Error((error as Error).message)
        }
      },

      register: async (email: string, password: string, name: string, role: User['role']) => {
        set({ isLoading: true, error: null })
        try {
          const result = await createUserWithEmailAndPassword(auth, email, password)
          const fbUser = result.user
          // Create user profile in Firestore
          const userProfile: User = {
            id: fbUser.uid,
            email,
            name,
            role,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          await setDoc(doc(db, 'users', fbUser.uid), userProfile)
          set({ user: userProfile, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },

      logout: async () => {
        await signOut(auth)
        set({ user: null, error: null })
      },
      // Google sign-in
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        try {
          const provider = new GoogleAuthProvider()
          const result = await signInWithPopup(auth, provider)
          const fbUser = result.user
          // Check if user profile exists
          const userDoc = await getDoc(doc(db, 'users', fbUser.uid))
          let userProfile: User
          if (!userDoc.exists()) {
            // Create user profile
            userProfile = {
              id: fbUser.uid,
              email: fbUser.email || '',
              name: fbUser.displayName || '',
              role: 'parent', // Default role, can be updated later
              createdAt: new Date(),
              updatedAt: new Date(),
            }
            await setDoc(doc(db, 'users', fbUser.uid), userProfile)
          } else {
            userProfile = userDoc.data() as User
          }
          set({ user: userProfile, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
          throw error
        }
      },
    }),
    persistConfig
  )
)

// Sync Zustand user state with Firebase Auth
export function useSyncAuth() {
  const setUser = useAuth((s) => s.user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userDoc = await getDoc(doc(db, 'users', fbUser.uid))
        if (userDoc.exists()) {
          useAuth.setState({ user: userDoc.data() as User })
        }
      } else {
        useAuth.setState({ user: null })
      }
    })
    return () => unsubscribe()
  }, [])
}