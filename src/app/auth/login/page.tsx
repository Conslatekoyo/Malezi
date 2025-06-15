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
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
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

 <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.532 24.552c0-1.636-.147-3.2-.42-4.704H24.48v9.12h12.96c-.56 2.96-2.24 5.44-4.784 7.12v5.92h7.76c4.56-4.2 7.112-10.4 7.112-17.456z" fill="#4285F4"/><path d="M24.48 48c6.48 0 11.92-2.16 15.92-5.888l-7.76-5.92c-2.16 1.44-4.96 2.32-8.16 2.32-6.24 0-11.52-4.216-13.408-9.872H3.6v6.08C7.6 43.2 15.44 48 24.48 48z" fill="#34A853"/><path d="M11.072 28.64a13.44 13.44 0 0 1 0-8.576v-6.08H3.6A23.976 23.976 0 0 0 0 24c0 3.92.96 7.616 2.64 10.896l7.76-6.256z" fill="#FBBC05"/><path d="M24.48 9.6c3.52 0 6.656 1.216 9.12 3.6l6.8-6.8C36.4 2.16 30.96 0 24.48 0 15.44 0 7.6 4.8 3.6 12l7.76 6.08c1.888-5.656 7.168-9.872 13.12-9.872z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
              Sign up with Google
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