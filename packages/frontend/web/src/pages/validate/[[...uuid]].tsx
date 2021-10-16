import { FormHandles } from '@unform/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiCheck,
  FiCreditCard,
  FiEye,
  FiHash,
  FiLogIn,
  FiRepeat,
  FiSearch
} from 'react-icons/fi'
import * as Yup from 'yup'

import Valid from '../../assets/valid.svg'
import Button from '../../components/button'
import Card from '../../components/card'
import Input from '../../components/input'
import Help from '../../components/login/help'
import LogoArea from '../../components/login/logoArea'
import CertificateInvalid from '../../components/participant/invalid'
import CertificateValid from '../../components/participant/valid'
import withoutAuth from '../../hocs/withoutAuth'
import ParticipantLoginLayout from '../../layouts/participantLogin'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import Row from '../../styles/components/row'
import {
  TopButton,
  Container,
  FormArea,
  FormContainer,
  ImageContainer
} from '../../styles/pages/participants'
import theme from '../../styles/theme'
import getValidationErrors from '../../utils/getValidationErrors'

const Validate: React.FC = () => {
  const router = useRouter()

  const query = router.query
  let uuidRouter
  if (query.uuid) uuidRouter = query.uuid[0]
  const [uuid, setUuid] = useState(null)

  const [valid, setValid] = useState(false)

  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const validateCode = useCallback(
    code => {
      try {
        setLoading(true)

        console.log(code)

        setValid(code === '1')

        setUuid(code)
        setLoading(false)
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na solicitação',
          description: err
        })
        setLoading(false)
      }
    },
    [addToast]
  )

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          code: Yup.string().required('Você precisa digitar o código')
        })

        await schema.validate(data, {
          abortEarly: false
        })
        router.push(`/validate/${data.code}`)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Erro na solicitação',
          description: err
        })
      }
    },
    [addToast, router]
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (uuidRouter) {
      validateCode(uuidRouter)
    }
    setUuid(uuidRouter)
  }, [uuid, uuidRouter, validateCode])

  return (
    <>
      <TopButton>
        <div>
          <Button
            onClick={() => {
              router.push(`/participants/login`)
            }}
            size="small"
            type="button"
            inline
          >
            <FiSearch size={20} />
            <span>Encontrar Certificados</span>
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
      {uuid && !valid && <CertificateInvalid></CertificateInvalid>}
      {uuid && valid && <CertificateValid></CertificateValid>}
      {!uuid && (
        <Container maxWidth={500} login={true}>
          <Head>
            <title>Validar | Certificados</title>
          </Head>
          <LogoArea />
          <FormArea ref={formRef} onSubmit={handleSubmit}>
            <Card>
              <header>
                <h2>
                  {uuid && (
                    <>
                      {valid && (
                        <>
                          <span style={{ color: theme.colors.success }}>
                            Esse certificado é VÁLIDO!
                          </span>
                        </>
                      )}
                      {!valid && (
                        <>
                          <span style={{ color: theme.colors.danger }}>
                            Esse certificado é INVÁLIDO!
                          </span>
                        </>
                      )}
                    </>
                  )}
                  {!uuid && 'Digite o código para validar'}
                </h2>
              </header>
              <FormContainer padding={true}>
                {uuid && (
                  <>
                    {valid && (
                      <ImageContainer>
                        <Image src="/valid.svg" width="" height="200px"></Image>
                      </ImageContainer>
                    )}
                    {!valid && (
                      <ImageContainer>
                        <Image
                          src="/invalid.svg"
                          width=""
                          height="200px"
                        ></Image>
                      </ImageContainer>
                    )}
                    <Button
                      onClick={() => {
                        router.push(`/participants/login`)
                      }}
                      size="default"
                      type="button"
                    >
                      <FiEye size={20}></FiEye>
                      <span>Visualizar Certificado</span>
                    </Button>
                  </>
                )}
                {!uuid && (
                  <>
                    <Input
                      formRef={formRef}
                      marginBottom="md"
                      name="code"
                      label="Código de Validação do Certificado"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      type="text"
                      icon={FiHash}
                    />
                    <Row>
                      <Button size="big" color="primary" type="submit">
                        <FiCheck size={20} />
                        <span>Validar Certificado</span>
                      </Button>
                    </Row>
                  </>
                )}
                <div style={{ marginTop: '10px' }}>
                  <Row>
                    {uuid && (
                      <Button
                        onClick={() => {
                          router.push(`/validate`)
                        }}
                        size="small"
                        type="button"
                        ghost
                      >
                        <FiRepeat size={20} />
                        <span>
                          {valid ? 'Verificar outro' : 'Digitar novamente'}
                        </span>
                      </Button>
                    )}
                  </Row>
                </div>
                <Help />
              </FormContainer>
            </Card>
          </FormArea>
        </Container>
      )}
    </>
  )
}

export default withoutAuth(Validate, ParticipantLoginLayout)
