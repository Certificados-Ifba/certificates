import { FormHandles } from '@unform/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { FiLock, FiUserCheck, FiRefreshCw } from 'react-icons/fi'
import * as Yup from 'yup'

import Logo from '../../../../assets/logo-full.svg'
import Alert from '../../../../components/alert'
import Button from '../../../../components/button'
import Card from '../../../../components/card'
import Input from '../../../../components/input'
import withoutAuth from '../../../../hocs/withoutAuth'
import ConfirmLayout from '../../../../layouts/confirm'
import { useAuth } from '../../../../providers/auth'
import { useToast } from '../../../../providers/toast'
import api from '../../../../services/axios'
import Row from '../../../../styles/components/row'
import {
  Container,
  FormArea,
  LogoArea,
  FormContainer
} from '../../../../styles/pages/confirm'
import getValidationErrors from '../../../../utils/getValidationErrors'

const Confirm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { query } = router
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const { code, type } = query
  const { signIn } = useAuth()
  const handleForgotPassword = useCallback(
    async data => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Por favor, digite a senha')
            .min(6, 'A senha deve ter no mínimo 6 caracteres'),
          repeatPassword: Yup.string()
            .required('Por favor, digite a senha novamente')
            .oneOf([data.password], 'As senhas devem ser iguais')
        })

        await schema.validate(data, {
          abortEarly: false
        })
        const resp = await api.post(`users/confirm`, {
          link: code,
          password: data.password
        })

        if (resp.data?.message === 'user_confirm_success') {
          addToast({
            type: 'success',
            title: 'Mensagem',
            description: 'Seu usuário foi confirmado.'
          })
          signIn({ token: resp.data.data?.token })
          router.replace('/')
        }

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
          description: 'Não foi possível definir sua senha.'
        })
      }
    },
    [addToast, code, router, signIn]
  )
  return (
    <Container>
      <Head>
        <title>
          {type === 'reset' ? 'Reiniciar Senha' : 'Confirmar Cadastro'} |
          Certificados
        </title>
      </Head>
      <LogoArea>
        <Logo />
      </LogoArea>
      <FormArea ref={formRef} onSubmit={handleForgotPassword}>
        <Card>
          <header>
            <h2>
              {type === 'reset'
                ? 'Defina uma nova senha'
                : 'Confirme seu cadastro'}
            </h2>
          </header>
          <FormContainer>
            {type === 'reset' && (
              <>
                <Alert size="md" marginBottom="xs">
                  Você solicitou para redefinir a sua senha.
                </Alert>
                <Alert marginBottom="md">
                  Para confirmar a alteração, digite uma nova senha de acesso.
                </Alert>
              </>
            )}
            {type === 'register' && (
              <>
                <Alert size="md" marginBottom="xs">
                  Você foi cadastrado no sistema de certificados.
                </Alert>
                <Alert marginBottom="md">
                  Para confirmar, digite uma nova senha de acesso.
                </Alert>
              </>
            )}
            <Input
              formRef={formRef}
              label="Senha"
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Digite sua senha"
              marginBottom="sm"
            />
            <Input
              formRef={formRef}
              label="Repetir a Senha"
              name="repeatPassword"
              type="password"
              icon={FiLock}
              placeholder="Digite novamente a senha"
              marginBottom="sm"
            />
            <Row>
              <Button
                size="big"
                color="primary"
                type="submit"
                loading={loading}
              >
                {type === 'register' && (
                  <>
                    <FiUserCheck size={20} /> <span>Confirmar</span>
                  </>
                )}
                {type === 'reset' && (
                  <>
                    <FiRefreshCw size={20} /> <span>Redefinir</span>
                  </>
                )}
              </Button>
            </Row>
          </FormContainer>
        </Card>
      </FormArea>
    </Container>
  )
}

export default withoutAuth(Confirm, ConfirmLayout)
