import { Alert, Button, Card, Input, LogoArea, Row } from '@components'
import { withoutAuth } from '@hocs'
import { useAuth, useToast } from '@providers'
import { api } from '@services'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '@utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FiLock, FiCheck } from 'react-icons/fi'
import * as Yup from 'yup'

import { Container, FormArea, FormContainer } from './styles'

interface IResponse {
  message: string
  data: 'register' | 'reset' | null
}

const Confirm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')
  const { query, replace } = useRouter()
  const { addToast } = useToast()
  const { resetPassword } = useAuth()
  const formRef = useRef<FormHandles>(null)
  const { link } = query

  useEffect(() => {
    if (link) {
      async function loadData() {
        try {
          const response = await api.get<IResponse>(`password/link/${link}`)
          setType(response?.data?.data)
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Erro na confirmação',
            description: err
          })
          replace('/login')
        }
      }
      setLoading(true)
      loadData()
      setLoading(false)
    }
  }, [link, addToast, replace])

  const handleForgotPassword = useCallback(
    async data => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string()
            .min(6, 'Senha precisa ter no mínimo 6 caracteres')
            .required('Por favor, digite a senha'),
          repeatPassword: Yup.string()
            .min(6, 'Senha precisa ter no mínimo 6 caracteres')
            .required('Por favor, digite a senha novamente')
            .oneOf([data.password], 'As senhas devem ser iguais')
        })

        await schema.validate(data, {
          abortEarly: false
        })
        await resetPassword({
          link: typeof link === 'string' ? link : link[0],
          password: data.password
        })

        addToast({
          type: 'success',
          title: 'Mensagem',
          description: 'Seu usuário foi confirmado.'
        })

        setLoading(false)
        replace('/')
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
    [link, addToast, replace, resetPassword]
  )
  return (
    <Container>
      <Head>
        <title>
          {type === 'reset' ? 'Reiniciar Senha' : 'Confirmar Cadastro'} |
          Certificados
        </title>
      </Head>
      <LogoArea />
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
              label="Senha"
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Digite sua senha"
              marginBottom="sm"
              disabled={loading}
            />
            <Input
              label="Confirme a Senha"
              name="repeatPassword"
              type="password"
              icon={FiLock}
              placeholder="Digite novamente a senha"
              marginBottom="md"
              disabled={loading}
            />
            <Row>
              <Button
                size="big"
                color="primary"
                type="submit"
                loading={loading}
              >
                <FiCheck size={20} />
                <span>{type === 'register' ? 'Confirmar' : 'Redefinir'}</span>
              </Button>
            </Row>
          </FormContainer>
        </Card>
      </FormArea>
    </Container>
  )
}

export default withoutAuth(Confirm)
