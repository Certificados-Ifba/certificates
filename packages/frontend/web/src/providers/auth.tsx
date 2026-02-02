import { IUser } from '@dtos'
import { useStickyState } from '@hooks'
import { api } from '@services'
import { decode } from 'jsonwebtoken'
import { createContext, useCallback, useContext, useState } from 'react'

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

interface AuthCredentials {
  cpf: string
  dob: string
  token: string
}

export interface AuthContextData {
  user: IUser
  resetPassword(data: ResetCredentials): Promise<void>
  signIn(data: SignInCredentials): Promise<void>
  signOut(): void
  isAdmin: boolean
  auth(data: AuthCredentials): Promise<void>
  getToken(): string
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [participantToken, setParticipantToken] = useStickyState(
    '',
    'certificates.participant.token'
  )
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

  const auth = useCallback(
    async ({ cpf, dob, token }: AuthCredentials) => {
      const { data } = await api.post('participants/sessions', {
        cpf,
        dob,
        token
      })
      setParticipantToken(data.data.token)
    },
    [setParticipantToken]
  )

  const getToken = useCallback(() => {
    const token = participantToken
    setParticipantToken(null)
    return token
  }, [participantToken, setParticipantToken])

  const signIn = useCallback(
    async (data: SignInCredentials) => {
      let token
      console.log('🔑 [AUTH DEBUG] signIn chamado com:', { login: data.login, hasPassword: !!data.password })

      if (data.login && data.password) {
        console.log('📡 [AUTH DEBUG] Fazendo POST para /sessions')
        try {
          const response = await api.post('/sessions', {
            email: data.login,
            password: data.password
          })
          console.log('✅ [AUTH DEBUG] Resposta da API:', response.status, response.data)
          token = response.data?.data.token
        } catch (error) {
          console.error('❌ [AUTH DEBUG] Erro na requisição:', error?.response?.status, error?.response?.data)
          throw error
        }
      } else {
        token = data.token
      }

      console.log('🎫 [AUTH DEBUG] Token recebido:', token ? 'SIM' : 'NÃO')

      const payload: any = decode(token || '')
      console.log('👤 [AUTH DEBUG] Payload decodificado:', payload)

      setToken(token)
      setData({ token, user: payload?.user })

      console.log('✅ [AUTH DEBUG] Login concluído com sucesso')
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
        isAdmin: data?.user?.role === 'ADMIN',
        auth,
        getToken
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
