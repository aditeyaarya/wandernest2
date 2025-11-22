'use client'

/**
 * Custom useAuth hook wrapper for NextAuth session
 */

import { useSession as useNextAuthSession } from 'next-auth/react'

export function useAuth() {
  return useNextAuthSession()
}
