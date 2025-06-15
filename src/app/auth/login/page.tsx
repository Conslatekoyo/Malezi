'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useAuth } from '@/hooks/useAuth'

import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, loginWithGoogle } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.email, values.password)
      toast.success('Login successful')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your child's medical records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={async () => {
                try {
                  await loginWithGoogle()
                  toast.success('Signed in with Google')
                  router.push('/dashboard')
                } catch (error) {
                  toast.error('Google sign-in failed')
                }
              }}
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.6c-.2 1.1-.9 2-1.8 2.6v2.2h2.9c1.7-1.5 2.7-3.7 2.7-6.6z"/><path fill="currentColor" d="M12 22c2.4 0 4.4-.8 5.9-2.1l-2.9-2.2c-.8.5-1.8.8-3 .8-2.3 0-4.3-1.5-5-3.6H3v2.3C4.5 20.5 7 22 12 22z"/><path fill="currentColor" d="M6.9 13.1c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6V7.6H3.9C3.3 8.8 3 10.1 3 11.5s.3 2.7.9 3.9l3-2.3z"/><path fill="currentColor" d="M12 5.5c1.3 0 2.5.4 3.4 1.3l2.5-2.5C16.4 2.8 14.4 2 12 2 7 2 4.5 3.5 3 5.6l3 2.3c.7-2.1 2.7-3.6 5-3.6z"/></svg>
              Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}