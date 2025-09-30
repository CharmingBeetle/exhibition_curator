import { createContext, useContext, type ReactNode } from 'react'
import { useUser } from '@clerk/clerk-react'

type UserContextValue = {
  user: ReturnType<typeof useUser>['user']
  isSignedIn: boolean
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, isSignedIn } = useUser()
  return (
    <UserContext.Provider value={{ user, isSignedIn: Boolean(isSignedIn) }}>
      {children}
    </UserContext.Provider>
  )
}

export function useAppUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useAppUser must be used within UserProvider')
  return ctx
}