import HCaptcha from '@hcaptcha/react-hcaptcha'
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

import Button from '../../components/button'
import Card from '../../components/card'
import Input from '../../components/input'
import Help from '../../components/login/help'
import LogoArea from '../../components/login/logoArea'
import withoutAuth from '../../hocs/withoutAuth'
import ParticipantLoginLayout from '../../layouts/participantLogin'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import Row from '../../styles/components/row'
import {
  TopButton,
  Container,
  FormArea,
  FormContainer
} from '../../styles/pages/participants'
import { removeMask } from '../../utils/formatters'
import getValidationErrors from '../../utils/getValidationErrors'
import { isValidCpf } from '../../utils/validators'

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
          .test('cpf-is-valid', 'CPF precisa ser válido', isValidCpf)
          .required('Digite o seu CPF'),
        dob: Yup.string().required('Selecione a sua data de nascimento')
      })
      try {
        await schema.validate(data, {
          abortEarly: false
        })
        const response = await api.post('participants/sessions', {
          cpf: removeMask(data.cpf),
          dob: data.dob
        })
        console.log(response.data?.data.token)
        router.push('/participants/home')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Erro ao consultar certificado',
          description: err
        })
      }
    },
    [addToast, router]
  )

  const captchaRef = useRef(null)

  const onSubmit = () => {
    // this reaches out to the hcaptcha library and runs the
    // execute function on it. you can use other functions as well
    // documented in the api:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute()
  }

  const onExpire = () => {
    console.log('hCaptcha Token Expired')
  }

  const onError = err => {
    console.log(`hCaptcha Error: ${err}`)
  }

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
              <HCaptcha
                // This is testing sitekey, will autopass
                // Make sure to replace
                sitekey="e450f35b-0ccd-4460-aec7-68cb9c7dc08a"
                // onVerify={setToken}
                onError={onError}
                onExpire={onExpire}
                ref={captchaRef}
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
