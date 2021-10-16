import { FormHandles } from '@unform/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import {
  FiLock,
  FiLogIn,
  FiArrowLeft,
  FiSend,
  FiMail,
  FiSearch,
  FiCheck
} from 'react-icons/fi'
import * as Yup from 'yup'

import Alert from '../components/alert'
import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import Help from '../components/login/help'
import LogoArea from '../components/login/logoArea'
import withoutAuth from '../hocs/withoutAuth'
import { useAuth } from '../providers/auth'
import { useToast } from '../providers/toast'
import api from '../services/axios'
import Row from '../styles/components/row'
import {
  Container,
  FormArea,
  FormContainer,
  TopButton
} from '../styles/pages/login'
import getValidationErrors from '../utils/getValidationErrors'

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
      <LogoArea />
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
          email: Yup.string()
            .required('Por favor, digite o seu e-mail')
            .email('Por favor, digite um e-mail válido')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/password/forgot', data)

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description: 'Verifique sua caixa de entrada para recuperar a senha.'
        })
        setForgotPassword(false)
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
          title: 'Erro na solicitação',
          description: err
        })
      }
    },
    [addToast, setForgotPassword]
  )
  const [loading, setLoading] = useState(false)
  return (
    <FormArea ref={formRef} onSubmit={handleForgotPassword}>
      <Card>
        <header>
          <Button
            onClick={() => {
              setForgotPassword(false)
            }}
            color="dark"
            type="button"
            size="small"
            ghost
            square
            inline
            style={{ margin: 0 }}
          >
            <FiArrowLeft size={20} />
          </Button>
          <h2 style={{ marginRight: 38 }}>Redefinir sua senha</h2>
        </header>
        <FormContainer>
          <Alert marginBottom="sm">
            Esqueceu sua senha? <b>Não se preocupe.</b>
          </Alert>
          <Alert marginBottom="md">
            É só nos dizer seu e-mail que enviaremos um link para você cadastrar
            uma <b>nova senha</b>.
          </Alert>
          <Input
            formRef={formRef}
            label="E-mail"
            name="email"
            icon={FiMail}
            placeholder="email@exemplo.com"
            autoComplete="username"
            marginBottom="md"
          />
          <Row>
            <Button size="big" loading={loading} color="primary" type="submit">
              <FiSend size={20} /> <span>Enviar e-mail</span>
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
  const [loading, setLoading] = useState<boolean>(false)
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
          description: err
        })
      }
    },
    [router, signIn, addToast]
  )
  return (
    <>
      <TopButton>
        <div>
          <Button
            onClick={() => {
              router.push(`/validate`)
            }}
            size="small"
            type="button"
            inline
          >
            <FiCheck size={20} />
            <span>Validar Certificado</span>
          </Button>
          <Button
            onClick={() => {
              router.push(`participants/login`)
            }}
            size="small"
            type="button"
            inline
          >
            <FiSearch size={20} />
            <span>Encontrar Certificados</span>
          </Button>
        </div>
      </TopButton>
      <FormArea ref={formRef} onSubmit={handleSingIn}>
        <Card>
          <header>
            <h2>Faça o login para continuar</h2>
          </header>
          <FormContainer>
            <Input
              formRef={formRef}
              label="E-mail"
              name="login"
              icon={FiMail}
              type="email"
              placeholder="Digite seu e-mail"
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
              marginBottom="md"
            />
            <Row>
              <Button
                size="big"
                color="primary"
                type="submit"
                marginBottom="sm"
                loading={loading}
              >
                <FiLogIn size={20} /> <span>Entrar</span>
              </Button>
            </Row>
            <Row>
              <Button
                onClick={() => {
                  setForgotPassword(true)
                }}
                size="small"
                type="button"
                ghost
              >
                Esqueci a minha senha
              </Button>
            </Row>
            <Help />
          </FormContainer>
        </Card>
      </FormArea>
    </>
  )
}

export default withoutAuth(Login)
