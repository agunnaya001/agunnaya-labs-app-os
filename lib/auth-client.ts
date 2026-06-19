import { createAuthClient } from 'better-auth/react'
import { useRouter } from 'next/navigation'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
})

export const useAuth = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  return {
    session,
    user: session?.user,
    isAuthenticated: !!session?.user,
    signOut: async () => {
      await authClient.signOut()
      router.push('/sign-in')
      router.refresh()
    },
  }
}
