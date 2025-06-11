import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Baby, Calendar, Shield, Stethoscope } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/icons/logo.svg"
            alt="Malezi Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="text-2xl font-bold">Malezi</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ThemeToggle />
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/auth/login"
          >
            Sign In
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/auth/register"
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Child's Health Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Secure, comprehensive medical record keeping for your child from birth to age 5.
                  Everything you need in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
