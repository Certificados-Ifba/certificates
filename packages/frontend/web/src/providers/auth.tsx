import { decode } from 'jsonwebtoken'
import { createContext, useCallback, useContext, useState } from 'react'

import useStickyState from '../hooks/useStickyState'
import api from '../services/axios'

interface User {
  id?: string
  name: string
  email: string
  role: string
  is_confirmed: boolean
}

interface AuthState {
  user: User
  token: string
}

interface SignInCredentials {
  login: string
  password: string
}

export interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useStickyState('', 'certificates.session')
  const [data, setData] = useState<AuthState>(() => {
    const payload: any = decode(token || '', { json: false })

    if (token) {
      return {
        token,
        user: payload?.user
      }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ login, password }) => {
    const response = await api.post('/users/login', {
      email: login,
      password
    })

    const { token } = response.data?.data
    const payload: any = decode(token || '')

    setToken(token)
    setData({ token, user: payload?.user })
  }, [])

  const signOut = useCallback(async () => {
    // await api.put('/users/logout')
    setToken(null)

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default AuthProvider
