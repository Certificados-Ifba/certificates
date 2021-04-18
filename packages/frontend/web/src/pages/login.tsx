import { FormHandles } from '@unform/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { FiLock, FiUser, FiLogIn } from 'react-icons/fi'
import * as Yup from 'yup'

import Logo from '../assets/logo-full.svg'
import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import withoutAuth from '../hocs/withoutAuth'
import { useAuth } from '../providers/auth'
import { useToast } from '../providers/toast'
import Row from '../styles/components/row'
import {
  Container,
  FormArea,
  LogoArea,
  FormContainer
} from '../styles/pages/login'
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
          login: Yup.string().required('Por favor, digite o seu login'),
          password: Yup.string().required('Por favor, digite a sua senha')
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
          title: 'Não foi possível entrar',
          description: 'Por favor, verifique seu usuário e sua senha.'
        })
      }
    },
    [router, signIn, addToast]
  )

  return (
    <Container>
      <Head>
        <title>Login | Certificados</title>
      </Head>
      <LogoArea>
        <Logo />
        <h2>Organizando eventos e ajudando participantes</h2>
      </LogoArea>
      <FormArea ref={formRef} onSubmit={handleSingIn}>
        <Card>
          <header>
            <h2>Faça o login para continuar</h2>
          </header>
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
              <Button
                size="big"
                color="primary"
                type="submit"
                loading={loading}
              >
                <FiLogIn size={20} /> <span>Entrar</span>
              </Button>
            </Row>
          </FormContainer>
        </Card>
      </FormArea>
    </Container>
  )
}

export default withoutAuth(Login)
