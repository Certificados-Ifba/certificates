import { decode } from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { createContext, useCallback, useEffect, useState } from 'react'

import useStickyState from '../hooks/useStickyState'
import api from '../services/axios'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User
  permissions: any
  token: string
}

interface SignInCredentials {
  login: string
  password: string
}

export interface AuthContextData {
  user: User
  is(need: string[] | undefined): boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useStickyState('', '@Certificates:token')
  const router = useRouter()
  const [data, setData] = useState<AuthState>(() => {
    const payload: any = decode(token || '', { json: false })

    if (token) {
      return {
        token,
        user: payload?.user,
        permissions: payload?.permissions
      }
    }

    return {} as AuthState
  })

  const is = useCallback(
    need =>
      !need ||
      data?.permissions.some((permission: any) => need.includes(permission)),
    [data]
  )

  const signIn = useCallback(async ({ login, password }) => {
    const response = await api.post('/users/login', {
      email: login,
      password
    })

    const { token } = response.data?.data
    setToken(token)
    const payload: any = decode(token || '')

    setData({ token, user: payload?.userId, permissions: payload?.permissions })
  }, [])

  const signOut = useCallback(() => {
    setToken(null)

    setData({} as AuthState)
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const payload: any = decode(token || '')

      setData({
        token,
        user: payload?.userId,
        permissions: payload?.permissions
      })

      // if no redirect needed, just return (example: already on /dashboard)
      // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
      if (!token) {
        router.push('/login')
      }

      // if (
      //   // If redirectTo is set, redirect if the user was not found.
      //   (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      //   // If redirectIfFound is also set, redirect if the user was found
      //   (redirectIfFound && user?.isLoggedIn)
      // ) {
      // }
    }
    if (!loading) checkAuth()
    setLoading(false)
  }, [loading, token])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        is,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
