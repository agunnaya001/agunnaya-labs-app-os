import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { AuthForm } from '@/components/auth-form'

export const metadata = {
  title: 'Sign Up - Agunnaya Labs',
  description: 'Create your Agunnaya Labs account',
}

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Agunnaya Labs</h1>
          <p className="text-muted-foreground">Web3 Gaming & DeFi Dashboard</p>
        </div>

        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-bold text-center mb-6">Join the Arena</h2>
          <AuthForm mode="sign-up" />
        </div>
      </div>
    </div>
  )
}
