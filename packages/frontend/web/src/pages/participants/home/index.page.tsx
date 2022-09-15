import { Alert, Button, Card, Grid, Loading } from '@components'
import { withoutAuth } from '@hocs'
import { ParticipantHomeLayout } from '@layouts'
import { useAuth } from '@providers'
import { api, getToken } from '@services'
import { capitalize } from '@utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  FiMail,
  FiCreditCard,
  FiCalendar,
  FiUser,
  FiChevronLeft,
  FiPhoneCall,
  FiBook
} from 'react-icons/fi'

import { Certificates, Events } from './components'
import { Container, FormContainer } from './styles'

const Home: React.FC = () => {
  const [token, setToken] = useState(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [participant, setParticipant] = useState(null)
  const { getToken } = useAuth()

  useEffect(() => {
    if (!token) {
      const t = getToken()
      if (t) {
        setToken(t)
      } else {
        router.replace('/participants/login')
      }
    }
  }, [getToken, token, router])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('me', {
          headers: { authorization: `Bearer ${token}` }
        })
        console.log(data)

        const participant = data?.data?.user
        if (participant) {
          console.log(participant)

          setParticipant({
            name: participant.name,
            email: participant.email,
            cpf: participant.personal_data.cpf,
            phone: participant.personal_data.phone,
            dob: participant.personal_data.dob,
            institution: participant.personal_data.institution ? 'Sim' : 'Não'
          })
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
        router.replace('/participants/login')
      }
    }
    if (token) load()
  }, [getToken, router, token])

  return (
    <Container maxWidth={1500} login={false}>
      <Head>
        <title>
          {participant ? capitalize(participant.name) : 'Carregando...'} |
          Certificados
        </title>
      </Head>
      <Card>
        <header>
          <h2>
            <FiUser size={30} /> <span>Informações Pessoais</span>
            <Button
              color="secondary"
              ghost
              inline
              onClick={() => {
                router.push('/participants/login')
              }}
            >
              <FiChevronLeft size={20} />
              <span className="hide-md-down">Voltar</span>
            </Button>
          </h2>
        </header>
        <Loading active={loading} />
        {!loading && participant && (
          <FormContainer paddingSize="md" padding={true}>
            <Grid cols={3}>
              <div>
                <Alert marginBottom="sm" size="sm">
                  Nome:
                </Alert>
                <Alert icon={FiUser}>
                  <b>{capitalize(participant.name)}</b>
                </Alert>
              </div>
              <div>
                <Alert marginBottom="sm" size="sm">
                  E-mail:
                </Alert>
                <Alert icon={FiMail}>
                  <b>{participant.email}</b>
                </Alert>
              </div>
              <div>
                <Alert marginBottom="sm" size="sm">
                  CPF:
                </Alert>
                <Alert icon={FiCreditCard}>
                  <b>{participant.cpf}</b>
                </Alert>
              </div>
            </Grid>
            <div style={{ marginTop: '15px' }}>
              <Grid cols={3}>
                <div>
                  <Alert marginBottom="sm" size="sm">
                    Data de Nascimento:
                  </Alert>
                  <Alert icon={FiCalendar}>
                    <b>{participant.dob}</b>
                  </Alert>
                </div>
                <div>
                  <Alert marginBottom="sm" size="sm">
                    Telefone:
                  </Alert>
                  <Alert icon={FiPhoneCall}>
                    <b>{participant.phone}</b>
                  </Alert>
                </div>
                <div>
                  <Alert marginBottom="sm" size="sm">
                    É da Instituição?
                  </Alert>
                  <Alert icon={FiBook}>
                    <b>{participant.institution}</b>
                  </Alert>
                </div>
              </Grid>
            </div>
          </FormContainer>
        )}
      </Card>
      {!loading && <Events token={token} loading={loading} />}
      {!loading && <Certificates token={token} loading={loading} />}
    </Container>
  )
}

export default withoutAuth(Home, ParticipantHomeLayout)
