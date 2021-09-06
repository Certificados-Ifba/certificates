import { FormHandles } from '@unform/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef } from 'react'
import {
  FiSearch,
  FiCreditCard,
  FiCalendar,
  FiLogIn,
  FiCheck
} from 'react-icons/fi'
import * as Yup from 'yup'

import Button from '../../../components/button'
import Card from '../../../components/card'
import Input from '../../../components/input'
import Help from '../../../components/login/help'
import LogoArea from '../../../components/login/logoArea'
import withoutAuth from '../../../hocs/withoutAuth'
import ParticipantLoginLayout from '../../../layouts/participantLogin'
import { useToast } from '../../../providers/toast'
import Row from '../../../styles/components/row'
import {
  TopButton,
  Container,
  FormArea,
  FormContainer
} from '../../../styles/pages/participants'
import getValidationErrors from '../../../utils/getValidationErrors'

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async data => {
      const schema = Yup.object().shape({
        cpf: Yup.string()
          .matches(
            /(\d{3}).(\d{3}).(\d{3})-(\d{2})/,
            'Por favor, digite um CPF válido.'
          )
          .required('Digite o seu CPF'),
        dob: Yup.string().required('Selecione a sua data de nascimento')
      })
      try {
        await schema.validate(data, {
          abortEarly: false
        })
        router.push('/participants/home')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        const title = 'Erro ao consultar certificado'
        addToast({
          type: 'error',
          title: title,
          description: err
        })
      }
    },
    [addToast, router]
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
            <FormContainer padding={true}>
              <Input
                formRef={formRef}
                marginBottom="sm"
                name="cpf"
                label="CPF"
                placeholder="CPF"
                type="cpf"
                icon={FiCreditCard}
              />
              <Input
                icon={FiCalendar}
                formRef={formRef}
                marginBottom="md"
                name="dob"
                label="Data de Nascimento"
                type="date"
              />
              <Row>
                <Button size="big" color="primary" type="submit">
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
                    size="small"
                    type="button"
                    ghost
                  >
                    <FiCheck size={20} />
                    <span>Validar Certificado</span>
                  </Button>
                </Row>
              </div>
              <Help />
            </FormContainer>
          </Card>
        </FormArea>
      </Container>
    </>
  )
}

export default withoutAuth(Login, ParticipantLoginLayout)
