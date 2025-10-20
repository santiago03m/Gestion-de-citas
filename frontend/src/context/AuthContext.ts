import { createContext } from 'react'

export type AuthState = {
  accessToken: string | null
  roles: string[]
  username: string | null
}

export type AuthContextType = {
  auth: AuthState
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
  setAuthData: (data: { accessToken: string; username: string; roles: string[]; expiresIn?: number }) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

