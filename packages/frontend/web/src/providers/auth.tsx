import { decode } from 'jsonwebtoken'
import { createContext, useCallback, useContext, useState } from 'react'

import IUser from '../dtos/IUser'
import useStickyState from '../hooks/useStickyState'
import api from '../services/axios'

interface AuthState {
  user: IUser
  token: string
}

interface SignInCredentials {
  login?: string
  password?: string
  token?: string
}

interface ResetCredentials {
  link: string
  password: string
}

export interface AuthContextData {
  user: IUser
  resetPassword(data: ResetCredentials): Promise<void>
  signIn(data: SignInCredentials): Promise<void>
  signOut(): void
  isAdmin: boolean
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

  const resetPassword = useCallback(
    async ({ link, password }) => {
      const response = await api.post('/password/reset', {
        link,
        password
      })

      const { token } = response.data?.data
      const payload: any = decode(token || '')

      setToken(token)
      setData({ token, user: payload?.user })
    },
    [setToken]
  )

  const signIn = useCallback(
    async (data: SignInCredentials) => {
      let token
      if (data.login && data.password) {
        const response = await api.post('/sessions', {
          email: data.login,
          password: data.password
        })
        token = response.data?.data.token
      } else {
        token = data.token
      }
      const payload: any = decode(token || '')
      setToken(token)
      setData({ token, user: payload?.user })
    },
    [setToken]
  )

  const signOut = useCallback(() => {
    api.delete('/sessions')
    setToken(null)

    setData({} as AuthState)
  }, [setToken])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        resetPassword,
        signIn,
        signOut,
        isAdmin: data?.user?.role === 'ADMIN'
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
