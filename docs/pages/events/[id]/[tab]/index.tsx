import { Alert, Button, Container, Header, Tabs } from '@components'
import { withAuth } from '@hocs'
import { useToast } from '@providers'
import { api } from '@services'
import { formatData } from '@utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  FiFileText,
  FiChevronLeft,
  FiCalendar,
  FiInfo,
  FiAward,
  FiLayers,
  FiSend
} from 'react-icons/fi'

import {
  EventActivity,
  EventCertificate,
  EventInfo,
  EventParticipant
} from './_components'

const EventDetail: React.FC = () => {
  const { push, query } = useRouter()
  const { id } = query
  const [event, setEvent] = useState(null)
  const { addToast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(`events/${id}`)

        const event = response?.data?.data

        if (event) {
          setEvent(event)
        }
      } catch (err) {
        addToast({
          title: 'Erro no carregamento',
          type: 'error',
          description: err
        })
        history.back()
      }
    }
    if (id) loadData()
  }, [id, addToast])

  return (
    <Container>
      <Head>
        <title>{event?.name} | Evento</title>
      </Head>
      <Header
        title={event?.name}
        subtitle={`Início em ${formatData(
          event?.start_date
        )} e coordenado por ${event?.user?.name}`}
        icon={FiCalendar}
        controls={
          <nav>
            <Button
              color="secondary"
              ghost
              onClick={() => {
                push('/events')
              }}
            >
              <FiChevronLeft size={20} />
              <span className="hide-md-down">Voltar</span>
            </Button>
            <Button
              onClick={() => {
                push(`/events/${event.id}/publish`)
              }}
            >
              <FiSend size={20} />
              <span className="hide-md-down">Publicar</span>
            </Button>
          </nav>
        }
      />
      {true && (
        <Alert type="warning" card>
          <b>Atenção!</b> Esse evento ainda não foi publicado.
          <br />
          <small>
            Para os participantes baixarem os certificados ele precisa ser
            publicado.
          </small>
        </Alert>
      )}
      {false && (
        <Alert type="danger" card>
          <b>Atenção!</b> Esse evento está em edição.
          <br />
          <small>
            Para os participantes baixarem os certificados ele precisa ser
            publicado.
          </small>
        </Alert>
      )}
      <Tabs
        tabs={[
          {
            name: 'Informações',
            icon: FiInfo,
            children: <EventInfo edit event={event} setEvent={setEvent} />,
            path: 'info'
          },
          {
            name: 'Atividades',
            icon: FiFileText,
            children: <EventActivity event={event} />,
            path: 'activities'
          },
          {
            name: 'Certificados',
            icon: FiAward,
            children: <EventParticipant event={event} />,
            path: 'certificates'
          },
          {
            name: 'Modelos de Certificado',
            icon: FiLayers,
            children: <EventCertificate event={event} />,
            path: 'models'
          }
        ]}
      />
    </Container>
  )
}

export default withAuth(EventDetail)
