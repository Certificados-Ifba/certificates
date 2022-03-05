import {
  Button,
  Captcha,
  Card,
  FormContent,
  Help,
  Input,
  LogoArea,
  Row
} from '@components'
import { withoutAuth } from '@hocs'
import { ParticipantLoginLayout } from '@layouts'
import { useAuth, useToast } from '@providers'
import { FormHandles } from '@unform/core'
import { getValidationErrors, isValidCpf, removeMask } from '@utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import {
  FiSearch,
  FiCreditCard,
  FiCalendar,
  FiLogIn,
  FiCheck
} from 'react-icons/fi'
import * as Yup from 'yup'

import { Container, FormArea, TopButton } from './styles'

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()
  const { addToast } = useToast()
  const { auth } = useAuth()

  const handleSubmit = useCallback(
    async dataForm => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          cpf: Yup.string()
            .matches(
              /(\d{3}).(\d{3}).(\d{3})-(\d{2})/,
              'Por favor, digite um CPF válido.'
            )
            .test('cpf-is-valid', 'CPF precisa ser válido', isValidCpf)
            .required('Digite o seu CPF'),
          dob: Yup.string().required('Selecione a sua data de nascimento'),
          token: Yup.string().required('Captcha é obrigatório')
        })
        await schema.validate(dataForm, {
          abortEarly: false
        })
        await auth({
          cpf: removeMask(dataForm.cpf),
          dob: dataForm.dob,
          token: dataForm.token
        })
        setLoading(false)
        router.push('/participants/home')
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
          title: 'Erro ao consultar certificado',
          description: err
        })
      }
    },
    [addToast, router, auth]
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
              router.push(`/login`)
            }}
            size="small"
            type="button"
            inline
          >
            <FiLogIn size={20} /> <span>Acesso administrativo</span>
          </Button>
        </div>
      </TopButton>
      <Container maxWidth={500} login={true}>
        <Head>
          <title>Login | Certificados</title>
        </Head>
        <LogoArea />
        <FormArea ref={formRef} onSubmit={handleSubmit}>
          <Card>
            <header>
              <h2>Digite suas informações para continuar</h2>
            </header>
            <FormContent padding={true}>
              <Input
                marginBottom="sm"
                name="cpf"
                label="CPF"
                placeholder="CPF"
                type="cpf"
                icon={FiCreditCard}
                disabled={loading}
              />
              <Input
                icon={FiCalendar}
                marginBottom="sm"
                name="dob"
                label="Data de Nascimento"
                type="date"
                disabled={loading}
              />
              <Captcha name="token" />
              <Row>
                <Button
                  size="big"
                  color="primary"
                  type="submit"
                  loading={loading}
                >
                  <FiSearch size={20} />
                  <span>Encontrar Certificados</span>
                </Button>
              </Row>
              <div style={{ marginTop: '10px' }}>
                <Row>
                  <Button
                    onClick={() => {
                      router.push(`/validate`)
                    }}
                    type="button"
                    ghost
                    link
                  >
                    <FiCheck size={20} />
                    <span>Validar Certificado</span>
                  </Button>
                </Row>
              </div>
              <Help />
            </FormContent>
          </Card>
        </FormArea>
      </Container>
    </>
  )
}

export default withoutAuth(Login, ParticipantLoginLayout)
