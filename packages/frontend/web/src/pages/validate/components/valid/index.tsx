import { Alert, Button, Card, Grid, Help } from '@components'
import { useValidate } from '@providers'
import { theme } from '@styles'
import { capitalize } from '@utils'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiEye,
  FiFileText,
  FiRepeat,
  FiUser
} from 'react-icons/fi'

import {
  ButtonContainer,
  Container,
  FooterContainer,
  FormContainer,
  ImageContainer,
  InfoContainer
} from './styles'

export const Valid: React.FC = () => {
  const router = useRouter()
  const { certificate, setCertificate } = useValidate()

  return (
    <Container marginTopSm={true} maxWidth={1000} login={false}>
      <Head>
        <title>Certificado Válido | Certificados</title>
      </Head>
      <Card>
        <header>
          <h2>
            <span style={{ color: theme.colors.success }}>
              Esse certificado é VÁLIDO!
            </span>
          </h2>
        </header>
        <FormContainer paddingSize="md" padding={true}>
          <Grid cols={2}>
            <div>
              <InfoContainer>
                <Alert marginBottom="sm" size="sm">
                  Evento:
                </Alert>
                <Alert marginBottom="sm" icon={FiCalendar}>
                  <b>{certificate.event} </b>
                </Alert>
                <Alert marginBottom="sm" size="sm">
                  Atividade:
                </Alert>
                <Alert marginBottom="sm" icon={FiFileText}>
                  <b>{certificate.activity} </b>
                </Alert>
                <Alert marginBottom="sm" size="sm">
                  Participante:
                </Alert>
                <Alert marginBottom="sm" icon={FiUser}>
                  <b>{capitalize(certificate.participant)}</b>
                </Alert>
                <Alert marginBottom="sm" size="sm">
                  Função:
                </Alert>
                <Alert marginBottom="sm" icon={FiBriefcase}>
                  <b>{capitalize(certificate.function)} </b>
                </Alert>
                <Alert marginBottom="sm" size="sm">
                  Período:
                </Alert>
                <Alert marginBottom="md" icon={FiCalendar}>
                  <b>
                    De {new Date(certificate.start_date).toLocaleDateString()}{' '}
                    até {new Date(certificate.start_date).toLocaleDateString()}
                  </b>
                </Alert>
                <Alert marginBottom="sm" size="sm">
                  Carga Horária:
                </Alert>
                <Alert marginBottom="md" icon={FiClock}>
                  <b>{certificate.workload} h</b>
                </Alert>
              </InfoContainer>
            </div>
            <div>
              <FormContainer padding={true}>
                <ImageContainer>
                  <Image src="/valid.svg" width="" height="200px" />
                </ImageContainer>
              </FormContainer>
            </div>
          </Grid>
          <FooterContainer>
            <ButtonContainer>
              <Button
                onClick={() => {
                  router.push(`/participants/login`)
                }}
                type="button"
              >
                <FiEye size={20} />
                <span>Visualizar Certificado</span>
              </Button>
              <Button
                onClick={() => {
                  router.push(`/validate`)
                  setCertificate(null)
                }}
                type="button"
                outline
              >
                <FiRepeat size={20} />
                <span>Verificar Outro</span>
              </Button>
            </ButtonContainer>
            <Help />
          </FooterContainer>
        </FormContainer>
      </Card>
    </Container>
  )
}
