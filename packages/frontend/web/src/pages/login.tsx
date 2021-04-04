import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { FiLock, FiUser } from 'react-icons/fi'
import * as Yup from 'yup'

import Logo from '../assets/logo-full.svg'
import Button from '../components/Button'
import Input from '../components/Input'
import useAuth from '../hooks/useAuth'
import useToast from '../hooks/useToast'
import { Container, FormArea, LogoArea } from '../styles/pages/Login'
import getValidationErrors from '../utils/getValidationErrors'

interface LoginFormData {
  login: string
  password: string
}

const login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()
  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSingIn = useCallback(
    async (data: LoginFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          login: Yup.string().required('Login é obrigatório'),
          password: Yup.string().required('Senha é obrigatória')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await signIn({
          login: data.login,
          password: data.password
        })

        setLoading(false)
        router.push('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          setLoading(false)

          return
        }
        setLoading(false)

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
        })
      }
    },
    [router, signIn, addToast]
  )

  return (
    <Container>
      <LogoArea>
        <Logo />
        <h2>Faça seu login na plataforma</h2>
      </LogoArea>
      <FormArea ref={formRef} onSubmit={handleSingIn}>
        <h2>Entre com seus dados</h2>
        <Input
          label="Login"
          name="login"
          icon={FiUser}
          placeholder="Digite seu login"
          autoComplete="username"
        />
        <Input
          label="Senha"
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Digite sua senha"
          autoComplete="current-password"
          aria-describedby="password-constraints"
        />
        <Button size="big" color="secondary" type="submit" loading={loading}>
          Entrar
        </Button>
      </FormArea>
    </Container>
  )
}

export default login
