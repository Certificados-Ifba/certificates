import {
  Button,
  Card,
  FormContent,
  Help,
  Input,
  LogoArea,
  Row
} from '@components'
import { ICertificateValid } from '@dtos'
import { withoutAuth } from '@hocs'
import { ParticipantLoginLayout } from '@layouts'
import { useToast } from '@providers'
import { api } from '@services'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '@utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FiCheck, FiHash, FiLogIn, FiRepeat, FiSearch } from 'react-icons/fi'
import * as Yup from 'yup'

import { Valid } from './components'
import { Container, FormArea, TopButton } from './styles'

const Validate: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [certificate, setCertificate] = useState<ICertificateValid>(null)
  const router = useRouter()
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const { uuid } = router.query

  const handleSubmit = useCallback(
    async dataForm => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          code: Yup.string().required('Você precisa digitar o código')
        })

        await schema.validate(dataForm, {
          abortEarly: false
        })

        const { data } = await api.get(
          `/certificates/validate/${dataForm?.code}`
        )
        setLoading(false)
        setCertificate(data?.data)
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
    [addToast]
  )

  useEffect(() => {
    if (uuid) {
      formRef?.current?.setData({ code: uuid[0] })
      formRef?.current?.submitForm()
    }
  }, [uuid])

  return (
    <>
      <TopButton>
        <div>
          <Button
            onClick={() => {
              router.push(`/login`)
            }}
            size="small"
            type="button"
            inline
          >
            <FiLogIn size={20} />
            <span>Acesso administrativo</span>
          </Button>
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
        </div>
      </TopButton>
      {certificate ? (
        <Valid
          certificate={certificate}
          removeCertificate={() => setCertificate(null)}
        />
      ) : (
        <Container maxWidth={500} login={true}>
          <Head>
            <title>Validar | Certificados</title>
          </Head>
          <LogoArea />
          <FormArea ref={formRef} onSubmit={handleSubmit}>
            <Card>
              <header>
                <h2>Digite o código para validar</h2>
              </header>
              <FormContent padding={true}>
                <Input
                  marginBottom="md"
                  name="code"
                  label="Código de Validação do Certificado"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  type="text"
                  icon={FiHash}
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
                    <span>Validar Certificado</span>
                  </Button>
                </Row>
                <Help />
              </FormContent>
            </Card>
          </FormArea>
        </Container>
      )}
    </>
  )
}

export default withoutAuth(Validate, ParticipantLoginLayout)
