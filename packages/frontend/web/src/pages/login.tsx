import { FormHandles } from '@unform/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { FiLock, FiUser, FiLogIn } from 'react-icons/fi'
import * as Yup from 'yup'

import Logo from '../assets/logo-full.svg'
import Button from '../components/button'
import Input from '../components/input'
import Card from '../components/card'
import withoutAuth from '../hocs/withoutAuth'
import { useAuth } from '../providers/auth'
import { useToast } from '../providers/toast'
import { Container, FormArea, LogoArea, Title, FormContainer } from '../styles/pages/login'
import Row from '../styles/components/row'
import getValidationErrors from '../utils/getValidationErrors'

interface LoginFormData {
  login: string
  password: string
}

const Login: React.FC = () => {
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
        router.replace('/')
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
        <h2>Organizando eventos e ajudando participantes</h2>
      </LogoArea>
      <FormArea ref={formRef} onSubmit={handleSingIn}>
        <Card>
          <header><Title>Faça o login para continuar</Title></header>
          <FormContainer>
            <Input
              label="Login"
              name="login"
              icon={FiUser}
              placeholder="Digite seu login"
              autoComplete="username"
              marginBottom="sm"
            />
            <Input
              label="Senha"
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              aria-describedby="password-constraints"
              marginBottom="md"
            />
            <Row>
              <Button size="default" color="primary" type="submit" loading={loading}><FiLogIn></FiLogIn> <span>Entrar</span></Button>
            </Row>
          </FormContainer>
        </Card>
      </FormArea>
    </Container>
  )
}

export default withoutAuth(Login)
