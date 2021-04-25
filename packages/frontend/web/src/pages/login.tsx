import { FormHandles } from '@unform/core'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import {
  FiLock,
  FiUser,
  FiLogIn,
  FiArrowLeft,
  FiRefreshCw
} from 'react-icons/fi'
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
import Alert from '../components/alert'

interface LoginFormData {
  login: string
  password: string
}

const Login: React.FC = () => {
  const [forgotPassword, setForgotPassword] = useState<boolean>(false)
  return (
    <Container>
      <Head>
        <title>Login | Certificados</title>
      </Head>
      <LogoArea>
        <Logo />
        <h2>Organizando eventos e ajudando participantes</h2>
      </LogoArea>
      {!forgotPassword && (
        <FormLogin setForgotPassword={setForgotPassword}></FormLogin>
      )}
      {forgotPassword && (
        <FormForgotPassword
          setForgotPassword={setForgotPassword}
        ></FormForgotPassword>
      )}
    </Container>
  )
}

const FormForgotPassword: React.FC<{
  setForgotPassword: Dispatch<SetStateAction<boolean>>
}> = ({ setForgotPassword }) => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const handleForgotPassword = useCallback(
    async data => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          login: Yup.string()
            .required('Por favor, digite o seu login')
            .email('Por favor, digite um e-mail válido')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        setLoading(false)
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
          title: 'Erro desconhecido',
          description: 'Não foi possível redefinir sua senha.'
        })
      }
    },
    [addToast]
  )
  const [loading, setLoading] = useState(false)
  return (
    <FormArea ref={formRef} onSubmit={handleForgotPassword}>
      <Card>
        <header>
          <h2>Redefinir a senha</h2>
        </header>
        <FormContainer>
          <Alert marginBottom="sm">
            Para conseguir fazer o login,{' '}
            <b>você tem que redefinir a sua senha</b>.
          </Alert>
          <Alert marginBottom="sm" size="sm">
            <b>Digite o seu e-mail</b> que você usa pra entrar no sistema, que
            <b> nós vamos mandar uma mensagem</b> para ele com um link que vai{' '}
            <b>possibilitar você escolher uma nova senha</b>.
          </Alert>
          <Input
            formRef={formRef}
            label="E-mail"
            name="login"
            icon={FiUser}
            placeholder="email@exemplo.com"
            autoComplete="username"
            marginBottom="sm"
          />
          <Row>
            <Button
              onClick={() => {
                setForgotPassword(false)
              }}
              color="secondary"
              type="button"
              outline
            >
              <FiArrowLeft size={20} />
              <span>Voltar</span>
            </Button>
            <Button loading={loading} color="primary" type="submit">
              <FiRefreshCw size={20}></FiRefreshCw> <span>Redefinir</span>
            </Button>
          </Row>
        </FormContainer>
      </Card>
    </FormArea>
  )
}

const FormLogin: React.FC<{
  setForgotPassword: Dispatch<SetStateAction<boolean>>
}> = ({ setForgotPassword }) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSingIn = useCallback(
    async (data: LoginFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          login: Yup.string()
            .required('Por favor, digite o seu login')
            .email('Por favor, digite um e-mail válido'),
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
    <FormArea ref={formRef} onSubmit={handleSingIn}>
      <Card>
        <header>
          <h2>Faça o login para continuar</h2>
        </header>
        <FormContainer>
          <Input
            formRef={formRef}
            label="Login"
            name="login"
            icon={FiUser}
            placeholder="Digite seu login"
            autoComplete="username"
            marginBottom="sm"
          />
          <Input
            formRef={formRef}
            label="Senha"
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            aria-describedby="password-constraints"
          />
          <Button
            onClick={() => {
              setForgotPassword(true)
            }}
            type="button"
            size="small"
            ghost={true}
            marginBottom="md"
          >
            Esqueci a minha senha
          </Button>
          <Row>
            <Button size="big" color="primary" type="submit" loading={loading}>
              <FiLogIn size={20} /> <span>Entrar</span>
            </Button>
          </Row>
        </FormContainer>
      </Card>
    </FormArea>
  )
}

export default withoutAuth(Login)
