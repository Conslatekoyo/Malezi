"use client"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Baby, Calendar, Shield, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'
import StarsBg from '@/components/StarsBg'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-purple-100 dark:from-indigo-900 dark:via-blue-950 dark:to-fuchsia-950 transition-colors duration-500">
      <StarsBg />
      <main className="flex-1 z-10">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col justify-center items-center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
                >
                  Track Your Child's Health Journey
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="mx-auto max-w-[700px] text-blue-600 dark:text-blue-200 md:text-xl font-medium"
                >
                  Secure, comprehensive medical record keeping for your child from birth to age 5. Everything you need in one place.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-x-4"
              >
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300 text-white shadow-lg hover:from-pink-400 hover:to-purple-400">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 text-purple-600" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Baby className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Growth Tracking</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitor your child's height, weight, and developmental milestones.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Vaccination Schedule</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Never miss important vaccinations with our smart reminder system.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Medical History</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Keep track of illnesses, allergies, and doctor visits in one secure place.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Secure Access</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Role-based access ensures your child's data is safe and private.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Malezi. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
